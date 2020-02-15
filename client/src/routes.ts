import React, { lazy } from 'react';

export type Route = {
    component: React.LazyExoticComponent<() => JSX.Element>;
    path: string;
    name?: string;
};

export type TabRoute = Route & {
    label: string;
};

export const routes: Route[] = [];

export const tabRoutes: TabRoute[] = [
    {
        name: 'Posts',
        component: lazy(() => import('pages/Posts')),
        path: '/list',
        label: 'Posts',
    },
    {
        name: 'Login',
        component: lazy(() => import('pages/Login')),
        path: '/login',
        label: 'Log in / sign up',
    },
];

export const allRoutes = [...routes, ...tabRoutes];
