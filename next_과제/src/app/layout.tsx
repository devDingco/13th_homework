import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
// import ReduxProviders from "@/components/reduxProvider";
import { Noto_Sans_KR, Roboto } from "next/font/google";

import ApolloSetting from "../commons/settings/apollo-setting";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

/* eslint-disable */
const notoSansKr = Noto_Sans_KR({
  preload: false,
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--noto-sans-kr",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={`antialiased`}>
        <Header />
        {/* <ReduxProviders> */}
        <ApolloSetting>{children}</ApolloSetting>
        {/* </ReduxProviders> */}
      </body>
    </html>
  );
}
