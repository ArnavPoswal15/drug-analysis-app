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
      { url: "/favicon.ico?v=202502220250", sizes: "any" },
      { url: "/favicon-32.png?v=202502220250", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png?v=202502220250", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=202502220250", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest?v=202502220250",
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml?v=202502220250",
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
                <Image src="/logo.svg" alt="MediScope" width={56} height={56} className="h-15 w-auto" />
              </Link>
              {/* <div className="site-nav-links">
                <Link href="/" className="site-nav-link">Home</Link>
                <Link href="/dashboard" className="site-nav-link">Dashboard</Link>
              </div> */}
              <Link href="/dashboard" className="site-nav-cta">Open Dashboard</Link>
            </div>
          </nav>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
