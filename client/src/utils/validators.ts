import { ApolloError } from '@apollo/client';

export const parseGraphQLError = (error: ApolloError): string => {
    if (error.graphQLErrors?.length > 0) {
        return error.graphQLErrors[0].message;
    } else if (error.networkError) {
        return error.networkError.message;
    } else {
        return error.message;
    }
};
