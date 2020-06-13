import React from 'react';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react';

import { Modal } from 'components';
import {
    RegisterMutationVariables,
    useRegisterMutation,
} from 'graphql/generated/graphql';
import { useUIStore } from 'store/uiStore';

import { Styled } from './RegistryModal.styles';

export const RegistryModal = observer(() => {
    const [register] = useRegisterMutation();
    return (
        <Modal>
            <Formik<RegisterMutationVariables>
                onSubmit={async ({ password, email }) => {
                    await register({
                        variables: {
                            email,
                            password,
                        },
                    });
                }}
                initialValues={{
                    email: '',
                    password: '',
                }}
            >
                {({ isSubmitting }) => (
                    <Styled.FormWrapper>
                        <Form>
                            <Field type="email" name="email" />
                            <Field type="password" name="password" />
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    </Styled.FormWrapper>
                )}
            </Formik>
        </Modal>
    );
});
