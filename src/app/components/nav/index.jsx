'use client'
import Link from 'next/link'
import styles from './nav.module.css'
import { useState, useEffect, useContext } from 'react';
import { Slider, } from '@mui/material';
import { DistanceContext, DistanceDispatchContext } from '@/contextProviders/DistanceContextProvider';
import { debounce } from '@/utils/debounce.';

export default function NavBar() {
    const [selected, setSelected] = useState(null);
    const distance = useContext(DistanceContext);
    const dispatchDistance = useContext(DistanceDispatchContext);



    const sliderDefaultValue = (distance.distance) ? distance.distance : 10;

    useEffect(() => {
        console.log(distance.distance);
        if (selected && document) {
            const buttons = document.querySelectorAll('.buttonItem');
            buttons.forEach(button => {
                if (button.classList.contains('selectedButtonItem')) {
                    button.classList.remove('selectedButtonItem');
                }
            })
            selected.classList.add('selectedButtonItem');
        }
    }, [selected])

    const handleClick = (event) => {
        console.log(event.target.innerText);
        setSelected(event.currentTarget);
    }

    //ESTOY SEGURO QUE ESTOY PUEDO MODULARLO DE ALGUNA FORMA. POR AHORA LO DEJO AQUI
    let timeoutId;

    const debounce = (func, wait) => {

        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, wait);
    }

    const handleSliderChange = (event) => {
        dispatchDistance.handleDistanceChange(event.target.value);

    }

    const sliderOnChange = (value) => {
        debounce(() => { handleSliderChange(value) }, 500);
    }
    ///me refiero a todo esto de aqui arriba
    return (
        <div className={styles.navWrapper}>
            <nav className={styles.navBg}>
                <ul className={styles.navItems}>
                    <Link style={{ width: '100%' }} href="/home/user/profile"><li onClick={(e) => { handleClick(e) }} className={'buttonItem'}>My profile</li></Link>
                    <Link style={{ width: '100%' }} href="/home/events/manage"><li onClick={(e) => { handleClick(e) }} className={'buttonItem'}>Events</li></Link>
                    <Link style={{ width: '100%' }} href="/home/events/near_me">
                        <li onClick={(e) => { handleClick(e) }} className={'buttonItem'}>
                            <div>
                                <span>Events near me</span>
                                <span><Slider onChange={(e) => { sliderOnChange(e) }} color='secondary' defaultValue={sliderDefaultValue} valueLabelDisplay="auto" /></span>
                                <small style={{ fontSize: '0.6em' }} >⬆️ max. distance in km</small>
                            </div>
                        </li>
                    </Link>

                </ul>
                <ul className={`${styles.navItems} ${styles.logout}`}>
                    <Link onClick={() => {
                        localStorage.removeItem("credentials");
                    }} href="/"><li className={`buttonItem red mb-0`}>Logout</li></Link>
                </ul>
            </nav>
        </ div >
    )
}
