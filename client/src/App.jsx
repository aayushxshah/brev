/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Login from './components/auth/login'
import SignUp from './components/auth/signup';
import Login from './pages/Login'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        Add other routes as needed
      </Routes> */}
      <Login/>
    </div>
  );
}

export default App;