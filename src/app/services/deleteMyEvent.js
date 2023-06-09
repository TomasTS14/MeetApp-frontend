

export default async function deleteMyEvent(eventId, token) {
    try {
        const response = await fetch(`/api/events/delete/${eventId}`, {
            method: 'DELETE',
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