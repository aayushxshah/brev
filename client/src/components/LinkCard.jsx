/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import TokenContext from "../context/TokenContext";
import { useContext } from "react";

export default function LinkCard({ shortenedUrl, url, _id }) {
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();

    const onClickHandle = () => {
        navigate(`/app/viewlink/${_id}`);
    };

    const onClickDeleteHandle = async () => {
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
        <div className="link-card display-card card" onClick={onClickHandle}>
            <h3 className="link-name">{shortenedUrl}</h3>
            <a href={url} target="_blank" className="link-url">
                {url}
            </a>
            <button className="symbol delete-button" onClick={onClickDeleteHandle}>&times;</button>
        </div>
    );
}
