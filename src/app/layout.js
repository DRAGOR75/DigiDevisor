// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Digi Devisor',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        {/* The "text-white" class has been removed from here */}
        <body className={`${inter.className} bg-[#0a0d13]`}>
        <NavBar />
        <main>{children}</main>
        </body>
        </html>
    );
}