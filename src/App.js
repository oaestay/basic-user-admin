import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/create-user">Create User</Link></li>
            </ul>
          </nav>

          <Route path="/users" component={ UserList }></Route>
          <Route path="/create-user" component={ CreateUser }></Route>
          <Route path="/edit-user/:userId" component={ EditUser }></Route>
        </div>
      </Router>
    );
  }
}

export default App;
