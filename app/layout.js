import Header from '@/components/Header'
import './globals.css'
import PageProvider from './page-provider'
import Modals from '@/components/Modals'

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={` text-black bg-slate-50`}>
        {/* <Modals /> */}
        <PageProvider>
          <Header />
          {children}
          <Modals />
        </PageProvider>
      </body>
    </html>
  )
}
