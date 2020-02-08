import React from 'react';
import { Formik, Form, Field } from 'formik';

import { history } from 'App';

import { loginRequest } from 'api/user';
import { login } from 'utils/auth';

import { User } from 'shared/types/User';

const Login = (): JSX.Element => {
    const handleSubmit = async (values: User): Promise<void> => {
        const {
            data: { token },
        } = await loginRequest(values);
        login({
            token,
        });
        history.push('/list');
    };

    return (
        <Formik<User>
            onSubmit={handleSubmit}
            initialValues={{
                email: '',
                password: '',
            }}
        >
            <Form>
                <Field name="email" type="text" />
                <Field name="password" type="password" />
                <button>Submit</button>
            </Form>
        </Formik>
    );
};

export default Login;
