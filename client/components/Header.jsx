import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import currentUser from '../queries/currentUser';
import logout from '../mutations/logout';

class Header extends Component {
  onLogout() {
    this.props.mutate({
      refetchQueries: [{ query: currentUser }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <div>
          <a onClick={this.onLogout.bind(this)}>
            <li>Logout</li>
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            GQL Auth
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logout)(graphql(currentUser)(Header));
