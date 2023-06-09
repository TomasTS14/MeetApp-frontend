import styles from './myCard.module.css'

export default function MyCard(type, children) {

    const types = {
        'event': `${styles.myCard}`,
    }

    return (
        <div className={styles.myCard} >
            <div className={`${types[type]}`} >
                {children}
            </div >
        </div >
    )
}