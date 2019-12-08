import React from 'react';
import { Formik, Form, Field } from 'formik';

import { login } from 'api/user';

import { User } from 'shared/types/User';

const Login = (): JSX.Element => {
    const handleSubmit = async (values: User): Promise<void> => {
        const data = await login(values);
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
