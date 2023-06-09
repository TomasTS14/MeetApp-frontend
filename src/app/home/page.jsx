'use client'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@/globals.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCoordinates } from '@/utils/getCoordinates';
import { getEventsNearResponse } from '@/services';
import { Spinner, Container } from 'react-bootstrap';

export default function UserHome() {
    const [user, setUser] = useState()
    const [nEvents, setNevents] = useState();
    const router = useRouter();

    useEffect(() => {

        const credentials = JSON.parse(localStorage.getItem("credentials"));
        if (!!credentials) {

            setUser(credentials.appuser);

            (async () => {
                try {
                    console.log("home=>useEffect()=>anonAsync()");
                    const coordinates = await getCoordinates();
                    const responseEventsNear = await getEventsNearResponse(80, coordinates, credentials.token);
                    const responseEventsNearJSON = await responseEventsNear.json();
                    console.log("/home=>useEffect()=>anonAsync()=>responseEventsNearJSON");
                    console.log(responseEventsNearJSON);
                    console.log(responseEventsNearJSON.length);
                    setNevents(responseEventsNearJSON.length);
                } catch (error) {
                    console.log(error);
                }
            })()


        } else {
            router.push('/');
        }
    }, [router])

    const showMessage = () => {
        const greetings = (message, emoji) => {
            return (
                <div>
                    <h3>Hello {user.username} , how are you? </h3>
                    <h3>{message}{!!emoji && (emoji)}</h3>
                </div>
            )
        }

        if (!!user && nEvents !== undefined) {
            if (nEvents === 0) {
                return greetings('There are no events close to you', (<span role="img"> &#x1F921;</span>))
            } else if (nEvents === 1) {
                return greetings("There is only one event close to you", (<span role="img">&#x1F62D;</span>))
            } else {
                return greetings("There are " + nEvents + " events close to you!", (<span role="img">&#x1F680;</span>))
            }
        } else {
            return (<Spinner />)
        }
    }

    return (
        <div className='d-flex align-items-center'>
            {showMessage()}
        </div>
    )
}
