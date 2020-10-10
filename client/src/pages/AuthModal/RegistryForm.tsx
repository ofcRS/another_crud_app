import React from 'react';

import { Styled } from './AuthModal.styles';
import { Field, Form, Formik } from 'formik';
import { Styled as StyledButton } from '../../components/Button/Button.styles';
import { RegistryFormProps } from './AuthModal.types';

export const RegistryForm: React.FC<RegistryFormProps> = ({
    onBackToLogin,
}) => {
    /*const [registry, { error }] = useRegisterMutation();*/

    return (
        <Formik
            onSubmit={async ({ password, email }) => {
                /*await registry({
                    variables: {
                        email,
                        password,
                    },
                });*/
            }}
            initialValues={{
                email: '',
                password: '',
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    {/*{error && (
                        <ErrorMessage>{parseGraphQLError(error)}</ErrorMessage>
                    )}*/}
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
                    <StyledButton.LinkButton onClick={() => onBackToLogin()}>
                        Log in
                    </StyledButton.LinkButton>
                </Form>
            )}
        </Formik>
    );
};