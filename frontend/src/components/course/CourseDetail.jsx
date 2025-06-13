import React from 'react';
import VideoPlayer from './VideoPlayer';

export default function CourseDetail({ course }) {
    if (!course) return <p>Loading course details...</p>;

    return (
        <div>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <h3>Videos</h3>
            {course.videos && course.videos.length > 0 ? (
                course.videos.map(video => (
                    <VideoPlayer key={video.id} url={video.url} title={video.title} />
                ))
            ) : (
                <p>No videos available.</p>
            )}
        </div>
    );
}