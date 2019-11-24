import React from 'react';

import Main from 'pages/Posts';

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
