import './globals.css';

import Header from '@/components/header';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" >
            <body className='flex flex-col px-5'>
                <Header/>
                {children}
            </body>
        </html>
    );
}
