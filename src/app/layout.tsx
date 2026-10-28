import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Apex Academy | F1 Engineering & Telemetry Platform',
  description:
    'Interactive Formula 1 aerodynamics, historical telemetry, and pit wall strategy lab.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0A0A0C] text-[#F4F4F6] bg-telemetry-grid">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}