import { NotFound } from 'http-errors';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';

function Product() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={ListPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Product;
