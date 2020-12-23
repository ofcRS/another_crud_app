import React from 'react';
import { Formik, Form } from 'formik';

import { Modal } from 'components/Modal';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';

import { Styled } from './LinkModal.styles';
import { Props, FormValues } from './LinkModal.types';

const UrlModalBody: React.FC<Props> = ({ onSubmit, initialValues }) => {
    return (
        <Formik<FormValues>
            onSubmit={({ url }) => onSubmit(url)}
            initialValues={initialValues}
        >
            {({ submitForm }) => (
                <Form>
                    <Styled.UrlModalBody>
                        <TextField name="url" />
                        <Button onClick={submitForm}>Apply</Button>
                    </Styled.UrlModalBody>
                </Form>
            )}
        </Formik>
    );
};

export const UrlModal: React.FC<Props> = props => {
    return (
        <Modal {...props}>
            <UrlModalBody {...props} />
        </Modal>
    );
};
