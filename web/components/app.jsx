import React from 'react';
import Form from './form';

import DB from '../../shared/js/db';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, info) {
    console.error('Main app component error', error, info);
  }

  async tryAuth(username: string, password: string) {
    this.db = new DB(username, password);
    const authed = await this.db.auth();
    const message = authed ? '' : 'Login failed';
    this.setState({
      authed: authed,
      message: message,
    });
  }

  render() {
    return <Form authed={this.state && this.state.authed}
                 message={this.state && this.state.message}
                 onSubmit={this.tryAuth.bind(this)} />;
  }
}
