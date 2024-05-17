/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
// import './AuthForm.css';

const AuthForm = ({
  title,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  message,
  linkText,
  linkPath
}) => {
  return (
    <div className="auth-container">
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to={linkPath}>{linkText}</Link>
    </div>
  );
};

export default AuthForm;
