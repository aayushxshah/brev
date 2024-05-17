/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from './AuthForm';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', { email, password });
      setMessage('Account created successfully');
    } catch (error) {
      setMessage('Error creating account');
    }
  };

  return (
    <AuthForm
      title="Create an account"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      message={message}
      linkText="Already have an account? Log in"
      linkPath="/login"
    />
  );
};

export default SignUp;
