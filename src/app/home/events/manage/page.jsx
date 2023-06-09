import MyTabs from "@/components/tabs"
import EventsToAttendTable from "@/components/eventsToAttendTable/index";
import MyEventsTable from "@/components/myEventsTable"
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "@/globals.css"

export const metadata = {
    title: "Manage Events",
    description: "Manage Events",
};

export default function Manage() {
    return (
        <div className='justify-content-center w-100 h-100 '>
            <MyTabs tabNames={['Events to attend', 'My Events']}>
                <EventsToAttendTable />
                <MyEventsTable />
            </MyTabs>
        </div>
    )
}