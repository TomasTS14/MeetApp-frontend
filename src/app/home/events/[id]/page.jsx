
import EventInfo from '@/views/events/eventinfo/site/index';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@/globals.css';

export async function generateMetadata({ params, searchParams }) {
    // read route params
    const id = params.id;
    const name = searchParams.name;

    return {
        title: `${name}`,
        description: `This is the event ${id} description`,
    };
}

export default function EventSite({ params }) {



    return (
        <>
            <EventInfo id={params.id} />
        </>

    )
}