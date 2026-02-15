import React from "react"
import { metadata as siteMetadata, viewport as siteViewport } from '@/config/site-metadata'
import GoogleAnalytics from '@/components/google-analytics'
import JsonLd from '@/components/json-ld'

import './globals.css'

export const metadata = siteMetadata
export const viewport = siteViewport

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
        <GoogleAnalytics />
        <JsonLd />
      </head>
      <body className="bricolage-grotesque antialiased bg-background text-foreground scroll-smooth">{children}</body>
    </html>
  )
}
