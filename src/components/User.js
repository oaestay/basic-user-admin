import React, { Component } from 'react';
import axios from 'axios';
import {
  Link,
  Redirect,
} from 'react-router-dom';

const proxyUrl = 'https://proxy-user.herokuapp.com';

class User extends Component {
  constructor(props) {
    super(props);
  }

  _handleDelete = () => {
    axios.delete(`${proxyUrl}/users/${this.props.userId}`)
      .then((res) => {
        this.props.handleReload()
      })
      .catch((res) => {
        console.log(res.data)
      })
  }

  render() {
    return (
      <div className="User">
        <div className="UserName">{this.props.email}
          <Link to={`/edit-user/${this.props.userId}`}>
            <button><i className="fa fa-pencil" aria-hidden="true"></i></button>
          </Link>
          <button onClick={this._handleDelete}><i className="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        <div className="UserImage"><img src={this.props.image} /></div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== undefined && nextProps.email !== undefined && nextProps.image !== undefined) {
      this.setState({ shouldReload: true })
    }
  }
}

export default User
