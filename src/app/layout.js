// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Digi Devisor',
    description: 'Digital Solutions Partner',
    // Next.js automatically adds the viewport tag for mobile, so you don't need to add it manually here.
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-[#0a0d13] overflow-x-hidden antialiased`}>
        {/* 1. overflow-x-hidden: Prevents side-scrolling if animations go off-screen.
                   2. antialiased: Makes fonts look sharper on screens.
                */}

        <NavBar />

        <main className="relative flex flex-col min-h-screen">
            {children}
        </main>
        </body>
        </html>
    );
}