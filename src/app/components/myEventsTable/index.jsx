"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Button, Modal, Spinner, Stack } from 'react-bootstrap';
import { deleteMyEvent, getMyEvents } from "@/services/";
import { formatDate } from '@/utils/formatDate';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '@/globals.css'
import './myEventsTable.css'
import Link from 'next/link';




export default function MyEventsTable() {

    const router = useRouter();
    const apiRef = useGridApiRef();

    const [events, setEvents] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {

        const credentials = JSON.parse(localStorage.getItem("credentials"));
        if (!!credentials) {
            console.log(credentials);
            (async () => {

                try {
                    const myEventsResponse = await getMyEvents(credentials.token);
                    if (myEventsResponse.ok) {
                        const myEvents = await myEventsResponse.json();
                        console.log(myEvents);
                        setEvents(myEvents);
                        setLoading(false);
                    }
                } catch (err) {
                    console.log(err);
                }
            })()
        } else {
            router.push('/');
            console.log('no credentials');
        }
    }, [])

    const columns = [

        {
            field: 'name', headerName: 'Title', flex: 1, headerClassName: 'eventGridHeader',
            renderCell: (params) => (<Link href={`/home/events/${params.id}?name=${params.value}`}>{params.value}</Link>)
        },
        {
            field: 'date', headerName: 'Date', type: 'date', flex: 1, headerClassName: 'eventGridHeader',
            valueGetter: formatDate
        },
        {
            field: 'city', headerName: 'Location', flex: 1, headerClassName: 'eventGridHeader'
        }
    ]

    const handleGetData = (selectedRows) => {
        const selectedRowsIds = Array.from(selectedRows.keys() || []);
        setSelectedEvents(selectedRowsIds);
        if (selectedRowsIds.length > 0) {
            setShow(true);
        }

    };

    const handleClose = () => {
        setShow(false);
        if (error) {
            setError(null)
        }
        if (success) {
            setSuccess(null)
        }
    }

    const handleSubmit = () => {
        console.log('submit');
        try {
            selectedEvents.forEach(async (eventId) => {
                const credentials = JSON.parse(localStorage.getItem('credentials'));
                const response = await deleteMyEvent(eventId, credentials.token);
                //esto puede refactorizarse para que se controlen varias promesas en paquete.
                if (response.ok) {
                    // const newEvents = events.filter((event) => event.id !== eventId);
                    // setEvents(newEvents);
                }
            })
            const newEvents = events.filter((event) => !selectedEvents.includes(event.id));
            setEvents(newEvents);
            setSuccess(true)
        } catch (error) {
            setError(true)
        }

        setShow(false);
    }


    return (

        <div style={{ display: "flex", flexDirection: "column", textAlign: 'left', gap: '1em', width: '100%', height: '30em', justifyContent: 'center' }}>
            {loading ?
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <Spinner />
                </div>
                :
                (
                    <>
                        < DataGrid
                            className='myEventsTable'
                            apiRef={apiRef}
                            // autoHeight
                            aut
                            rows={events}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                        <Stack direction="horizontal" gap={3}>
                            <Button onClick={() => { router.push('/home/events/create') }} className='ms-auto' variant='primary' >Create event</Button>
                            <Button onClick={() => { handleGetData(apiRef.current.getSelectedRows()) }} variant='danger' >Cancel event</Button>
                        </Stack>
                        <Modal show={show} centered onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Warning</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{`Are you sure you want to cancel ${selectedEvents.length} events ?`}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleSubmit}>
                                    Confirm
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={error} centered onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Error</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{`Error deleting events`}</Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={success} centered onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Success</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{`Events deleted successfully`}</Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>
                    </>
                )
            }
        </div>
    )
}