import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import axios from 'axios'
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
     this.handleSubmit=this.handleSubmit.bind(this)
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {email, password} = this.state
    let user = {
          email: email,
          password: password
        }
    axios.post('http://localhost:3000/users', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data.user)
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

render() {
    const {email, password} = this.state
return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input 
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        
          <button placeholder="submit" type="submit">
            Sign Up
          </button>
      
        </form>
        <div>
           or <Link to="" onClick={this.props.handleToggleSignup}>log in</Link>
          </div>
          <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}
export default Signup;