import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import App from 'App';

import { root } from 'links';
import { client } from 'apolloClient';

import { RootStoreProvider } from 'store/RootStore';

import 'mobx-react-lite/batchingForReactDom';

/*const rootStore = RootStore.create(undefined, {
    gqlHttpClient: apolloLink,
});*/

render(
    <RootStoreProvider>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </RootStoreProvider>,
    root
);

// (window as any).store = rootStore;
