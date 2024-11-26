import './globals.css';

import Header from '@/components/header';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className='flex flex-col px-5'>
            <Header/>
            <body>{children}</body>
        </html>
    );
}
