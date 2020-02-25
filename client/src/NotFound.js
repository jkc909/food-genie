import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class NotFound extends Component {
  render () {
    return <div text textAlign='center'>
      <h1>404: Not found</h1>
      <button as={Link} to='/'>Back to home</button>
    </div>
  }
}

export default NotFound