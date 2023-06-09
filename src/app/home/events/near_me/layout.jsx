import { DistanceContextProvider } from '@/contextProviders/DistanceContextProvider'
import styles from './layout.module.css'
export const metadata = {
    title: 'Near me',
    description: 'Events near you',
}


export default function NearMeLayout({ children }) {
    return (

        <div className={styles.layout}>
            {children}
        </div>


    )
}   