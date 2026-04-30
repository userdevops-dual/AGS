import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { SplashScreen } from "@/components/splash-screen";
import { PageLoader } from "@/components/page-loader";
import { FloatingButtons } from "@/components/floating-buttons";
import Link from "next/link";
import Image from "next/image";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

export const viewport: Viewport = {
  themeColor: '#1B1464',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Abexsun Grammar School | Always Be Excellent",
    template: "%s | Abexsun Grammar School",
  },
  description: "Abexsun Grammar School — Always Be Excellent By Ten Sun Education System. Located Behind Shalimar Hospital, Mughalpura, Lahore. A project of AES providing quality education from Nursery to Class 12.",
  keywords: ["Abexsun Grammar School", "AGS", "school", "education", "admission", "grammar school", "Ten Sun Education System", "AES", "Mughalpura", "Lahore"],
  icons: {
    icon: [
      { url: '/logo.png' }
    ]
  },
  openGraph: {
    title: "Abexsun Grammar School | Always Be Excellent",
    description: "Abexsun Grammar School — Quality education from Nursery to Class 12. A project of AES.",
    type: "website",
    siteName: "Abexsun Grammar School",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { MainLayoutWrapper } from "@/components/layout/main-layout-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ fontSize: '14px' }}>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#1B1464" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-navbutton-color" content="#1B1464" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-white text-[15px]`}>
        <SplashScreen />
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        <MainLayoutWrapper>
          {children}
        </MainLayoutWrapper>
        <FloatingButtons />
      </body>
    </html>
  );
}
