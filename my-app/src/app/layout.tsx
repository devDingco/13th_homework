import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloSetting from "@/commons/settings/appollo-settings";

const pretendardFont = localFont({
  src: "./fonts/Pretendard-Black.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
});
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "메인캠프",
  description: "메인캠프과제",
};

export default function RootLayout(props) {
  return (
    <html lang="ko">
      <body className={pretendardFont.variable}>
        <ApolloSetting>{props.children}</ApolloSetting>
      </body>
    </html>
  );
}
