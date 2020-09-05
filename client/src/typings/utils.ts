export type GraphQLToMST<T extends { __typename?: string }> = Omit<
    T,
    '__typename'
>;
