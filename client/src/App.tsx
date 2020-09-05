import React, { Suspense, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { Layout } from 'components/Layout';

import { allRoutes } from 'routes';

import { GlobalStyles } from 'styles/globalStyles';
import { useStore, useUIStore } from 'store';

export const history = createBrowserHistory();

const App: React.FC = observer(() => {
    const store = useStore();
    const uiStore = useUIStore();

    useEffect(() => {
        store.initApp();
    }, [store]);

    useEffect(() => {
        uiStore.initUIStore(store);
    }, [store, uiStore]);

    if (store.initializationInProgress) return null;
    if (!uiStore.store) return null;

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
