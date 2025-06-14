import React, { useState } from 'react';

export default function Home() {
    return (
        <div style={styles.container}>
            <div style={styles.div}>
                <h1 style={styles.title}>欢迎来到 Online Course Platform</h1>
                <p style={styles.subtitle}>Explore courses and start learning today.</p>
                <button style={styles.ctaButton} onClick={() => window.location.href = '/courses'}>
                    Browse Courses
                </button>
            </div>

            <section style={styles.featuresSection}>
                <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
                <div style={styles.featuresGrid}>
                    <FeatureCard
                        icon="🎓"
                        title="Expert Instructors"
                        description="Learn from industry professionals with years of experience."
                    />
                    <FeatureCard
                        icon="📚"
                        title="Wide Range of Courses"
                        description="From programming to marketing, find courses that suit your interests."
                    />
                    <FeatureCard
                        icon="⏰"
                        title="Learn at Your Own Pace"
                        description="Access courses anytime, anywhere on any device."
                    />
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    const [hover, setHover] = useState(false);

    const baseStyle = styles.featureCard;
    const hoverStyle = hover
        ? {
            transform: 'translateY(-8px) scale(1.05)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        }
        : {};

    return (
        <div
            style={{ ...baseStyle, ...hoverStyle }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            role="button"
            tabIndex={0}
            onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') setHover(h => !h);
            }}
        >
            <div style={styles.featureIcon}>{icon}</div>
            <h3 style={styles.featureTitle}>{title}</h3>
            <p style={styles.featureDesc}>{description}</p>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 960,
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2c3e50',
    },
    div: {
        textAlign: 'center',
        marginBottom: 60,
    },
    title: {
        fontSize: '3rem',
        fontWeight: 700,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: '1.25rem',
        color: '#555',
        marginBottom: 24,
    },
    ctaButton: {
        backgroundColor: '#3498db',
        border: 'none',
        color: '#fff',
        fontSize: '1.1rem',
        fontWeight: '600',
        padding: '12px 32px',
        borderRadius: 30,
        cursor: 'pointer',
        boxShadow: '0 6px 12px rgba(52, 152, 219, 0.4)',
        transition: 'background-color 0.3s ease',
    },
    featuresSection: {
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: 40,
    },
    featuresGrid: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: 24,
        flexWrap: 'wrap',
    },
    featureCard: {
        flex: '1 1 280px',
        backgroundColor: '#f0f6fb',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
    },
    featureIcon: {
        fontSize: '3rem',
        marginBottom: 16,
    },
    featureTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: 8,
    },
    featureDesc: {
        color: '#666',
        fontSize: '1rem',
        lineHeight: 1.4,
    },
};