
export default async function getEventData(id, token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`/api/events/${id}`, options)
        console.log(response);
        const responseJSON = await response.json();
        const event = responseJSON
        console.log(event);
        return event;
    } catch (err) {
        console.log(err);
    }
}