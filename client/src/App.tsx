import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { Layout } from 'components/Layout';

import { allRoutes } from 'routes';

import { StoreProvider, UIStoreProvider } from 'store';
import { inMemoryToken } from 'utils/auth';

import { GlobalStyles } from 'styles/globalStyles';
import { request } from 'utils/request';

export const history = createBrowserHistory();

const App: React.FC = () => {
    useEffect(() => {
        const refreshToken = async () => {
            const { accessToken } = await request({
                url: '/auth/refresh_token',
                method: 'post',
            });
            inMemoryToken.accessToken = accessToken;
        };
        refreshToken();
    }, []);

    return (
        <StoreProvider>
            <UIStoreProvider>
                <GlobalStyles />
                <Router history={history}>
                    <Layout>
                        <Suspense fallback={'Loading...'}>
                            <Switch>
                                {allRoutes.map(({ component, path }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        component={component}
                                    />
                                ))}
                                <Redirect to={'/list'} />
                            </Switch>
                        </Suspense>
                    </Layout>
                </Router>
            </UIStoreProvider>
        </StoreProvider>
    );
};

export default App;
