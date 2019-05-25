import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from '../PrivateRoute';
import history from '../../utils/history';
import ErrorBoundary from '../../components/ErrorBoundary';
import Layout from '../../components/Layout';
import Page404 from '../../components/Page404';

// Use React Loadable for routes
import Home from '../Home';
import TweetPage from '../TweetPage';
import Login from '../Login';

const Root = () => (
  <ErrorBoundary>
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/tweet/:tweetId" component={TweetPage} />
          <Route path="/login" component={Login} />
          <Route path="/404" component={Page404} />
          <Redirect to="/404" />
        </Switch>
      </Layout>
    </ConnectedRouter>
  </ErrorBoundary>
);

export default Root;
