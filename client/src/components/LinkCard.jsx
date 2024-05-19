/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function LinkCard({ shortenedUrl, url, _id }) {
    const navigate = useNavigate();
    const onClickHandle = () => {
        navigate(`/viewlink/${_id}`);
    };

    return (
        <div className="link-card display-card" onClick={onClickHandle}>
            <h3 className="link-name">{shortenedUrl}</h3>
            <a href={url} className="link-url">
                {url}
            </a>
            <button className="symbol delete-button">&times;</button>
        </div>
    );
}
