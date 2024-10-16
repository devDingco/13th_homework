// 'use client';
import './styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AppProvider } from '@/contexts/AppContext';

import ApolloSetting from '@/commons/settings/apollo-setting';

const pretendard = localFont({
    src: '../fonts/woff2/PretendardVariable.woff2',
    display: 'swap',
    weight: '100 900',
    variable: '--font-pretendard',
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
    return (
        <AppProvider>
            <html lang="en">
                <body className={`${pretendard.variable} vsc-initialized`}>
                    <ApolloSetting>{children}</ApolloSetting>
                </body>
            </html>
        </AppProvider>
    );
}
