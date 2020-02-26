import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import NotFound from './NotFound'

let hosttt = ""
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  hosttt = 'http://localhost:3000'
} else {
    hosttt = 'https://food-genie-jkc.herokuapp.com'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hosttt: hosttt
     };
  }

  render () {
    return <Router>
      <Switch>
        <Route path="/" render={props => (
              <Home {...props} 
                hosttt={this.state.hosttt}
              />
        )}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  }
}

export default App