import React from 'react';
import { Field, Form, Formik } from 'formik';
import {
    RegisterMutationVariables,
    useLoginMutation,
} from 'graphql/generated/graphql';
import { Styled } from './AuthModal.styles';
import { Styled as StyledButton } from 'components/Button/Button.styles';
import { LoginFormProps } from './AuthModal.types';
import { useStore } from 'store/store';

export const LoginForm: React.FC<LoginFormProps> = ({ onSignIn }) => {
    const store = useStore();
    const [login] = useLoginMutation();

    return (
        <Formik<RegisterMutationVariables>
            onSubmit={values => store.login(values, login)}
            initialValues={{
                email: '',
                password: '',
            }}
        >
            {({ isSubmitting }) => (
                <Form>
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
