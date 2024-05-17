import { useState } from 'react';

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Replace with your actual URL
        const url = "http://localhost:3000/api/user/signup";

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
                console.log(`token: ${data.token}`);
                setError(null);
                alert("Account Created");
            } else {
                setError(
                    "An error occurred. Please try again later."
                );
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred. Please try again later.");
        }
    };
    return (
        <div className="card auth login">
            <div className="modal">
                <h2>Create an Account</h2>
                <p>
                    Have an account? <a href="#">Login</a>
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
                    <button
                        type="submit"
                        className="submit-button login-button"
                    >
                        Create Account
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}