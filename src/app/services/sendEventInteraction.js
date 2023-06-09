

export default async function sendEventInteraction(interaction, eventId, token) {
    console.log(interaction, eventId, token);
    try {
        const response = await fetch(`/api/events/interaction/${eventId}?liked=${interaction}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        }
        );
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }

}