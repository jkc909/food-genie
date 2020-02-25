import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import NotFound from './NotFound'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
     this.handleLogin=this.handleLogin.bind(this)
  }

  componentDidMount() {
    this.loginStatus()
  }

  handleLogin(data) {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    axios.delete('http://localhost:3000/logout', {withCredentials: true})
    .then(response => {
    })
    .catch(error => console.log(error))
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  loginStatus = () => {
    let hostt=""
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      hostt = 'http://localhost:3000'
    } else {
        hostt = 'https://murmuring-sierra-33532.herokuapp.com'
    }
      axios.get(`${hostt}/logged_in`, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response.data)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
    }


  render () {
    return <Router>
      <Switch>
        <Route path="/" render={props => (
              <Home {...props} 
                loggedInStatus={this.state.isLoggedIn}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                user={this.state.user}
                loginStatus={this.loginStatus}
              />
        )}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  }
}

export default App