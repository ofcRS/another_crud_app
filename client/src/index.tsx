import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from 'App';

import { root } from 'links';

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    root
);
