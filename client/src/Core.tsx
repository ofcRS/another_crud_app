import React, { Suspense, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { Layout, Modal } from 'components';

import { allRoutes } from './routes';

export const Core: React.FC = () => {
    const [open, setOpen] = useState<boolean>(true);

    return (
        <Layout>
            <Suspense fallback={'Loading...'}>
                <Modal open={open} onClose={() => setOpen(false)}>
                    123
                </Modal>
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
