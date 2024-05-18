/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import Navbar from "../components/Navbar";
import TokenContext from "../context/TokenContext";

export default function Home() {

    const [content, setContent] = useState(<p className="loading">Loading...</p>);
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);

    if (token.length === 0){
        navigate('/login');
    }

    const url = "http://localhost:3000/api/link/all-links";

    const onLoad = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token,
                },
            });
            const data = await response.json();

            if (response.status === 200) {
                const cardStack = [];
                for (let i=0; i<data.length; i++){
                    cardStack.push(<LinkCard {...data[i]}/>);
                }
                setContent(cardStack);
            } else {
                throw Error(`response status ${response.status}`);
            }
        } catch (error) {
            console.error('error:',error);
        }
    };

    useEffect(() => onLoad(), []);

    return(
        <div className="container">
            <Navbar/>
            <div className="link-list">
                {content}
            </div>
        </div>
        
    )

}
