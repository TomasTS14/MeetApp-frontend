"use client"
import styles from './eventCard.module.css';
import { Card, Carousel, Spinner } from 'react-bootstrap';
import MyButton from '@/components/buttons/myButton';
import '@/globals.css'
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function EventCard({ event, index, handleShow, handleSwiperSlideChange }) {


    const imagesPlaceHold = (event) => {
        const picturesArray = [
            { url: "https://source.unsplash.com/random/900x700/?party,rave" },
            { url: "https://source.unsplash.com/random/900x700/?party" },
            { url: "https://source.unsplash.com/random/900x700/?nightlife" },
        ]
        const images = [];

        picturesArray.map((picture, index) => {

            images.push(

                <Carousel.Item key={index} className={styles.carouselItem}>
                    <Carousel.Caption>
                        <h3>{event.distance}km away from you</h3>
                    </Carousel.Caption>
                    <div
                        className='d-flex justify-content-center align-items-center'
                        style={{ height: '100%' }}>
                        <div className={styles.carouselImage}>

                            <img

                                className='d-block mw-100 mh-100'
                                style={{ objectFit: 'cover' }}
                                src={picture.url}
                                // src={`holder.js/600x400?text=Slide ${i + 1}`} me pregunto porque esto no funciona
                                alt=" slide"
                                loading='lazy'
                            />
                        </div>
                    </div>
                </Carousel.Item >

            )
        }
        )

        return images;
    }


    return (

        < Card
            className={styles.myCard}
        >
            {console.log(event)}

            <Card.Body >
                <div className='d-flex justify-content-end w-100'>

                    <MyButton
                        tippy_content={'More info'}
                        type="info"
                        onClick={handleShow} />

                </div>

                <Carousel
                    className={`mb-3 ${styles.carousel}`}
                    interval={null}
                >
                    {imagesPlaceHold(event)}
                </Carousel>

                <div className={`${styles.cardContent} text-truncate`}>
                    <h3>{event.name}</h3>
                    <h5>{event.city}</h5>
                    <p>
                        {event.description}
                    </p>
                </div>

                <div className='d-flex justify-content-center gap-3 align-content-center mt-3'>
                    <MyButton
                        tippy_content={'Not interested'}
                        onClick={(e) => handleSwiperSlideChange(e, index)}
                        type='dislike'
                    />
                    <MyButton
                        tippy_content='I´ll be there'
                        onClick={(e) => handleSwiperSlideChange(e, index)}
                        type="like"
                    />

                </div>

            </Card.Body>
        </Card >
    )

}