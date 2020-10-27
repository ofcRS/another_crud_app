import { AddPostMutationVariables } from 'graphql/generated';
import { FormikHelpers } from 'formik';

export type OnDeletePost = (id: number) => void;
export type OnAddPost = (
    post: AddPostMutationVariables,
    helpers: FormikHelpers<AddPostMutationVariables>
) => void;

export type PostsContext = {
    onDeletePost: OnDeletePost;
    onAddPost: OnAddPost;
};
