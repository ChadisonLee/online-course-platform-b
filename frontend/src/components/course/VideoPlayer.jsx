import React from 'react';

export default function VideoPlayer({ url, title }) {
    if (!url) return <p style={styles.noVideo}>No video available.</p>;

    return (
        <div style={styles.playerContainer}>
            <h4 style={styles.videoTitle}>{title}</h4>
            <video
                controls
                style={styles.video}
                preload="metadata"
            >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

const styles = {
    playerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
    },
    videoTitle: {
        fontSize: '1.1rem',
        fontWeight: 600,
        marginBottom: 12,
        color: '#34495e',
    },
    video: {
        width: '100%',
        maxHeight: 480,
        borderRadius: 8,
        backgroundColor: '#000',
    },
    noVideo: {
        fontStyle: 'italic',
        color: '#999',
    },
};