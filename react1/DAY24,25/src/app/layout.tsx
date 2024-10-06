// 'use client';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './styles/globals.css';
import ApolloSetting from '@/commons/settings/apollo-setting';
// import { useEffect, useState } from 'react';

const pretendard = localFont({
    src: './fonts/woff2/PretendardVariable.woff2',
    display: 'swap',
    variable: '--font-pretendard',
    weight: '50 900',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Welcome',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true);
    // }, []);
    return (
        <html lang="en">
            <body className={`${pretendard.variable} vsc-initialized`}>
                <ApolloSetting>{children}</ApolloSetting>
            </body>
        </html>
    );
}
