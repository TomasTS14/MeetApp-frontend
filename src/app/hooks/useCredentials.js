
import { useState, useEffect } from 'react';





export default function useCredentials() {
    // const [credentials, setCredentials] = useState(() => { useLocalStorage('credentials', false) });

    // const [errorCredentials, setError] = useState(false);
    // const [token, setToken] = useState(false);
    const [loadingCredentials, setLoading] = useState(true);

    // useEffect(() => {
    //     const getCredentials = JSON.parse(localStorage.getItem('credentials'));
    //     if (!!getCredentials) {
    //         console.log(getCredentials);
    //         setCredentials(getCredentials);

    //     }
    // }, []);

    // useEffect(() => {

    //     if (credentials) {
    //         console.log(credentials)
    //         setLoading(false);
    //     }
    // }, [credentials])

    return [credentials, loadingCredentials];
}