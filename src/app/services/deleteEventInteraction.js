
export default async function deleteEventInteraction(eventId, token) {
    console.log('deleteEventInteraction');
    console.log(eventId);
    console.log(token);
    try {
        const response = await fetch(`/api/events/interaction/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Error deleting event' }), { status: 500 })
    }
}