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
                <Route path="/app/signup" element={<Signup />} />
                <Route path="/app/login" element={<Login />} />
                <Route path="/app/home" element={<Home />} />
                <Route path="/app/create" element={<Create />} />
                <Route path="/app/viewlink/:linkID" element={<ViewLink />} />
                <Route path="/:shortenedUrl" element={<Redirect />} />
            </Routes>
        </div>
    );
}

export default App;
