import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import App from 'App';

import { root } from 'links';
import { client } from 'apolloClient';

import { RootStoreProvider } from 'store/RootStore';

import 'mobx-react-lite/batchingForReactDom';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.client = client;

render(
    <RootStoreProvider>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </RootStoreProvider>,
    root
);
