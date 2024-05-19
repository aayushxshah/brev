/* eslint-disable react/prop-types */
export default function LogCard({ ip, time }) {
    const dateObj = new Date(time);
    console.log("made", time);

    return (
        <div className="log-card display-card">
            <h3 className="log-date">
                {dateObj.toLocaleDateString()} - {dateObj.toLocaleTimeString()}
            </h3>
            <h3 className="ip">{ip}</h3>
        </div>
    );
}
