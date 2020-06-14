import React from 'react';
import { Field, Form, Formik } from 'formik';
import {
    RegisterMutationVariables,
    useLoginMutation,
    useRegisterMutation,
} from 'graphql/generated/graphql';
import { Styled } from './AuthModal.styles';

export const LoginForm: React.FC = () => {
    const [login] = useLoginMutation();

    return (
        <Formik<RegisterMutationVariables>
            onSubmit={async ({ password, email }) => {
                const { data } = await login({
                    variables: {
                        email,
                        password,
                    },
                });
                console.log(data?.login.accessToken);
            }}
            initialValues={{
                email: '',
                password: '',
            }}
        >
            {({ isSubmitting }) => (
                <Styled.FormWrapper>
                    <Styled.Title>Login</Styled.Title>
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
