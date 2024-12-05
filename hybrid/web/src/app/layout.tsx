import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Layout from '@/commons/layout/header';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: '혼자 여행 왜 감?',
    description: '난 여행 별로 안좋아함',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
