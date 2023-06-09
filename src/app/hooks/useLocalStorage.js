import { useEffect, useState } from "react";

function getLocalStorage(key, initialValue) {
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        console.log(item);
        const initial = JSON.parse(item);
        return initial | initialValue;
    }
}
export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        getLocalStorage(key, initialValue);
    }
    );
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [storedValue]);
    return [storedValue, setStoredValue];
}
