import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { Core } from './Core';

import { GlobalStyles } from 'styles/globalStyles';
import { useHelloQuery } from 'graphql/generated/graphql';

export const history = createBrowserHistory();

const App: React.FC = () => {
    const { loading } = useHelloQuery();

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <>
            <GlobalStyles />
            <Router history={history}>
                <Core />
            </Router>
        </>
    );
};

export default App;
