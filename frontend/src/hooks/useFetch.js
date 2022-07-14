import { useState, useEffect } from "react";
import API from "../api-service";
import { useCookies } from "react-cookie";


function useFetch() {
    const [data, setData ] = useState([]);
    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState([]);
    const [token] = useCookies(['Mr-Cookie']);

    useEffect ( () => {
        async function fetchData() {
            setLoading(true);
            setError();
            const data = await API.getMovies(token['Mr-Cookie'])
                                    .catch( e => setError(e))
            setData(data);
            setLoading(false);
        }

        fetchData();
    }, []);

    return [data, loading, error];
}

export { useFetch };