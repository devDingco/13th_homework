import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import '@/app/global.css';
import ApolloSetting from './_commons/settings/apollo-setting';
import ModalTemplete from './_component/modal/ModalTemplete';
import localFont from 'next/font/local';
import ApolloHeaderSetting from '@/app/_commons/settings/apollo-header-setting';

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
        <ApolloHeaderSetting>{children}</ApolloHeaderSetting>
      </body>
    </html>
  );
}
