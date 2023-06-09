
import { useState, useEffect } from 'react';

export default function useCoordinates() {
    const [coordinates, setCoordinates] = useState(false);
    const [errorCoordinates, setError] = useState(false);
    const [loadingCoordinates, setLoading] = useState(true);




    useEffect(() => {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
        //     }, () => {
        //         setError(true);
        //     });
        // } else {
        //     setError(true);
        // }

        (async () => {
            try {
                if (navigator.geolocation) {

                    const gpsOptions = {

                        enableHighAccuracy: true,

                    }

                    const positionSetter = (position) => {
                        console.log("happy");
                        console.log(position);
                        const pos = position.coords;
                        setCoordinates({
                            latitude: pos.latitude,
                            longitude: pos.longitude
                        })
                        setLoading(false);

                    }

                    const reject = (err) => {
                        console.error(err);
                        setError(true);
                    }

                    navigator.geolocation.getCurrentPosition(positionSetter, reject, gpsOptions)

                } else {
                    console.error(err);
                    setError(true);
                };
            } catch (err) {
                console.error(err);
                setError(true);
            }
        })()
    }, []);

    useEffect(() => {
        if (coordinates) {
            console.log(coordinates);
            setLoading(false);
        }

    }, [coordinates])

    return [coordinates, errorCoordinates, loadingCoordinates];
}