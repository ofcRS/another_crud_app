import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import 'mobx-react-lite/batchingForReactDom';

import App from 'App';

import { root } from 'links';

const client = new ApolloClient({
    uri: 'http://192.168.1.170:3001/graphql',
    credentials: 'include',
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    root
);
