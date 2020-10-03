import React from 'react';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react';
import { Styled } from './AuthModal.styles';
import { Styled as StyledButton } from 'components/Button/Button.styles';
import { LoginFormProps } from './AuthModal.types';
import { useLoginMutation, MeDocument, MeQuery } from '../../graphql/generated';
import { useStore } from 'store';
import { parseGraphQLError } from 'utils/validators';
import { ErrorMessage } from 'components/FormError';

export const LoginForm = observer<React.FC<LoginFormProps>>(({ onSignIn }) => {
    const { app } = useStore();

    const [login, { error }] = useLoginMutation({
        errorPolicy: 'all',
        onCompleted: app.login,
        update: (store, { data }) => {
            if (!data) return;
            store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                    me: data.login.user,
                },
            });
        },
    });

    return (
        <Formik
            onSubmit={values =>
                login({
                    variables: values,
                })
            }
            initialValues={{
                email: '',
                password: '',
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    {error && (
                        <ErrorMessage>{parseGraphQLError(error)}</ErrorMessage>
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
});
