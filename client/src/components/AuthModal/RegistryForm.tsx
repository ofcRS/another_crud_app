import React from 'react';
import {
    RegisterMutationVariables,
    useLoginMutation,
} from '../../graphql/generated/graphql';
import { Styled } from './AuthModal.styles';
import { Field, Form, Formik } from 'formik';

export const RegistryForm: React.FC = () => {
    const [login] = useLoginMutation();

    return (
        <Formik<RegisterMutationVariables>
            onSubmit={async ({ password, email }) => {
                await login({
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
                    <Styled.Title>Join</Styled.Title>
                    <Form>
                        <Styled.InputWrapper>
                            <Styled.Label htmlFor="email">email</Styled.Label>
                            <Field id="email" name="email" />
                        </Styled.InputWrapper>
                        <Styled.InputWrapper>
                            <Styled.Label htmlFor="password">
                                password
                            </Styled.Label>
                            <Field
                                id="password"
                                type="password"
                                name="password"
                            />
                        </Styled.InputWrapper>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                </Styled.FormWrapper>
            )}
        </Formik>
    );
};
