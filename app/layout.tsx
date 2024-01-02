import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReduxProvider } from './store/provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextjs Notes | Kurt Russelle Marmol',
  description: 'Your notes, always in your pocket. Whether you\'re on a subway, in a café, or cozied up at home, NoteSpace syncs across all your devices seamlessly. Never lose a valuable thought again!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
