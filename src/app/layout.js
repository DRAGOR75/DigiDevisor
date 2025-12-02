// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Digi Devisor',
    description: 'Digital Solutions Partner',
};

// --- FIX: Explicitly define the viewport ---
export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevents pinch-to-zoom for a native app feel
    themeColor: '#0a0d13', // Matches your background
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        {/* Added suppressHydrationWarning in case extensions mess with the DOM */}
        <body className={`${inter.className} bg-[#0a0d13] overflow-x-hidden antialiased`} suppressHydrationWarning>

        <NavBar />

        <main className="relative flex flex-col min-h-screen">
            {children}
        </main>
        </body>
        </html>
    );
}