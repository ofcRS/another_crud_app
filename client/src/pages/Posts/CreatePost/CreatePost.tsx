import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { observer } from 'mobx-react';

import {
    AddPostMutationVariables,
    useAddPostMutation,
    PostQuery,
    PostDocument,
} from 'graphql/generated';

export const CreatePost = observer(() => {
    const [addPost, { client }] = useAddPostMutation();

    const onSubmit = async (
        values: AddPostMutationVariables,
        helpers: FormikHelpers<AddPostMutationVariables>
    ) => {
        const { data } = await addPost({ variables: values });
        const current = client?.readQuery<PostQuery>({
            query: PostDocument,
        });
        if (current?.posts && data?.addPost) {
            const updatedPosts = [data.addPost, ...current?.posts];
            client?.writeQuery<PostQuery>({
                query: PostDocument,
                data: {
                    posts: updatedPosts,
                },
            });
            helpers.resetForm();
        }
    };

    return (
        <Formik<AddPostMutationVariables>
            onSubmit={onSubmit}
            initialValues={{
                title: '',
                body: '',
            }}
        >
            <Form>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Field tabIndex={1} name="title" />
                    <button tabIndex={3} type={'submit'}>
                        submit
                    </button>
                </div>
                <Field tabIndex={2} as="textarea" name="body" />
                {/*<textarea*/}
                {/*    value={body}*/}
                {/*    onChange={e => setBody(e.target.value)}*/}
                {/*    style={{*/}
                {/*        width: 300,*/}
                {/*        padding: 0,*/}
                {/*        margin: 0,*/}
                {/*    }}*/}
                {/*/>*/}
            </Form>
        </Formik>
    );
});
