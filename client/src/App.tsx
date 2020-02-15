import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import { Core } from './Core';

import { GlobalStyles } from 'styles/globalStyles';

export const history = createBrowserHistory();

const App: React.FC = () => {
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
