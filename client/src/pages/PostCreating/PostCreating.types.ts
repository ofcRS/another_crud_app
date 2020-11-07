import { AddPostMutationVariables } from 'graphql/generated';
import { FormikHelpers } from 'formik';

export type OnAddPost = (
    post: AddPostMutationVariables,
    helpers: FormikHelpers<AddPostMutationVariables>
) => void;

export type Context = {
    onAddPost: OnAddPost;
};

export type Props = {};
