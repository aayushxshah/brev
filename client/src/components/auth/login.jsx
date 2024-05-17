/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from './AuthForm';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('localhost:3000/api/user/login', { email, password });
      setMessage('Logged in successfully');
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <AuthForm
      title="Log in"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      message={message}
      linkText="Don't have an account? Sign up"
      linkPath="/signup"
    />
  );
}
