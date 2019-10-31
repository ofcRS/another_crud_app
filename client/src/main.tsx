import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { Route, Router, Switch, NavLink } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';
import _ from 'lodash';

const history: History = createBrowserHistory();

const Component = (): JSX.Element => <Router history={history}>
    <Suspense fallback={<div>Loading...</div>}>
        {_.join([1, 2, 3, 4], ' ')}
        <NavLink to={'/'}> home </NavLink>
        <NavLink to={'/another'}> зыр </NavLink>
        <Switch>
            <Route path={'/'} exact render={() => <div>main</div>}/>
            <Route path={'/another'} render={() => <div>не мейн</div>}/>
        </Switch>
    </Suspense>
</Router>;

render(Component(), document.getElementById('root'));
