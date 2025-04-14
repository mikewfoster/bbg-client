import Head from "next/head";
import Header from "@/components/template/Header";
import Game from "@/components/extras/Game";

import { headers } from "next/headers";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata = {
  metadataBase: new URL('https://bbg.fostercd.com'),
  title: 'Princess Rewards',
  description: 'Princess Rewards',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-57.png', sizes: '57x57', type: 'image/png' },
      { url: '/brand/favicon-76.png', sizes: '76x76', type: 'image/png' },
      { url: '/brand/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/brand/favicon-120.png', sizes: '120x120', type: 'image/png' },
      { url: '/brand/favicon-128.png', sizes: '128x128', type: 'image/png' },
      { url: '/brand/favicon-152.png', sizes: '152x152', type: 'image/png' },
      { url: '/brand/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/brand/favicon-196.png', sizes: '196x196', type: 'image/png' },
      { url: '/brand/favicon-228.png', sizes: '228x228', type: 'image/png' },
      {
        url: '/brand/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'Princess Rewards',
    description: 'Princess Rewards',
    type: 'website',
    url: 'https://bbg.fostercd.com',
    images: [{
      alt: "Princess Rewards",
      width: 1200,
      height: 630,
      url: '/brand/bbg_og_main.jpg'
    }] 
  },
  other: {
    "theme-color": "#173571",
    "msapplication-TileColor": "#173571", 
  }
}

import '@/scss/styles.scss';
import { Glass_Antiqua, Roboto } from 'next/font/google';

const glass_antiqua = Glass_Antiqua({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400','500', '700'],
  display: 'swap',
})


export default function RootLayout({ children }) {

  return (
      <html lang="en" className={`${glass_antiqua.className} ${roboto.className}`}>
        <Head>
        </Head>
        <body>
          <Header />
          {children}
        </body>
      </html>
  );
}
