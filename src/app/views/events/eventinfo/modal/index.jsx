"use client"

import { Spinner } from '@/components/spinner/index';
import EventInfoPictures from '../eventInfoPictures';
import EventInfoDetails from '../eventInfoDetails';
import styles from './eventInfo.module.css'
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';


export default function EventInfoModal({ event, show, onHide }) {
    const [eventInfo, setEventInfo] = useState(null);

    useEffect(() => {
        console.log(event);
        setEventInfo(event);
    }, [event])


    return (
        <Modal show={show} onHide={onHide} size="xl" scrollable centered>

            <Modal.Header closeButton />
            <Modal.Body>
                {!eventInfo ?
                    <Spinner />
                    :

                    <div className={styles.eventInfo}>
                        <EventInfoPictures pictures={eventInfo} />
                        <EventInfoDetails details={eventInfo} />
                    </div>
                }

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}