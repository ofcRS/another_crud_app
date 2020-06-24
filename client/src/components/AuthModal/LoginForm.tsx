import React from 'react';
import { Field, Form, Formik } from 'formik';
import {
    LoginResponse,
    RegisterMutationVariables,
    useLoginMutation,
} from 'graphql/generated/graphql';
import { Styled } from './AuthModal.styles';
import { Styled as StyledButton } from 'components/Button/Button.styles';
import { LoginFormProps } from './AuthModal.types';
import { useStore } from 'store/store';
import { useUIStore } from 'store/uiStore';
import { ErrorMessage } from '../FormError';

export const LoginForm: React.FC<LoginFormProps> = ({ onSignIn }) => {
    const store = useStore();
    const uiStore = useUIStore();
    const [login] = useLoginMutation({
        errorPolicy: 'all',
    });

    return (
        <Formik<RegisterMutationVariables>
            onSubmit={async values => {
                store.login(() =>
                    login({
                        variables: values,
                    })
                );
            }}
            initialValues={{
                email: '',
                password: '',
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    {store.loginError && (
                        <ErrorMessage>{store.loginError}</ErrorMessage>
                    )}
                    <Styled.InputWrapper>
                        <Styled.Label htmlFor="email">email</Styled.Label>
                        <Field id="email" name="email" />
                    </Styled.InputWrapper>
                    <Styled.InputWrapper>
                        <Styled.Label htmlFor="password">password</Styled.Label>
                        <Field id="password" type="password" name="password" />
                    </Styled.InputWrapper>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                    <StyledButton.LinkButton onClick={() => onSignIn()}>
                        Sign In
                    </StyledButton.LinkButton>
                </Form>
            )}
        </Formik>
    );
};
