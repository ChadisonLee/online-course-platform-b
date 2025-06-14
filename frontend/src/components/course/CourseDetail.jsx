export default function CourseDetail({ course }) {
    if (!course) return <p>Loading course details...</p>;

    return (
        <div style={detailStyles.container}>
            <h2 style={detailStyles.title}>{course.title}</h2>
            <p style={detailStyles.description}>{course.description}</p>

            <section style={detailStyles.section}>
                <h3 style={detailStyles.sectionTitle}>Category</h3>
                <p>{course.categoryName}</p>
            </section>

            <section style={detailStyles.section}>
                <h3 style={detailStyles.sectionTitle}>Videos</h3>
                {course.videos && course.videos.length > 0 ? (
                    <ul style={detailStyles.videoList}>
                        {course.videos.map(video => (
                            <li key={video.id} style={detailStyles.videoItem}>{video.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No videos available.</p>
                )}
            </section>
        </div>
    );
}

const detailStyles = {
    container: {
        backgroundColor: '#f7f9fc',
        borderRadius: 10,
        padding: 24,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: 12,
        color: '#2c3e50',
    },
    description: {
        fontSize: '1.1rem',
        marginBottom: 24,
        color: '#555',
        lineHeight: 1.5,
    },
    section: {
        marginBottom: 28,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: 12,
        color: '#34495e',
    },
    videoList: {
        listStyleType: 'disc',
        paddingLeft: 20,
    },
    videoItem: {
        marginBottom: 8,
    },
};