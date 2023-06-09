"use client"
import { Tabs, Tab, Box, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { theme } from '@/components/theme'
import '@/globals.css'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ overflowY: 'auto' }}

        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div >
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function MyTabs({ tabNames, children }) {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs style={{ width: '100%' }} value={value} onChange={handleChange} aria-label="basic tabs example">
                        {tabNames.map((tabName, index) => {
                            return (
                                <Tab label={tabName} {...a11yProps(index)} />
                            )
                        }
                        )
                        }
                    </Tabs>
                </Box>
                {children.map((child, index) => {
                    return (
                        <TabPanel value={value} index={index}>
                            {child}
                        </TabPanel>
                    )
                })}
            </Box>
        </ThemeProvider>
    )
}
