import Header from '@/components/Header'
import './globals.css'
import PageProvider from './page-provider'
import Modals from '@/components/Modals'
import Script from 'next/script'

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={` text-black bg-slate-50`}>
        {/* <Modals /> */}
        <PageProvider>
          <Header />
          {children}
          <Modals />
          <Script id="metric">
            {`(function(m,e,t,r,i,k,a){m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(92459911, "init", {
              clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true});`}
          </Script>
        </PageProvider>
      </body>
    </html>
  )
}
