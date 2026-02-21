import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Drug Analysis Platform',
  description: 'Find effective medications based on real patient reviews',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="nav-logo">
              💊 Drug Analysis
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">Search Drugs</Link>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
