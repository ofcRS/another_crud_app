import React from 'react';
import { Formik, Form } from 'formik';

import { Modal } from 'components/Modal';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';

import { Styled } from './LinkModal.styles';
import { Props, FormValues } from './LinkModal.types';

const LinkModalBody: React.FC<Props> = ({ onSubmit }) => {
    return (
        <Formik<FormValues>
            onSubmit={({ url }) => onSubmit(url)}
            initialValues={{ url: '' }}
        >
            {({ submitForm }) => (
                <Form>
                    <Styled.LinkModalBody>
                        <TextField name="url" />
                        <Button onClick={submitForm}>Apply</Button>
                    </Styled.LinkModalBody>
                </Form>
            )}
        </Formik>
    );
};

export const LinkModal: React.FC<Props> = props => {
    return (
        <Modal {...props}>
            <LinkModalBody {...props} />
        </Modal>
    );
};
