

export const metadata = {
    title: 'Profile',
    description: 'Your MeetApp profile',
}
export default function ProfileLayout({ children }) {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
            {children}
        </div>
    )
}