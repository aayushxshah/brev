/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../context/TokenContext";

export default function Create() {
    const [shortenedLink, setShortenedLink] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState(null);
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token.length === 0) {
            navigate("/app/login");
        }
    }, [token, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = "http://localhost:3000/api/link/add-link";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
                body: JSON.stringify({
                    url: link,
                    shortenedUrl: shortenedLink,
                }),
            });

            if (response.status === 201) {
                navigate("/app/home");
            } else if (response.status === 400) {
                setError("Alias already exists");
            }
            else {
                const data = await response.json();
                console.error("error:", data.message);
            }
        } catch (error) {
            console.error("error:", error.message);
        }
    };

    const handleClose = () => {
        navigate("/app/home");
    }

    return (
        <div className="card create">
            <h2>Create New Link</h2>
            <button className="symbol close-button" onClick={handleClose}>&times;</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="shortened_link">Shortened Link</label>
                <div className="short-link-entry">
                    <h3>www.domain.com/</h3>
                    <input
                        type="text"
                        id="shortened_link"
                        name="shortened_link"
                        value={shortenedLink}
                        onChange={(e) => setShortenedLink(e.target.value)}
                    />
                </div>
                <label htmlFor="link">Link to Shorten</label>
                <input
                    type="text"
                    id="link"
                    name="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button type="submit" className="submit-button">
                    Create
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
