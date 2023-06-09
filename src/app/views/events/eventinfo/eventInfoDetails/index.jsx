import styles from './eventInfoDetails.module.css'

export default function EventInfoDetails({ details }) {
    const { name, description, city, address } = details;



    return (
        <div className={styles.eventInfoDetails}>
            {console.log(details)}
            <h1>{name}</h1>
            <h2>{address != "undefined" && address + ","} {city}</h2>
            <p>{description}</p>
        </div>
    )
}