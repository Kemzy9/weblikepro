import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme-provider'
import GoogleAnalytics from '@/app/GoogleAnalytics'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://weblike.pro'),
  title: 'Create a eye catching Website With AI ',
  description: 'Create a Custome Website AI Just By Clicking or Say to AI and AI will make stunning  website ',
  openGraph: {
    title: 'Weblike Pro- Create Custom Website AI AI',
    description: 'Creating Website With AI its become Easy creating Unlimited page and Website with AI NO  pre made template ,Say to AI and AI will create New a Stunning website  ',
    type: 'website',
    url: 'https://weblike.pro',
    images: [{
      url: 'https://weblike.pro/twitter-card.png',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@weblikepro',
    creator: '@nain',
    title: 'Weblikepro - Create Custom  Website With AI',
    description: 'Create website By Jsut clicking With AI  ',
    images: ['https://weblike.ai/twitter-card.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-16x16.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <html lang="en">
      <body className={inter.className}>

          <ThemeProvider attribute="class" defaultTheme="White" enableSystem>
            {children}
              <GoogleAnalytics />
            <Toaster position="top-center" />
          </ThemeProvider>  
   
      </body>
    </html>
  )
}
