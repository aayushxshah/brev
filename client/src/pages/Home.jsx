/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import Navbar from "../components/Navbar";
import TokenContext from "../context/TokenContext";
import NoData from "../components/NoData";

export default function Home() {
    const [content, setContent] = useState(
        <p className="loading">Loading...</p>
    );
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);

    if (token.length === 0) {
        navigate("/app/login");
    }

    const onLoad = async () => {
        const url = "http://localhost:3000/api/link/all-links";

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
            });

            if (response.status === 401) {
                navigate("/app/login");
            } else if (response.status === 200) {
                const data = await response.json();
                const cardStack = [];
                if (data.length === 0) {
                    cardStack.push(<NoData />);
                }
                for (let i = 0; i < data.length; i++) {
                    cardStack.push(<LinkCard {...data[i]} />);
                }
                setContent(cardStack);
            } else {
                throw Error(`response status ${response.status}`);
            }
        } catch (error) {
            console.error("error:", error);
        }
    };

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <div className="container">
            <Navbar page={"home"} />
            <div className="link-list">{content}</div>
        </div>
    );
}
