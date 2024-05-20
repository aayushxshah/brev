/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect() {
    const navigate = useNavigate();
    const params = useParams();

    const { shortenedUrl } = params;

    const onLoad = async () => {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/redirect/${shortenedUrl}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log("response:", data.url);
                window.location.href = data.url;
            } else {
                navigate('/404');
                throw Error(`response status ${response.status}`);
            }
        } catch (error) {
            console.error("error:", error);
        }
    };

    useEffect(() => {
        onLoad();
    }, []);

    return <h3>Loading...</h3>;
}
