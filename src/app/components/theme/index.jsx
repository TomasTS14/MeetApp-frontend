import { createTheme } from "@mui/material";
import { orange, red, yellow } from "@mui/material/colors";
import { Space_Grotesk } from 'next/font/google';

const space_grotest = Space_Grotesk({ subsets: ['latin'] })
export const theme = createTheme({
    typography: {
        fontFamily: 'seoge-ui, Arial',
        fontWeight: 500,

    },
    palette: {
        primary: {
            main: '#e46d0bbd;',
        },
        secondary: {
            main: red[500],
        },
    }
});