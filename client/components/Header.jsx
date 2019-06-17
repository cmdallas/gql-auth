import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import currentUser from '../queries/currentUser';

class Header extends Component {
  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    }

    if (user) {
      return <div>Logout</div>;
    } else {
      return <div>Login | Signup</div>;
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">{this.renderButtons()}</div>
      </nav>
    );
  }
}

export default graphql(currentUser)(Header);
