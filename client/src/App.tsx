import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { Posts } from 'pages/Posts';
import { Login } from 'pages/Login';

import { GlobalStyles } from 'styles/globalStyles';

const history = createBrowserHistory();

const App = (): JSX.Element => {
    return (
        <>
            <GlobalStyles />
            <Router history={history}>
                <Switch>
                    <Route path={'/list'} component={Posts} />
                    <Route path={'/login'} component={Login} />
                    <Redirect to={'/list'} />
                </Switch>
            </Router>
        </>
    );
};

export default App;
