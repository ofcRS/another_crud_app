import React, { lazy } from 'react';

export type Route = {
    component: React.LazyExoticComponent<React.FC>;
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
];

export const allRoutes = [...routes, ...mainMenuRoutes];
