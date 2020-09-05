import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { createHttpClient } from 'mst-gql';

import { RootStore, StoreContext } from 'models';

import App from 'App';

import { root } from 'links';
import { client } from 'apolloClient';

import { UIStoreProvider } from 'store/uiStore';

import 'mobx-react-lite/batchingForReactDom';

const rootStore = RootStore.create(undefined, {
    gqlHttpClient: createHttpClient(
        process.env.GRAPHQL_URL || 'localhost:3000/graphql'
    ),
});

render(
    <StoreContext.Provider value={rootStore}>
        <UIStoreProvider>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </UIStoreProvider>
    </StoreContext.Provider>,
    root
);

(window as any).store = rootStore;
