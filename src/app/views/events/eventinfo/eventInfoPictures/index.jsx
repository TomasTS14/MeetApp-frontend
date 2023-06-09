
import styles from './eventInfoPictures.module.css'
export default function EventInfoPictures({ pictures }) {

    // const picturesArray = [
    //     { url: "https://placehold.co/600x400/png" },
    //     { url: "https://placehold.co/600x400/png" },
    //     { url: "https://placehold.co/600x400/png" },
    // ]

    const picturesArray = [
        { url: "https://source.unsplash.com/random/900x700/?party,rave" },
        { url: "https://source.unsplash.com/random/900x700/?party" },
        { url: "https://source.unsplash.com/random/900x700/?nightlife" },
    ]

    return (
        <div className={styles.pictures}>
            {
                picturesArray.map((picture, index) =>
                    <img key={index} src={picture.url} alt="event picture" />
                )
            }
        </div>

    )
}