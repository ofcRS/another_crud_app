import React from 'react';
import { observer } from 'mobx-react';
import { Field, Form, Formik } from 'formik';

import { Styled } from './AuthModal.styles';
import { Styled as StyledButton } from 'components/Button/Button.styles';
import { parseGraphQLError } from 'utils/validators';

import { ErrorMessage } from 'components/FormError';
import { MeDocument, MeQuery, useRegisterMutation } from 'graphql/generated';
import { RegistryFormProps } from './AuthModal.types';
import { useStore } from 'store';

export const RegistryForm = observer<React.FC<RegistryFormProps>>(
    ({ onBackToLogin }) => {
        const { app } = useStore();

        const [registry, { error }] = useRegisterMutation({
            onCompleted: ({ register }) => app.login(register),
            update: (store, { data }) => {
                if (!data) return;
                store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        me: data.register.user,
                    },
                });
            },
        });

        return (
            <Formik
                onSubmit={async ({ password, email }) => {
                    await registry({
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
                    <Form>
                        {error && (
                            <ErrorMessage>
                                {parseGraphQLError(error)}
                            </ErrorMessage>
                        )}
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
                        <Styled.ButtonsWrapper>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                            <StyledButton.LinkButton
                                onClick={() => onBackToLogin()}
                            >
                                Log in
                            </StyledButton.LinkButton>
                        </Styled.ButtonsWrapper>
                    </Form>
                )}
            </Formik>
        );
    }
);
