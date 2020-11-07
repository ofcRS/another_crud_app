import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { observer } from 'mobx-react';

import { postCreatingContext } from './context';

import { AddPostMutationVariables } from 'graphql/generated';

import { Styled } from './PostCreating.styles';

export const PostCreating = observer(() => {
    const { onAddPost } = useContext(postCreatingContext);

    return (
        <Formik<AddPostMutationVariables>
            onSubmit={onAddPost}
            initialValues={{
                title: '',
                body: '',
            }}
        >
            <Form>
                <Styled.CreatePost>
                    <Field component={Styled.Title} tabIndex={1} name="title" />
                    <Field tabIndex={2} component={Styled.Body} name="body" />
                </Styled.CreatePost>
            </Form>
        </Formik>
    );
});
