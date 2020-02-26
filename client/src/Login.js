import React, { Component } from 'react';
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
    this.props.handleLoginClick(user)
    };

handleErrors = () => {
    return (
      <div>
        <ul>
        {this.props.errors.map(error => {
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
        <h3>Log In</h3>
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
            this.props.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}
export default Login;