import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <a href="/auth/google" className="login-button google">Login with Google</a>
      <a href="/auth/facebook" className="login-button facebook">Login with Facebook</a>
    </div>
  );
};

export default Login;
