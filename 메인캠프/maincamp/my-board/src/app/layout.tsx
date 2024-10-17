import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ApolloSetting from '@/commons/setting/apollo-setting';
import LayoutComponent from '@/commons/layout';

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
  title: '나만의 게시판',
  description: '나만의 게시판을 만들어보아요',
};
interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body
        id="root"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloSetting>
          <LayoutComponent>{children}</LayoutComponent>
        </ApolloSetting>
      </body>
    </html>
  );
}
