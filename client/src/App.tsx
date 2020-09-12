import React, { Suspense, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { Layout } from 'components/Layout';

import { allRoutes } from 'routes';

import { GlobalStyles } from 'styles/globalStyles';
import { useStore } from 'store';

export const history = createBrowserHistory();

const App: React.FC = observer(() => {
    const { app } = useStore();

    useEffect(() => {
        app.initApp();
    }, [app]);

    if (!app.initialized) return null;

    return (
        <Router history={history}>
            <GlobalStyles />
            <Layout>
                <Suspense fallback={null}>
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
    );
});

export default App;
