import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
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
    let hostt=""
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      hostt = 'http://localhost:3000'
  } else {
      hostt = 'https://food-genie-jkc.herokuapp.com'
  }
  axios.post(`${hostt}/login`, {user}, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data)
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
        <h1>Log In</h1>
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
            Log In
          </button>
          <div>
           or <Link to="" onClick={this.props.handleToggleSignup}>sign up</Link>
          </div>
          
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}
export default Login;