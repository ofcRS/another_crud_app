import {
    ApolloClient,
    ApolloLink,
    execute,
    HttpLink,
    InMemoryCache,
    Observable,
} from '@apollo/client';
import {
    inMemoryToken,
    refreshToken,
    isAccessTokenValidOrUndefined,
} from './utils/auth';

import { GraphQLRequest } from '@apollo/client/link/core/types';
import { getApiUrl } from './utils/request';

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            let handle: ZenObservable.Subscription;
            const processRequest = async () => {
                try {
                    /*
                     * проверяем валидность токена перед каждым запросом
                     * и если нужно - получаем новый
                     * */
                    if (!isAccessTokenValidOrUndefined()) await refreshToken();
                    /*
                     * записываем в куки аксесс токен, если он есть
                     * */
                    if (inMemoryToken.accessToken !== undefined) {
                        operation.setContext({
                            headers: {
                                authorization: inMemoryToken.accessToken,
                            },
                        });
                    }
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                } catch {
                    observer.error.bind(observer);
                }
            };
            processRequest();
            return () => {
                if (handle) handle.unsubscribe();
            };
        })
);

const GRAPHQL_URL = `${getApiUrl()}/graphql`;

export const apolloLink = ApolloLink.from([
    requestLink,
    new HttpLink({
        uri: GRAPHQL_URL,
        credentials: 'include',
    }),
]);

export const client = new ApolloClient({
    link: ApolloLink.from([
        requestLink,
        new HttpLink({
            uri: GRAPHQL_URL,
            credentials: 'include',
        }),
    ]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    postsPreview: {
                        keyArgs: false,
                        merge: (existing = [], incoming, options) => {
                            const { skip, take } = options.args as Record<
                                string,
                                number
                            >;
                            const { rewrite } = options.variables as {
                                rewrite: boolean;
                            };

                            // передаем флаг rewrite, если хотим перезаписать текущий кэш, например,
                            // при удалении элемента мы передаем новый список целиком
                            if (rewrite) return incoming;
                            const merged = [...existing];
                            for (let i = 0; i < take; i++) {
                                // ставим запись на соответствующее место в
                                // кэше, в зависимости от параметра skip, например,
                                // если мы перезапрашиваем одну и ту же страницу
                                merged[skip + i] = incoming[i];
                            }

                            return merged.filter(value => value !== undefined);
                        },
                    },
                },
            },
        },
    }),
});

export const makePromise = <T>(operation: GraphQLRequest) =>
    new Promise<T>((resolve, reject) =>
        execute(apolloLink, operation).subscribe({
            next: data => resolve(data as T),
            error: reject,
        })
    );
