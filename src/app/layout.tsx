import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme-provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://weblike.ai'),
  title: 'Weblike AI - AI-Powered Landing Page Builder | Create AI web page & landing Pages Instantly',
  description: 'Create professional and ultra unique landing pages instantly with Weblike AI\'s AI-powered web builder. Transform your ideas into high-converting pages without coding or design skills.',
  openGraph: {
    title: 'Weblike AI - Create Custom Landing Pages with AI',
    description: 'Whether you are a startup or a pro, create sleek, modern landing page with AI. No experience? No problem! Get started in minutes!',
    type: 'website',
    url: 'https://weblike.ai',
    images: [{
      url: 'https://weblike.ai/twitter-card.png',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@weblikeai',
    creator: '@weblikeai',
    title: 'Weblike AI - Create Custom Landing Pages with AI',
    description: 'Whether you are a startup or a pro, create sleek, modern landing page with AI. No experience? No problem! Get started in minutes!',
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

            <Toaster position="top-center" />
          </ThemeProvider>  
   
      </body>
    </html>
  )
}
