import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { observer } from 'mobx-react';

import { AddPostMutationVariables } from 'graphql/generated';

import { postsContext } from '../context';
import { Styled } from './CreatePost.styles';

export const CreatePost = observer(() => {
    const { onAddPost } = useContext(postsContext);

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
                    <div>
                        <Field tabIndex={1} name="title" />
                        <button tabIndex={3} type={'submit'}>
                            submit
                        </button>
                    </div>
                    <Field tabIndex={2} as="textarea" name="body" />
                </Styled.CreatePost>
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
