/* eslint-disable react/prop-types */
// import '../styles/components/LinkCard.css'
export default function LinkCard({ shortenedUrl, url }) {

    return(
        <div className="link-card">
                <h3 className="link-name">{shortenedUrl}</h3>
                <a href={url} className="link-url">{url}</a>
                <button className="delete-button">&times;</button>
        </div>
    )
}