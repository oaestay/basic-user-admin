import React, { Component } from 'react';
import axios from 'axios';

import {
  Redirect,
} from 'react-router-dom';

const proxyUrl = 'https://proxy-user.herokuapp.com';

class CreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      image: '',
      shouldRedirect: false,
    }
  };


  _handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${proxyUrl}/users`, {
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
    return (
      <div className="CreateUser">
        <h1>Create user</h1>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email"
              onChange={(e)=>this._handleEmailChange(e)}/>

            <label htmlFor="image">Image</label>
            <input className="fileInput"
              type="file"
              onChange={(e)=>this._handleImageChange(e)} />
            </div>

          <div>
            <button className="submitButton"
              type="submit"
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
