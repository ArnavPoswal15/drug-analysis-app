import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drug Analysis Platform",
  description: "Find effective medications based on real patient reviews",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <nav className="navbar">
            <div className="site-nav-container">
              <Link href="/" className="site-nav-brand">
                <Image src="/logo.svg" alt="MediScope" width={56} height={56} className="h-14 w-auto" />
              </Link>
              <div className="site-nav-links">
                <Link href="/" className="site-nav-link">Home</Link>
                <Link href="/dashboard" className="site-nav-link">Dashboard</Link>
                <Link href="/#filters" className="site-nav-link">Filters</Link>
              </div>
              <Link href="/dashboard" className="site-nav-cta">Open Dashboard</Link>
            </div>
          </nav>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
