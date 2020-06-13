import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Core } from 'Core';

import { GlobalStyles } from 'styles/globalStyles';
import { useHelloQuery } from 'graphql/generated/graphql';
import { StoreProvider } from 'store/store';
import { UIStoreProvider } from './store/uiStore';

export const history = createBrowserHistory();

const App: React.FC = () => {
    const { loading } = useHelloQuery();

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <StoreProvider>
            <UIStoreProvider>
                <GlobalStyles />
                <Router history={history}>
                    <Core />
                </Router>
            </UIStoreProvider>
        </StoreProvider>
    );
};

export default App;
