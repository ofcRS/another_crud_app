import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { Layout } from 'components';

import { allRoutes } from './routes';
import { observer } from 'mobx-react';

export const Core = observer(() => {
    return (
        <Layout>
            <Suspense fallback={'Loading...'}>
                <Switch>
                    {allRoutes.map(({ component, path }) => (
                        <Route key={path} path={path} component={component} />
                    ))}
                    <Redirect to={'/list'} />
                </Switch>
            </Suspense>
        </Layout>
    );
});
