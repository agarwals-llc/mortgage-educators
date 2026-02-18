import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Mortgage Educators — NMLS-Approved Mortgage Licensing Education',
    template: '%s | Mortgage Educators',
  },
  description: 'Get your mortgage license online. NMLS-approved pre-licensing, continuing education, and exam prep for mortgage loan originators across all 50 states.',
  keywords: ['mortgage license', 'NMLS', 'MLO', 'pre-licensing', 'continuing education', 'mortgage education'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Mortgage Educators',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
