
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css';


export const metadata = {
  title: 'Meetapp',
  description: 'login',
}

const inter = Inter({ subsets: ['latin'] })
const space_grotesk = Space_Grotesk({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={space_grotesk.className}>
      <body>
        <main className="main">
          {children}
        </main>
      </body>
    </html>

  )
}
