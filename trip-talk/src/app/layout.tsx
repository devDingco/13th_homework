import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import '@/app/global.css';
import ApolloSetting from './_commons/settings/apollo-setting';
import ModalTemplete from './_component/modal/ModalTemplete';
import localFont from 'next/font/local';
import DefaultLayout from './_component/layout';
import BoardListBanner from './_component/layout/banner/BoardListBanner';
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
};
const myFont = localFont({ src: '../../public/Pretendard-Regular.woff2' });
export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  // const pathname = usePathname();

  return (
    <html lang="en" className={myFont.className}>
      <body>
        <ModalTemplete />
        <DefaultLayout />
        <ApolloSetting>
          <div className="contents w-screen">
            <BoardListBanner />
          </div>
          <main className={'w-full max-w-[1280px] mx-auto'} id="root">
            {children}
          </main>
        </ApolloSetting>
      </body>
    </html>
  );
}
