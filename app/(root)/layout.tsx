import '@/app/globals.css'
import type React from 'react'
import type { Metadata } from 'next'

import Header from '@/app/(root)/components/Header'
import Banner from '@/app/(root)/components/Banner'
import FootMarquee from '@/app/(root)/components/FootMarquee'
import Footer from '@/app/(root)/components/Footer'
import GoTop from '@/components/GoTop'
import { ClientHooks } from '@/components/ClientHooks'
import clsx from 'clsx'

const currentYear = new Date().getFullYear()

export const metadata: Metadata = {
  title: `${currentYear} 熙歌工作室慶生網頁`,
  description: `熙歌工作室 ${currentYear} 隆重鉅獻，歡迎加入婚叫們溫暖的大家庭`,
  icons: {
    icon: '/images/icon.webp'
  },
  openGraph: {
    images: [{
      url: 'https://cyg.sid.tw/images/main.webp',
      width: 1024,
      height: 576,
    }]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-hant-tw">
      <body className="font-sans overflow-x-hidden">
        <ClientHooks />
        <Header />
        <Banner />
        <main
          className={clsx(
            "block bg-[url('/images/bg.webp')] bg-center relative z-10",
            '-safari:bg-fixed -safari:bg-cover',
          )}>
          {children}
        </main>
        <FootMarquee />
        <Footer />
        <GoTop />
      </body>
    </html>
  )
}
