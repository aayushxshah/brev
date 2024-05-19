/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ page, title }) {
    const navigate = useNavigate();
    const backHandle = () => {
        navigate(-1);
    };

    switch (page) {
        case "home":
            return (
                <header>
                    <h1 className="header-title">Link Shortener</h1>
                    <Link to="/create">Create New</Link>
                </header>
            );
        case "viewLink":
            return (
                <header className="title-center">
                    <button className="back-button symbol" onClick={backHandle}>
                        &lt;
                    </button>
                    <h1 className="header-title">{title}</h1>
                    <p className="placeholder"></p>
                </header>
            );
    }
}
