/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../context/TokenContext";

export default function LinkCard({ shortenedUrl, url, _id }) {
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();

    const onClickCard = () => {
        navigate(`/app/viewlink/${_id}`);
    };

    const onClickCopy = (event) => {
        event.stopPropagation();
        navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/${shortenedUrl}`);
    }

    const onClickDelete = async (event) => {
        event.stopPropagation();
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/link/${_id}`;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
            });

            if (response.status === 200) {
                navigate("/app/home");
            } else {
                throw Error(`response status ${response.status}`);
            }
        } catch (error) {
            console.error("error:", error);
        }
    }

    return (
        <div className="link-card display-card card" onClick={onClickCard}>
            <div className="link-details">
                <h3 className="link-name">{shortenedUrl}</h3>
                <a href={url} target="_blank" className="link-url">
                    {url}
                </a>
            </div>
            <button className="symbol copy-button" onClick={onClickCopy}>&#128203;</button>
            <button className="symbol delete-button" onClick={onClickDelete}>&times;</button>
        </div>
    );
}
