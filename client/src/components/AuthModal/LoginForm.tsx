import React from 'react';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react';
import { Styled } from './AuthModal.styles';
import { Styled as StyledButton } from 'components/Button/Button.styles';
import { LoginFormProps } from './AuthModal.types';

export const LoginForm = observer<React.FC<LoginFormProps>>(({ onSignIn }) => {
    /*const store = useStore();

    const [login, { error }] = useLoginMutation({
        errorPolicy: 'all',
        onCompleted: store.login,
    });*/

    return (
        <Formik
            onSubmit={
                values => null
                /*login({
                    variables: values,
                    update: (store, { data }) => {
                        if (!data) return;
                        store.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                                me: data.login.user,
                            },
                        });
                    },
                })*/
            }
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
                    <StyledButton.LinkButton onClick={() => onSignIn()}>
                        Sign In
                    </StyledButton.LinkButton>
                </Form>
            )}
        </Formik>
    );
});
