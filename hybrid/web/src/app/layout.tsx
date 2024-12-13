import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Layout from '@/commons/layout/header';

export const metadata: Metadata = {
    title: '혼자 여행 왜 감?',
    description: '난 여행 별로 안좋아함',
};

const suitVariable = localFont({
    src: '../../public/fonts/SUIT-Variable.woff2',
    variable: '--font-suit-variable',
    weight: '100 900',
});
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
                />
            </head>
            <body className={`${suitVariable.variable} antialiased`}>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
