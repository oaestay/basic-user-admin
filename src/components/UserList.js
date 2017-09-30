import React, { Component } from 'react';
import axios from 'axios';

import User from './User';

const proxyUrl = 'https://proxy-user.herokuapp.com';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      fetching: false,
      error: null,
    }
  }

  loadData = () => {
    this.setState({ fetching: true });

    axios.get(`${proxyUrl}/users`)
      .then((res) => {
        this.setState({ data: res.data, fetching: false });
      })
      .catch((res) => {
        this.setState({ error: res.data, fetching: false });
      })
  }

renderData() {
  if (this.state.error) {
    return (
      <div className="error">
        {this.state.error.message}
      </div>
    )
  }
  if (this.state.data) {
    return (
      this.state.data.map((user) => (
        <User userId={user.id}
          email={user.email}
          image={user.image}
          key={user.id}
          handleReload={this.loadData} />
      ))
    )
  }
  return <div>Loading...</div>
}

  render() {
    return (
      <div className="UserList">
        <h1>Users</h1>
        {this.renderData()}
      </div>
    )
  }

  componentDidMount() {
    this.loadData()
  }
}

export default UserList
