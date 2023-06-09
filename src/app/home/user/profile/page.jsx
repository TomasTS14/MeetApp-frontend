"use client"
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '@/globals.css'
import { useEffect, useState } from 'react';
import { getUserInfoResponse } from '@/services/';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Profile() {
    const [user, setUser] = useState(null);
    // const [picReload, setPicReload] = useState(false);
    const [picSrc, setPicSrc] = useState("/yellow.svg")
    const [picReload, setPicReload] = useState(false)

    useEffect(() => {
        console.log("/home/profile/page.jsx =>useEffect() ");
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        if (!!credentials) {
            console.log(credentials);
            (async () => {
                const userInfoResponse = await getUserInfoResponse(credentials.appuser.id, credentials.token);
                if (userInfoResponse.ok) {
                    const userinfoJSON = await userInfoResponse.json();
                    setUser(userinfoJSON);
                    setPicSrc(`/profile_pic/${userinfoJSON.username}.svg`)
                }
            })()
        } else {
            router.push('/')
        }
    }, [])

    const nameAndLastNameFormater = (name, last_name) => {

        const FirstNameFormated = `${name[0].toLocaleUpperCase() + name.substring(1).toLocaleLowerCase()}`;
        const LastNameFormated = `${last_name[0].toLocaleUpperCase() + last_name.substring(1).toLocaleLowerCase()}`;
        return FirstNameFormated.concat(' ', LastNameFormated);
    }

    const changeProfilePic = async (username) => {

        setPicReload(true);
        console.log("/home/user/profile => changeProfilePic() username passed=" + username);
        await fetch(`/api/users/image/reload/${username}`, {
            method: 'PATCH',
            next: {
                caches: 'no-store'
            },

        });
        setPicReload(false);
        window.location.reload();


    }

    const tooltipReloadPic = (
        <Tooltip id="toolTipReloadPic">
            Get a new <strong> random</strong> profile picture!
        </Tooltip>
    )

    return (
        <>
            {user ?
                (
                    <div className='w-100'>
                        <div className='d-flex justify-content-center mb-3'>
                            <div className='position-relative'>
                                <div className='position-relative d-flex justify-content-center align-items-center rounded-circle border border-5 border-dark' style={{ height: '200px', width: '200px' }}>
                                    {picReload ?

                                        (
                                            <>
                                                <Spinner className='position-absolute' animation="border" role="status" />
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <Image className='rounded-circle' width='200' height='200' alt="Profile image" priority src={picSrc} />

                                            </>
                                        )

                                    }
                                </div>
                                <OverlayTrigger placement='right' overlay={tooltipReloadPic}>
                                    <div onClick={(e) => { changeProfilePic(user.username) }}
                                        style={{ 'right': '0' }} className='position-absolute border border-5 border-dark rounded-circle bg-success bottom-0'>
                                        <Image style={{ 'cursor': 'pointer' }} alt='reload Profile pic button' width='50' height='50' src={'/reload_white.svg'} />
                                    </div>

                                </OverlayTrigger>
                            </div>
                        </div>
                        <h3 className='mb-1 text-center text-muted'>@{user.username}</h3>

                        <h1 className='mb-3 text-center border-bottom border-3 border-top-0 border-left-0 border-right-0 border-light'>{nameAndLastNameFormater(user.name, user.last_name)}</h1>
                        <h3 className='mb-3'>Description</h3>
                        <p className='text-muted'>
                            {user.description ?
                                user.description : 'No description'}
                        </p>
                    </div >
                )
                :
                (<Spinner />)
            }
        </>

    )
}