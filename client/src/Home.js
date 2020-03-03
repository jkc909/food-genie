import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from './tiles/AppBar.jsx'

import ConfirmationDialog from './containers/LoginDialog.jsx'
import MainContainer from './containers/MainContainer.jsx'

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      initialized: false,
    }
    this.handleLogin=this.handleLogin.bind(this)
    this.handleLogout=this.handleLogout.bind(this)
    this.handleSignup=this.handleSignup.bind(this)
  }

  componentDidMount(){
    this.loginStatus()
    this.setState({ initialized: true })
  }

  handleLogin(data) {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    axios.delete(`${this.props.hosttt}/logout`, {withCredentials: true})
    .then(response => {
    })
    .catch(error => console.log(error))
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  loginStatus = () => {
      axios.get(`${this.props.hosttt}/logged_in`, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response.data)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
  }

  handleSignup = (user) => {
    axios.post(`${this.props.hosttt}/users`, {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.setState({
          isLoggedIn: true,
          user: response.data.user
        })
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLoginClick = (user) => {
    axios.post(`${this.props.hosttt}/login`, {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.setState({
          isLoggedIn: true,
          user: response.data.user
        })
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  render(){
    let login_check
    if( !this.state.isLoggedIn ) {
      login_check = 
        <ConfirmationDialog 
          handleLogin={this.handleLogin}
          handleLoginClick={this.handleLoginClick}
          handleSignup={this.handleSignup}
          hosttt={this.props.hosttt}
          errors={this.state.errors}
        />
    } else {
      login_check = 
        <MainContainer 
          user={this.state.user}
        />
    }
    return(
      <div className="App">
        <CssBaseline />
          <AppBar 
            hosttt={this.props.hosttt}
            handleLogout={this.handleLogout}
          />
          {login_check}
      </div>
    )
  }
}

export default Home;
