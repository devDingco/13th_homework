// 'use client';
import './styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AppProvider } from '@/contexts/AppContext';

import ApolloSetting from '@/commons/settings/apollo-setting';
import Carousel from './layout/banner/carousel';
import Footer from './layout/footer';
import Header from './layout/header/header';
import { usePathname } from 'next/navigation';

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
    const pathname = usePathname();
    const isAppPage = pathname === '/';
    const isBoardsList =
        pathname === '/src/components/boardsList/list/index.tsx';
    return (
        <AppProvider>
            <html lang="en">
                <body className={`${pretendard.variable} vsc-initialized`}>
                    <Header />
                    {(isAppPage || isBoardsList) && <Carousel />}
                    <ApolloSetting>{children}</ApolloSetting>
                    <Footer />
                </body>
            </html>
        </AppProvider>
    );
}
