import React from 'react';

import Main from 'views/pages/Main';

import { GlobalStyles } from 'styles/globalStyles';

const App = (): JSX.Element => {
    return (
        <>
            <GlobalStyles />
            <Main />
        </>
    );
};

export default App;
