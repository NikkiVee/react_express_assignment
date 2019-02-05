import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
        users: [],
        formInput: '',
        username: '',
        email: '',
        phone: '',
      };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/users')
    .then(res => {
      this.setState({
        users: res.data.users,
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, email, phone } = this.state;
    axios.post('/users', {
      username: { username },
      email: { email },
      phone: { phone },
    })
    .then(() => {
      this.setState({
        username: '',
        email: '',
        phone: '',
      });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    console.log(this.state.formInput);
    let displayUsers = this.state.users.map(user => {
      return (
        <div className="users" key={user.id}>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>Phone: {user.phone}</li>
          <br/>
        </div>
      );
    });
    return (
      <div className="users">
        <h1>Enter Info:</h1>
        <br/>
        Name:
        <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange}
               type="text"
               name="username"
               value={this.state.username}
               placeholder="Enter Name Here"/>
        <br/>
        <input onChange={this.handleChange}
               type="text"
               name="email"
               value={this.state.email}
               placeholder="Enter Email Here"/>
        <br/>
        <input onChange={this.handleChange}
               type="text"
               name="phone"
               value={this.state.phone}
               placeholder="Enter Phone# Here"/>
        <br/>
        <input type="submit" value="Submit"/>
        </form>
        <br/>
        {displayUsers}
        </div>
    );
  }
}

export default App;
