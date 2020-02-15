import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Layout from 'components/Layout';

import { allRoutes } from './routes';

export const Core: React.FC = () => {
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
};
