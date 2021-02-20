import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  getPost?: Maybe<Post>;
  postsPreview: Array<PostPreview>;
  getAmountOfPosts: Scalars['Int'];
  hello: Scalars['String'];
  users: Array<User>;
  me?: Maybe<User>;
};


export type QueryGetPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsPreviewArgs = {
  take: Scalars['Int'];
  skip: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  body: PostBody;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PostBody = {
  __typename?: 'postBody';
  blocks: Array<ContentBlock>;
  entityMap: Array<EntityMap>;
};

export type ContentBlock = {
  __typename?: 'contentBlock';
  key: Scalars['String'];
  type: Scalars['String'];
  text: Scalars['String'];
  depth: Scalars['Float'];
  inlineStyleRanges: Array<InlineStyleRange>;
  entityRanges: Array<EntityRange>;
};

export type InlineStyleRange = {
  __typename?: 'inlineStyleRange';
  style: Scalars['String'];
  offset: Scalars['Float'];
  length: Scalars['Float'];
};

export type EntityRange = {
  __typename?: 'entityRange';
  key: Scalars['Float'];
  offset: Scalars['Float'];
  length: Scalars['Float'];
};

export type EntityMap = {
  __typename?: 'entityMap';
  mutability: Mutability;
  type: EntityType;
  data: EntityData;
};

export enum Mutability {
  Mutable = 'MUTABLE',
  Immutable = 'IMMUTABLE',
  Segmented = 'SEGMENTED'
}

export enum EntityType {
  Image = 'IMAGE',
  Link = 'LINK'
}

export type EntityData = {
  __typename?: 'entityData';
  src?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Int'];
  post: Post;
  user: User;
  text: Scalars['String'];
  replay: Comment;
  replayId?: Maybe<Scalars['Float']>;
  replies: Array<Comment>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
};


export type PostPreview = {
  __typename?: 'PostPreview';
  id: Scalars['Float'];
  title: Scalars['String'];
  bodyPreview: Scalars['String'];
  imageSrc?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: Post;
  deletePost: ApiResponse;
  leaveComment: Comment;
  revokeRefreshTokens: Scalars['Boolean'];
  login: LoginResponse;
  register: LoginResponse;
};


export type MutationAddPostArgs = {
  body: PostBodyInput;
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationLeaveCommentArgs = {
  replayId?: Maybe<Scalars['Int']>;
  postId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationRevokeRefreshTokensArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type PostBodyInput = {
  blocks: Array<ContentBlockInput>;
  entityMap: Array<EntityMapInput>;
};

export type ContentBlockInput = {
  key: Scalars['String'];
  type: Scalars['String'];
  text: Scalars['String'];
  depth: Scalars['Float'];
  inlineStyleRanges: Array<InlineStyleRangeInput>;
  entityRanges: Array<EntityRangeInput>;
};

export type InlineStyleRangeInput = {
  style: Scalars['String'];
  offset: Scalars['Float'];
  length: Scalars['Float'];
};

export type EntityRangeInput = {
  key: Scalars['Float'];
  offset: Scalars['Float'];
  length: Scalars['Float'];
};

export type EntityMapInput = {
  mutability: Mutability;
  type: EntityType;
  data: EntityDataInput;
};

export type EntityDataInput = {
  src?: Maybe<Scalars['String']>;
};

export type ApiResponse = {
  __typename?: 'ApiResponse';
  error: Scalars['String'];
  ok: Scalars['Boolean'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type BodyFragment = (
  { __typename?: 'postBody' }
  & { blocks: Array<(
    { __typename?: 'contentBlock' }
    & Pick<ContentBlock, 'depth' | 'key' | 'text' | 'type'>
    & { entityRanges: Array<(
      { __typename?: 'entityRange' }
      & Pick<EntityRange, 'key' | 'length' | 'offset'>
    )>, inlineStyleRanges: Array<(
      { __typename?: 'inlineStyleRange' }
      & Pick<InlineStyleRange, 'length' | 'offset' | 'style'>
    )> }
  )>, entityMap: Array<(
    { __typename?: 'entityMap' }
    & Pick<EntityMap, 'mutability' | 'type'>
    & { data: (
      { __typename?: 'entityData' }
      & Pick<EntityData, 'src'>
    ) }
  )> }
);

export type PostCommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'createdAt' | 'replayId'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'email'>
  ), replies: Array<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { getPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title'>
    & { body: (
      { __typename?: 'postBody' }
      & BodyFragment
    ), comments: Array<(
      { __typename?: 'Comment' }
      & PostCommentFragment
    )> }
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'title' | 'id'>
    & { body: (
      { __typename?: 'postBody' }
      & BodyFragment
    ) }
  )> }
);

export type PostsPreviewsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type PostsPreviewsQuery = (
  { __typename?: 'Query' }
  & { totalItems: Query['getAmountOfPosts'] }
  & { postsPreview: Array<(
    { __typename?: 'PostPreview' }
    & Pick<PostPreview, 'bodyPreview' | 'imageSrc' | 'title' | 'id'>
  )> }
);

export type AddPostMutationVariables = Exact<{
  title: Scalars['String'];
  body: PostBodyInput;
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title'>
    & { body: (
      { __typename?: 'postBody' }
      & BodyFragment
    ) }
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'ApiResponse' }
    & Pick<ApiResponse, 'ok'>
  ) }
);

export type LeaveCommentMutationVariables = Exact<{
  postId: Scalars['Int'];
  text: Scalars['String'];
  replayId?: Maybe<Scalars['Int']>;
}>;


export type LeaveCommentMutation = (
  { __typename?: 'Mutation' }
  & { leaveComment: (
    { __typename?: 'Comment' }
    & PostCommentFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'id'>
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id'>
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id'>
  )> }
);

export const BodyFragmentDoc = gql`
    fragment body on postBody {
  blocks {
    depth
    key
    text
    type
    entityRanges {
      key
      length
      offset
    }
    inlineStyleRanges {
      length
      offset
      style
    }
  }
  entityMap {
    data {
      src
    }
    mutability
    type
  }
}
    `;
export const PostCommentFragmentDoc = gql`
    fragment postComment on Comment {
  id
  text
  user {
    email
  }
  createdAt
  replies {
    id
  }
  replayId
}
    `;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
  getPost(id: $id) {
    id
    title
    body {
      ...body
    }
    comments {
      ...postComment
    }
  }
}
    ${BodyFragmentDoc}
${PostCommentFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return ApolloReactHooks.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    title
    body {
      ...body
    }
    id
  }
}
    ${BodyFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export const PostsPreviewsDocument = gql`
    query PostsPreviews($skip: Int!, $take: Int!) {
  totalItems: getAmountOfPosts
  postsPreview(skip: $skip, take: $take) {
    bodyPreview
    imageSrc
    title
    id
  }
}
    `;

/**
 * __usePostsPreviewsQuery__
 *
 * To run a query within a React component, call `usePostsPreviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsPreviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsPreviewsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePostsPreviewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsPreviewsQuery, PostsPreviewsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsPreviewsQuery, PostsPreviewsQueryVariables>(PostsPreviewsDocument, baseOptions);
      }
export function usePostsPreviewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsPreviewsQuery, PostsPreviewsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsPreviewsQuery, PostsPreviewsQueryVariables>(PostsPreviewsDocument, baseOptions);
        }
export type PostsPreviewsQueryHookResult = ReturnType<typeof usePostsPreviewsQuery>;
export type PostsPreviewsLazyQueryHookResult = ReturnType<typeof usePostsPreviewsLazyQuery>;
export type PostsPreviewsQueryResult = ApolloReactCommon.QueryResult<PostsPreviewsQuery, PostsPreviewsQueryVariables>;
export const AddPostDocument = gql`
    mutation AddPost($title: String!, $body: postBodyInput!) {
  addPost(title: $title, body: $body) {
    body {
      ...body
    }
    id
    title
  }
}
    ${BodyFragmentDoc}`;
export type AddPostMutationFn = ApolloReactCommon.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, baseOptions);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = ApolloReactCommon.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Float!) {
  deletePost(id: $id) {
    ok
  }
}
    `;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const LeaveCommentDocument = gql`
    mutation LeaveComment($postId: Int!, $text: String!, $replayId: Int) {
  leaveComment(postId: $postId, text: $text, replayId: $replayId) {
    ...postComment
  }
}
    ${PostCommentFragmentDoc}`;
export type LeaveCommentMutationFn = ApolloReactCommon.MutationFunction<LeaveCommentMutation, LeaveCommentMutationVariables>;

/**
 * __useLeaveCommentMutation__
 *
 * To run a mutation, you first call `useLeaveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCommentMutation, { data, loading, error }] = useLeaveCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      text: // value for 'text'
 *      replayId: // value for 'replayId'
 *   },
 * });
 */
export function useLeaveCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LeaveCommentMutation, LeaveCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<LeaveCommentMutation, LeaveCommentMutationVariables>(LeaveCommentDocument, baseOptions);
      }
export type LeaveCommentMutationHookResult = ReturnType<typeof useLeaveCommentMutation>;
export type LeaveCommentMutationResult = ApolloReactCommon.MutationResult<LeaveCommentMutation>;
export type LeaveCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<LeaveCommentMutation, LeaveCommentMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    accessToken
    user {
      email
      id
    }
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    email
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    email
    id
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
