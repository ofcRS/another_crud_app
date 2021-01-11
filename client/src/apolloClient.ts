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

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable((observer) => {
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

export const apolloLink = ApolloLink.from([
	requestLink,
	new HttpLink({
		uri: `http://${process.env.GRAPHQL_HOST}:${process.env.GRAPHQL_PORT}/graphql`,
		credentials: 'include',
	}),
]);

export const client = new ApolloClient({
	link: ApolloLink.from([
		requestLink,
		new HttpLink({
			uri: process.env.GRAPHQL_URL,
			credentials: 'include',
		}),
	]),
	cache: new InMemoryCache(),
});

export const makePromise = <T>(operation: GraphQLRequest) =>
	new Promise<T>((resolve, reject) =>
		execute(apolloLink, operation).subscribe({
			next: (data) => resolve(data as T),
			error: reject,
		})
	);
