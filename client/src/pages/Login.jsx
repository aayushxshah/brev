/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "../context/TokenContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { setToken } = useContext(TokenContext);
    const navigate = useNavigate();
    // const baseURL = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Replace with your actual URL
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/user/login`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.status === 200) {
                setToken(data.token);
                setError(null);
                navigate("/app/home");
            } else {
                setError(
                    "Login not successful. Please check your username and password."
                );
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 400) {
                setError(
                    "Login not successful. Please check your username and password."
                );
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    };
    return (
        <div className="card auth login">
            <h2>Log In</h2>
            <p>
                Don't have an account? <Link to="/app/signup">Create Account</Link>
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="submit-button login-button">
                    Log In
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
