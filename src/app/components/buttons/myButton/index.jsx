import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css'; // optional
import '@/globals.css'
export default function MyButton({ tippy_disable = false, tippy_content, type, onClick, text }) {

    const types = {
        like: "myYesButton",
        info: "myInfoButton",
        dislike: "myNoButton"
    }

    const theme = () => {
        switch (type) {
            case 'like':
                return 'green'
            case 'info':
                return 'blue'
            case 'dislike':
                return 'red'
            default:
                return 'blue'
        }
    }

    return (
        <Tippy content={tippy_content} disabled={tippy_disable} theme={`${theme()}`}>
            <button className={`${types[type]} myButton`} type={type} onClick={onClick}>{!!text && text}</button>
        </Tippy>
    )
}