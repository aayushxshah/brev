/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Create from "./pages/Create";
import ViewLink from "./pages/ViewLink";
import "./App.css";
import Redirect from "./pages/Redirect";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/viewlink/:linkID" element={<ViewLink />} />
                <Route path="/:shortenedUrl" element={<Redirect />} />
            </Routes>
        </div>
    );
}

export default App;
