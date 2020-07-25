import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react';

import { Layout } from 'components/Layout';

import { allRoutes } from 'routes';

import { GlobalStyles } from 'styles/globalStyles';
import { useStore } from 'store';

export const history = createBrowserHistory();

const App: React.FC = observer(() => {
    const store = useStore();

    useEffect(() => {
        store.initApp();
    }, [store]);

    if (store.initializationInProgress) return null;

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
