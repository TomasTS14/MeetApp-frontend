import { url } from "./sendLoginData"

export default async function getEventsNearResponse(maxDistance, coords, token) {

    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }

        const result = await fetch(`/api/events/near_me?latitude=${coords.latitude}&longitude=${coords.longitude}&maxdistance=${maxDistance}`, options);

        if (result.ok) {
            return result;
        } else {
        }
    } catch (err) {
        console.error(err);
    }




}