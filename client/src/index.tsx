import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from 'App';

import { root } from 'links';
import { inMemoryToken } from 'utils/auth';

import 'mobx-react-lite/batchingForReactDom';

const client = new ApolloClient({
    uri: 'http://192.168.1.170:3001/graphql',
    credentials: 'include',
    request: operation => {
        if (inMemoryToken.accessToken !== undefined) {
            operation.setContext({
                headers: {
                    authorization: inMemoryToken.accessToken,
                },
            });
        }
    },
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    root
);
