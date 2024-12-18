import './globals.css';
import React from 'react';
import { Playfair_Display } from 'next/font/google';
import SmoothScroll from '../components/SmoothScroll';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Cifer Restaurant',
  description: 'A modern dining experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className} bg-[#FFF5F5] text-gray-900`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}