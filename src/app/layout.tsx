import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/components/cadenza/LanguageProvider";
import { ReactNode } from "react";
import AppHeader from "@/components/cadenza/AppHeader";
import AppFooter from "@/components/cadenza/AppFooter";

export const metadata: Metadata = {
  title: "Cadenza",
  description:
    "A free-to-use suite of interactive tools designed for musicians by musicians to explore, identify, and create music.",
  keywords: [
    "music theory",
    "chords",
    "scales",
    "circle of fifths",
    "guitar",
    "piano",
    "musician",
    "harmony",
    "music education",
    "interactive tools",
  ],
  generator: "Next.js",
  referrer: "origin",
  manifest: "/manifest.json",
  publisher: "Vercel",
  authors: [
    {
      name: "Listerineh",
      url: "https://listerineh.dev",
    },
  ],
  openGraph: {
    title: "Cadenza",
    description:
      "A free-to-use suite of interactive tools designed for musicians by musicians to explore, identify, and create music.",
    url: "https://cadenza-app.vercel.app",
    siteName: "Cadenza",
    images: [
      {
        url: "/images/website_screenshot.webp",
        width: 1200,
        height: 630,
        alt: "Cadenza Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Cadenza",
    description:
      "A free-to-use suite of interactive tools designed for musicians by musicians to explore, identify, and create music.",
    images: [
      {
        url: "/images/website_screenshot.webp",
        width: 1200,
        height: 630,
        alt: "Cadenza Preview",
      },
    ],
    card: "summary_large_image",
  },
};

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Roboto+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <AppLayout>{children}</AppLayout>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
