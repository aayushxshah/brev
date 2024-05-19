/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TokenContext from "../context/TokenContext";
import Navbar from "../components/Navbar";
import LogCard from "../components/LogCard";
import NoData from "../components/NoData";

export default function ViewLink() {
    const [content, setContent] = useState(
        <p className="loading">Loading...</p>
    );
    const [title, setTitle] = useState("Link Shortener");
    const { token } = useContext(TokenContext);
    const params = useParams();
    const navigate = useNavigate();

    if (token.length === 0) {
        navigate("/app/login");
    }

    const { linkID } = params;

    const onLoad = async () => {
        const url = `http://localhost:3000/api/link/${linkID}`;

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
                if (data.logs.length === 0) {
                    cardStack.push(<NoData />);
                }
                for (let i = 0; i < data.logs.length; i++) {
                    cardStack.push(<LogCard {...data.logs[i]} />);
                }
                setTitle(data.shortenedUrl);
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
            <Navbar page={"viewLink"} title={title} />
            <div className="link-list">{content}</div>
        </div>
    );
}
