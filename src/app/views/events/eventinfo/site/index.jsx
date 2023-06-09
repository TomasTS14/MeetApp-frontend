"use client"
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/spinner';
import { getEventData } from '@/services/';
import styles from './eventInfo.module.css'
import EventInfoPictures from '../eventInfoPictures';
import EventInfoDetails from '../eventInfoDetails';
import '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '@/globals.css'

export default function EventInfo({ id }) {

    const [event, setEvent] = useState(null);



    useEffect(() => {
        (async () => {
            const credentials = JSON.parse(localStorage.getItem('credentials'))
            console.log(credentials)
            if (!credentials) {
                router.push('/')

            } else {
                const event = await getEventData(id, credentials.token)
                console.log(event);
                setEvent(event);
            }
        })();
    }, [])


    return (
        !event ?
            <Spinner />

            :

            <div className={styles.eventInfo}>
                <EventInfoPictures pictures={event} />
                <EventInfoDetails details={event} />
            </div>

    )
}