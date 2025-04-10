import Head from "next/head";
import Header from "@/components/template/Header";
import Game from "@/components/extras/Game";

import { headers } from "next/headers";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata = {
  title: 'Princess Rewards',
  description: 'Princess Rewards',
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
          <Game />
        </body>
      </html>
  );
}
