import { GraphQLError } from 'graphql';

export type CaughtGraphQLError = {
    graphQLErrors: GraphQLError[] | null;
    networkError: null | Error;
} & Error;

export type GraphQlResponse<T> = Promise<{
    data?: T;
}>;
