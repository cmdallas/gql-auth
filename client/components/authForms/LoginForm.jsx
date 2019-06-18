import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { hashHistory } from 'react-router';

import currentUser from '../../queries/currentUser';
import login from '../../mutations/login';
import AuthForm from './AuthForm';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    // @HACK
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.props
      .loginMutation({
        variables: { email, password },
        refetchQueries: [{ query: currentUser }]
      })
      .catch(exception => {
        const errors = exception.graphQLErrors.map(e => e.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h4>Login</h4>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default compose(
  graphql(login, { name: 'loginMutation' }),
  graphql(currentUser)
)(LoginForm);
