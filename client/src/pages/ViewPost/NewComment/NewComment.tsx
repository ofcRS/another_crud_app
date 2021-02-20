import React, { KeyboardEvent, useRef } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';

import { TextArea } from 'components/TextArea';
import { Button, ButtonVariant } from 'components/Button';

import { Styled } from './NewComment.styles';
import { FormValues, Props } from './NewComment.types';

import { Keys } from 'consts/keys';
import { validate } from './validator';

export const NewComment: React.FC<Props> = ({ onLeaveComment }) => {
    const formikRef = useRef<FormikProps<FormValues>>(null);

    const handleSubmit = async (
        { commentText }: FormValues,
        { setFieldValue, setErrors }: FormikHelpers<FormValues>
    ) => {
        await onLeaveComment(commentText);
        setFieldValue('commentText', '');
        setErrors({});
    };

    const handleCtrlEnterPress = (
        event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.ctrlKey && event.key === Keys.Enter) {
            formikRef.current?.submitForm();
        }
    };

    return (
        <Formik<FormValues>
            innerRef={formikRef}
            onSubmit={handleSubmit}
            initialValues={{
                commentText: '',
            }}
            validate={validate}
        >
            {({ submitForm }) => (
                <Styled.NewComment>
                    <TextArea
                        placeholder="Comment..."
                        name="commentText"
                        onKeyDown={handleCtrlEnterPress}
                    />
                    <Button onClick={submitForm} variant={ButtonVariant.submit}>
                        Send
                    </Button>
                </Styled.NewComment>
            )}
        </Formik>
    );
};
