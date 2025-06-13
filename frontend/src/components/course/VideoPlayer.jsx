import React from 'react';

export default function VideoPlayer({ url, title }) {
    if (!url) return <p>No video available.</p>;

    return (
        <div>
            <h4>{title}</h4>
            <video controls style={{ width: '100%', maxHeight: 480 }}>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}