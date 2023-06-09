import styles from './home.module.css'
import NavBar from '../components/nav'
import { DistanceContextProvider } from '@/contextProviders/DistanceContextProvider'

export const metadata = {
    title: 'Home',
    description: 'MeetApp home',
}

export default function HomeLayout({ children }) {
    return (
        <div className={styles.container}>
            <DistanceContextProvider>
                <NavBar />
                <div className="bg-white p-3 rounded d-flex justify-content-center align-content-center text-wrap" >
                    {children}
                </div>
            </DistanceContextProvider>
        </div >
    )
}