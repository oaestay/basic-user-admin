import React, { Component } from 'react';
import axios from 'axios';

import {
  Redirect,
} from 'react-router-dom';

const proxyUrl = 'http://localhost:3010';

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0,
      email: '',
      image: '',
      fetching: false,
      error: null,
      shouldRedirect: false,
    }
  };

  loadData = () => {
    this.setState({ fetching: true });

    axios.get(`${proxyUrl}/users/${this.props.match.params.userId}`)
      .then((res) => {
        this.setState({
          userId: res.data.id,
          email: res.data.email,
          image: res.data.image,
          fetching: false,
        });
      })
      .catch((res) => {
        this.setState({ error: res.data, fetching: false });
      })
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${proxyUrl}/users/${this.state.userId}`, {
      email: this.state.email,
      image: this.state.image,
    })
      .then((res) => {
        this.setState({ shouldRedirect: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _handleEmailChange = (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value
    })

  }

  _handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: reader.result
      });
    }
    reader.readAsDataURL(image)
  }

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to="/users" />
    }
    if (this.state.error) {
      return (
        <div className="error">
          {this.state.error.message}
        </div>
      )
    }
    if (this.state.image) {
      return (
        <div className="EditUser">
        <h1>Edit user</h1>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" value={this.state.email} name="email" id="email"
              onChange={(e)=>this._handleEmailChange(e)}/>

            <label htmlFor="image">Image</label>
            <input className="fileInput"
              type="file"
              onChange={(e)=>this._handleImageChange(e)} />
            </div>

          <div>
            <button className="submitButton"
              type="submit"
              onClick={(e)=>this._handleSubmit(e)}>Edit user</button>
          </div>
        </form>
      </div>
      )
    }
    return <div>Loading...</div>
  }

  componentDidMount() {
    this.loadData()
  }
}

export default EditUser;
