"use client"
import { createContext, useEffect, useState } from "react";

const DistanceContext = createContext(undefined);
const DistanceDispatchContext = createContext(undefined);


function DistanceContextProvider({ children }) {
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        const distanceLocalStorage = Number(localStorage.getItem('distance'));
        console.log(distanceLocalStorage);
        if (!distanceLocalStorage) {
            localStorage.setItem('distance', 10);
            setDistance(10);
        } else {
            setDistance(distanceLocalStorage);
        }
    }, [])



    const handleDistanceChange = (newValue) => {
        console.log(newValue);
        localStorage.setItem('distance', newValue);

        setDistance(newValue);
    }

    return (
        <DistanceContext.Provider value={{ distance }}>
            <DistanceDispatchContext.Provider value={{ handleDistanceChange }}>
                {children}
            </DistanceDispatchContext.Provider>
        </DistanceContext.Provider>
    )
}
export { DistanceContext, DistanceDispatchContext, DistanceContextProvider }