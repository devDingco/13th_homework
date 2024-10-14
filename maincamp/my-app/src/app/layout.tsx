import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloSetting from "@/commons/settings/apollo-setting";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "메인캠프",
  description: "메인캠프 과제",
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
        <ApolloSetting>{children}</ApolloSetting>
      </body>
    </html>
  );
}
