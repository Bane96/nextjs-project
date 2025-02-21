import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/global.css';
import Navbar from '@/components/Navbar';
import React from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Amper | electric vehicles',
    description: 'Easily sell your electric car online.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
            <Navbar/>
                <main className="container mx-auto p-4">
                    {children}
                </main>
            </body>
        </html>
    )
}
