

export default async function getMyEvents(token) {
    try {
        const response = await fetch(`/api/events/my_events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
        });

        return response;

    } catch (err) {
        console.log(err);
    }
}