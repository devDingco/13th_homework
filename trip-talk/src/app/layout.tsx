import React from 'react';
import type { Metadata } from 'next';
import '@/app/global.css';
import ApolloSetting from './_commons/settings/apollo-setting';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloSetting>
          <main id="root">{children}</main>
        </ApolloSetting>
      </body>
    </html>
  );
}
