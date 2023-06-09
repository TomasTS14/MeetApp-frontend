"use client"
import { useState, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import eventFormReducer from '@/reducers/eventFormReducer';
import { eventFormActionTypes } from '@/consts';
import { sendEventObject } from '@/services';

import { Form, Button, Stack, Modal } from 'react-bootstrap';
import styles from './styles.module.css'
import './styles.module.css'

const initialState = {
    title: '',
    description: '',
    address: '',
    city: '',
    region: '',
    country: '',
    date: ''
}

export default function CreateEventForm() {
    const router = useRouter();

    const [state, dispatch] = useReducer(eventFormReducer, initialState);
    const [succes, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [newEventObject, setNewEventObject] = useState(null);

    const handleTextChange = (e) => {
        dispatch({
            type: eventFormActionTypes.handleInputText,
            field: e.target.id,
            payload: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credentials = JSON.parse(localStorage.getItem("credentials"));
            if (!!credentials) {
                const newEvent = await sendEventObject(state, credentials.token);
                if (newEvent.ok) {
                    const newEventJson = await newEvent.json();
                    setNewEventObject(newEventJson);
                    console.log(newEventJson);
                    console.log(newEvent);
                    setSuccess(true);
                } else {
                    setError(true);
                }
            }
        } catch (err) {
            console.log(err);
        }

        console.log(state);
    }

    return (
        <div className={styles.myForm}>
            <h1>Create your event 👽</h1>
            <Form onSubmit={(e) => { handleSubmit(e) }}>
                <Form.Group className='mb-3' controlId="name">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                        onChange={(e) => handleTextChange(e)}
                        type="text"
                        placeholder="Enter event name"
                        minLength={5}
                        maxLength={50}
                        required />
                </Form.Group>
                <Form.Group className='mb-3' controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        onChange={(e) => handleTextChange(e)}
                        as="textarea"
                        placeholder="Enter event description"
                        maxLength={400} />
                </Form.Group>
                <details>
                    <summary>Location details... *</summary>
                    <Form.Group className='mb-3' controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={(e) => handleTextChange(e)}
                            type="text"
                            placeholder="Enter address"
                            required />
                        <small>
                            Please enter a valid address or the event wont be visible to others.
                        </small>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="city">
                        <Form.Label>City*</Form.Label>
                        <Form.Control
                            onChange={(e) => handleTextChange(e)}
                            type="text"
                            placeholder="Enter city"
                            required />
                        <small >
                            Please enter a valid city or the event wont be visible to others.
                        </small>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="region">
                        <Form.Label>Region*</Form.Label>
                        <Form.Control
                            onChange={(e) => handleTextChange(e)}
                            type="text"
                            placeholder="Enter region/state"
                            required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="country">
                        <Form.Label>Country*</Form.Label>
                        <Form.Control
                            onChange={(e) => handleTextChange(e)}
                            type="text"
                            placeholder="Enter country"
                            required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="date">
                        <Form.Label>Event Date*</Form.Label>
                        <Form.Control
                            onChange={(e) => handleTextChange(e)}
                            type="date"
                            placeholder="Enter event date"
                            required />
                    </Form.Group>
                    <Stack direction="horizontal" gap={3}>
                        <Button className='ms-auto' variant="danger" >
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Create event
                        </Button>
                    </Stack>
                </details>

            </Form>
            <Modal show={succes} onHide={() => setSuccess(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your event has been created successfully!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => router.push(`/home/events/${newEventObject.id}?name=${newEventObject.name}`)}>
                        Go to event
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={error} onHide={() => setError(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    There was an error creating your event, please try again later.
                </Modal.Body>
            </Modal>

        </div >

    )

}