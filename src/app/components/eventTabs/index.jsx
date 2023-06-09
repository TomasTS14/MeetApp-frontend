
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Link from 'next/link';
import { useState } from 'react';





function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function EventTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Box sx={{ width: '100%', marginBottom: '1em' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} >
                    <Link href='/home/events/manage/others'><Tab label="Events" {...a11yProps(0)} /></Link> Importante, asi se mete un componente dentro de otro que linkee correctamernte
                    <Link href='/home/events/manage/mine'><Tab label="My events"  {...a11yProps(1)} /></Link> {/* IMPORTANTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
                </Tabs>
            </Box>
        </Box >

    );
}