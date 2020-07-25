import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import App from 'App';

import { root } from 'links';
import { client } from 'apolloClient';

import 'mobx-react-lite/batchingForReactDom';
import { StoreProvider, UIStoreProvider } from './store';

render(
    <StoreProvider>
        <UIStoreProvider>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </UIStoreProvider>
    </StoreProvider>,
    root
);
