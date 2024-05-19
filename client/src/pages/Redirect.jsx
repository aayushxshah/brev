/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Redirect() {
    const params = useParams();

    const { shortenedUrl } = params;

    const onLoad = async () => {
        const url = `http://localhost:3000/api/redirect/${shortenedUrl}`;

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
