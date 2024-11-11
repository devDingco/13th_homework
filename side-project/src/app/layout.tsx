import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import LayoutComponent from '@/commons/layout';
import ApolloSetting from '@/commons/setting/apollo-setting';
import { AuthProvider } from '@/context/AuthContext';

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
  title: '고가네',
  description: '고가네 리모델링 중',
};
interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <AuthProvider>
      <html lang="ko">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ApolloSetting>
            <LayoutComponent>{children}</LayoutComponent>
          </ApolloSetting>
        </body>
      </html>
    </AuthProvider>
  );
}
