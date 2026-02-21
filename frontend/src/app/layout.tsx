import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
        <nav className="navbar">
          <div className="site-nav-container">
            <Link href="/" className="site-nav-brand">
              MediScope
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
      </body>
    </html>
  );
}
