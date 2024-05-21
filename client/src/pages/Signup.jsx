import { useContext, useState } from "react";
import TokenContext from "../context/TokenContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { setToken } = useContext(TokenContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("Loading...");

        const url = `${import.meta.env.VITE_API_BASE_URL}/api/user/signup`;

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
                setError("An error occurred. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred. Please try again later.");
        }
    };
    return (
        <div className="card auth login">
            <h2>Create an Account</h2>
            <p>
                Have an account?{" "}
                <a>
                    <Link to="/app/login">Login</Link>
                </a>
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
                    Create Account
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
