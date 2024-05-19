import { Link } from "react-router-dom";

export default function NotFound () {
    return (
        <>
            <p>Page not found</p>
            <Link to={'/'}>Return to Home</Link>
        </>
    );
}