/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import { TokenContextProvider } from './context/TokenContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
        <Router>
            <TokenContextProvider>
                <App />
            </TokenContextProvider>
        </Router>
)
