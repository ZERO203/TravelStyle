import { useState, useEffect } from "react";
import axios from "axios";

const useData = (url, options = { method: 'get', data: null }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios({url, ...options})
            setData(response.data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchData();
    }, [url, options.method, options.data])

    const refetch = () => {
        fetchData();
    }

    return { data, error, loading, refetch }
}

export default useData;