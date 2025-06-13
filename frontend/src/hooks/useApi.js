import { useState, useEffect } from 'react';

export default function useApi(apiFunc, params = [], immediate = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const execute = (...args) => {
        setLoading(true);
        setError(null);
        return apiFunc(...args)
            .then(res => {
                setData(res);
                return res;
            })
            .catch(err => {
                setError(err);
                throw err;
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (immediate) {
            execute(...params);
        }
    }, []);

    return { data, loading, error, execute };
}