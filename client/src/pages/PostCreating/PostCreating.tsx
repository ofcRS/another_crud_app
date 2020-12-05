import React, { useContext } from 'react';
import { Formik, Field } from 'formik';
import { observer } from 'mobx-react';

import { postCreatingContext } from './context';

import { Styled } from './PostCreating.styles';
import { TextEditor } from './TextEditor';
import { FormValues } from './PostCreating.types';
import { convertToRaw, EditorState } from 'draft-js';

export const PostCreating = observer(() => {
    const { onAddPost } = useContext(postCreatingContext);

    const handleSubmit = ({ body, title }: FormValues) => {
        console.log({ title, body: convertToRaw(body.getCurrentContent()) });
    };

    return (
        <Formik<FormValues>
            onSubmit={handleSubmit}
            initialValues={{
                title: '',
                body: EditorState.createEmpty(),
            }}
        >
            {({ submitForm }) => (
                <Styled.CreatePost>
                    <Styled.TitleWrapper>
                        <Field
                            as={Styled.Title}
                            tabIndex={1}
                            name="title"
                            placeholder="Title"
                        />
                        <Styled.SubmitButton tabIndex={2} onClick={submitForm}>
                            Save
                        </Styled.SubmitButton>
                    </Styled.TitleWrapper>
                    <TextEditor name="body" />
                </Styled.CreatePost>
            )}
        </Formik>
    );
});
