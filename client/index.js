import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import Dashboard from './components/Dashboard';
import LoginForm from './components/authForms/LoginForm';
import SignupForm from './components/authForms/SignupForm';
import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
  // Because we've created a networkInterface,
  // Apollo no long assumes a uri of /graphql
  uri: '/graphql',
  opts: {
    // send cookies when making queries to the backend
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  dataIdFromObject: o => o._id,
  networkInterface
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
