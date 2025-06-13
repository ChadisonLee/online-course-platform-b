import { useState, useEffect } from 'react';
import courseService from '../services/courseService';

export default function useCourses() {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        courseService.getCourses()
            .then(data => setCourses(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { courses, loading, error };
}