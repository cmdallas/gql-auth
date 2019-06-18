import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import currentUser from '../../queries/currentUser';
import login from '../../mutations/login';
import AuthForm from './AuthForm';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
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

export default graphql(login, { name: 'loginMutation' })(LoginForm);
