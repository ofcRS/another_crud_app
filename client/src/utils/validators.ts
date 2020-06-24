import { CaughtGraphQLError } from 'typings/network';

export const parseGraphQLError = (error: CaughtGraphQLError): string => {
    if (error.graphQLErrors) {
        return error.graphQLErrors[0].message;
    } else if (error.networkError) {
        return error.networkError.message;
    } else {
        return error.message;
    }
};
