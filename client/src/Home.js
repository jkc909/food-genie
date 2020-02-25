import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from './tiles/AppBar.jsx'

import ConfirmationDialog from './containers/LoginDialog.jsx'
import MainContainer from './containers/MainContainer.jsx'

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    }
  }

  componentDidMount(){
    this.setState({ initialized: true})
  }

  render(){
    let login_check
    if(  !this.props.loggedInStatus) {
      login_check = 
        <ConfirmationDialog 
          handleLogin={this.props.handleLogin}
        />
    } else {
      login_check = 
        <MainContainer 
        user={this.props.user}
        />
    }

    return(
      <div className="App">
        <CssBaseline />
          <AppBar 
            handleLogout={this.props.handleLogout}
          />
          {login_check}
      </div>
    )
  }
}

export default Home;
