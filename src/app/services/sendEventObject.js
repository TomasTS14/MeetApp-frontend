

export default async function sendEventObject(eventObject, token) {
    const response = await fetch('/api/events/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: `{"event": ${JSON.stringify(eventObject)}}`
    })
    console.log(response);
    return response;

}