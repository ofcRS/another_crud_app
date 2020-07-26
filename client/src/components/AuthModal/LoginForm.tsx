import React from 'react';
import { Field, Form, Formik } from 'formik';
import {
    MeDocument,
    MeQuery,
    RegisterMutationVariables,
    useLoginMutation,
} from 'graphql/generated';
import { observer } from 'mobx-react';
import { Styled } from './AuthModal.styles';
import { Styled as StyledButton } from 'components/Button/Button.styles';
import { LoginFormProps } from './AuthModal.types';
import { useStore } from 'store/store';

import { ErrorMessage } from '../FormError';

export const LoginForm = observer<React.FC<LoginFormProps>>(({ onSignIn }) => {
    const store = useStore();
    const [login] = useLoginMutation({
        errorPolicy: 'all',
    });

    const loginError = store.loginError;

    return (
        <Formik<RegisterMutationVariables>
            onSubmit={async values => {
                store.login(() =>
                    login({
                        variables: values,
                        update: (store, { data }) => {
                            if (!data) return null;
                            store.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    me: data.login.user,
                                },
                            });
                        },
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
                    {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
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
});
