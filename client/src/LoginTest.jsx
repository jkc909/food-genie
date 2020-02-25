import React from 'react';
import {Link} from 'react-router-dom'
const LoginTest = () => {
  return (
    <div>
      <Link to='/login'>Log In</Link>
      <br></br>
      <Link to='/signup'>Sign Up</Link>
    </div>
  );
};
export default LoginTest;