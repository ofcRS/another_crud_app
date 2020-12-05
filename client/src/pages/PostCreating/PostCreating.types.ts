import { AddPostMutationVariables } from 'graphql/generated';
import { FormikHelpers } from 'formik';
import { EditorState } from 'draft-js';

export type OnAddPost = (
    post: AddPostMutationVariables,
    helpers: FormikHelpers<AddPostMutationVariables>
) => void;

export type Context = {
    onAddPost: OnAddPost;
};

export type FormValues = {
    title: string;
    body: EditorState;
};

export type Props = {};
