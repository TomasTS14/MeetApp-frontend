

export default async function getEventsToAttend(token) {

    try {

        const fetchResult = await fetch('/api/events/liked', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (fetchResult.ok) {
            return fetchResult;
        } else {
            getEventsToAttend(token);
        }
    } catch (err) {
        console.error(err);
    }

}