'use client'
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@/globals.css'
import styles from './page.module.css';


import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from 'swiper/element/bundle'

import { DistanceContext } from '@/contextProviders/DistanceContextProvider';

import { sendEventInteraction, getEventsNearResponse } from '@/services';
import { getCoordinates } from '@/utils/getCoordinates';

import { EventInfoModal } from '@/views/events/eventinfo';
import EventCard from '@/views/events/eventCard';
import { Spinner } from 'react-bootstrap';


register();

export default function NearMe() {
    const router = useRouter();
    const distance = useContext(DistanceContext);

    const [events, setEvents] = useState(null);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [show, setShow] = useState(false);
    const [done, setDone] = useState(false);
    const swiper = useRef(null);
    const [credentials, setCredentials] = useState(null);


    useEffect(() => {
        console.log(distance);
        const credentialsLocalStorage = JSON.parse(localStorage.getItem("credentials"));
        console.log(credentials);
        if (!credentialsLocalStorage) {
            router.push('/');
        } else {
            (async () => {
                setCredentials(credentialsLocalStorage);
                const coordinates = await getCoordinates();
                if (distance.distance && coordinates && credentialsLocalStorage.token) {
                    const response = await getEventsNearResponse(distance.distance, coordinates, credentialsLocalStorage.token);
                    const responseJSON = await response.json();
                    console.log(responseJSON);
                    setEvents(responseJSON);
                    responseJSON.length > 0 && setCurrentEvent(responseJSON[0]);
                }
            }
            )()
        }
    }, [])

    useEffect(() => {
        console.log(distance);
        const credentialsLocalStorage = JSON.parse(localStorage.getItem("credentials"));
        console.log(credentials);
        if (!credentialsLocalStorage) {
            router.push('/');
        } else {
            (async () => {
                setCredentials(credentialsLocalStorage);
                const coordinates = await getCoordinates();
                if (distance.distance && coordinates && credentialsLocalStorage.token) {
                    const response = await getEventsNearResponse(distance.distance, coordinates, credentialsLocalStorage.token);
                    const responseJSON = await response.json();
                    console.log(responseJSON);
                    setEvents(responseJSON);
                }

            }
            )()
        }
    }, [distance])

    const handleClose = (event) => {
        setShow(false);
        if (!!window && !!document) {

            window.history.pushState(``, `Near me`, `/home/events/near_me`)
            document.title = `Near me`
        }

    }
    const handleShow = (event) => {
        console.log(event);
        setShow(true)
        if (!!window && !!document) {

            window.history.pushState(`${event.description}`, `${event.name}`, `${event.id}?name=${event.name}`)
            document.title = `${event.name}`
        }
    };

    const handleSwiperSlideChange = async (e, index) => {
        console.log(index);
        console.log('slide change')
        const swiperInstance = swiper.current.swiper;
        console.log(JSON.stringify(events));
        const type = e.currentTarget.getAttribute('type');
        const interaction = type === 'like' ? true : false;
        console.log(interaction);

        const response = await sendEventInteraction(interaction, events[index].id, credentials.token);
        const responseJSON = await response.json();
        console.log(responseJSON);
        setCurrentEvent(events[index + 1]);

        swiperInstance.slideNext();
        console.log(events[index].id);
        if (index === events.length - 1) {
            setEvents([]);
            setDone(true);
        }
        console.log(JSON.stringify(events));
    };



    return (
        <div className='position-relative w-100 h-100 d-flex justify-content-center align-items-center'>
            {!events ? <Spinner />
                :
                events.length > 0 ?
                    (
                        <div className={styles.swiper_div}>
                            <swiper-container
                                ref={swiper}
                                style={{ width: "100%", height: "100%", }}
                                effect='cube'
                                pagination="false"
                                slides-per-view="1"
                                navigation="false"
                                no-swiping="true"
                                allow-touch-move="false"
                            >
                                {events.map((event, index) =>
                                    <swiper-slide
                                        key={event.id}
                                        lazy="true" >
                                        <EventCard event={event} index={index} handleShow={() => { handleShow(event) }} handleSwiperSlideChange={handleSwiperSlideChange} />
                                    </swiper-slide>
                                )}
                                <EventInfoModal event={currentEvent} show={show} onHide={handleClose} />
                            </swiper-container>

                        </div >
                    )
                    :
                    done ? (
                        <h1>There are no more events near you 💤</h1>
                    )
                        :
                        (
                            <h1>It seems like there's nothing going on in your neighborhood</h1>
                        )
            }
        </div>
    )
}