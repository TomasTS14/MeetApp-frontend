import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "@/globals.css"
import CreateEventForm from "@/views/events/createEventForm"
export default function CreateEventPage() {
    return (
        <div className='justify-content-center w-100 d-flex align-items-center ' style={{
            overflowY: 'auto'
        }}>
            <CreateEventForm />
        </div >
    )
}