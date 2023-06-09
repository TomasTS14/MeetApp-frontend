

export const getCoordinates = async () => {
    try {
        if (navigator.geolocation) {

            const gpsOptions = {

                enableHighAccuracy: true,

            }
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, gpsOptions)
            });

            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
        }
    } catch (err) {
        console.error(err);
    }


}