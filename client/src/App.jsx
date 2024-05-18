/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      {<Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />}/>
      </Routes> }
    </div>
  );
}

export default App;