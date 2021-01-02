import { FormikHelpers } from 'formik';
import { EditorState } from 'draft-js';

export type OnAddPost = (
    post: FormValues,
    helpers: FormikHelpers<FormValues>
) => void;

export type Context = {
    onAddPost: OnAddPost;
};

export type FormValues = {
    title: string;
    body: EditorState;
};

export type Props = {};
