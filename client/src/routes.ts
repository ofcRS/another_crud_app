import React, { lazy } from 'react';

export type Route = {
    component: React.LazyExoticComponent<React.FC> | React.FC;
    path: string;
    name?: string;
};

export type TabRoute = Route & {
    label: string;
};

export const routes: Route[] = [];

export const mainMenuRoutes: TabRoute[] = [
    {
        name: 'Posts',
        component: lazy(() => import('pages/Posts')),
        path: '/list',
        label: 'Posts',
    },
    {
        name: 'Users',
        component: lazy(() => import('pages/Users')),
        path: '/users',
        label: 'Users',
    },
];

export const allRoutes = [...routes, ...mainMenuRoutes];
