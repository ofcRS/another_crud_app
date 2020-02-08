import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const Posts = lazy(() => import('pages/Posts'));
const Login = lazy(() => import('pages/Login'));

import { GlobalStyles } from 'styles/globalStyles';

export const history = createBrowserHistory();

const App = (): JSX.Element => {
    return (
        <>
            <GlobalStyles />
            <Router history={history}>
                <Suspense fallback={'Loading...'}>
                    <NavLink to={'/list'}>Посты</NavLink>
                    <NavLink to={'/login'}>Логин</NavLink>
                    <Switch>
                        <Route path={'/list'} component={Posts} />
                        <Route path={'/login'} component={Login} />
                        <Redirect to={'/list'} />
                    </Switch>
                </Suspense>
            </Router>
        </>
    );
};

export default App;
