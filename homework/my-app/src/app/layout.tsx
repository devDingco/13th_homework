import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import ApolloUploadSetting from "@/commons/settings/apollo-setting";
import ApolloHeaderAndErrorSettingRefresh from "@/commons/settings/apollo-setting";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ApolloHeaderAndErrorSettingRefresh>
          <Navbar />
          {children}
        </ApolloHeaderAndErrorSettingRefresh>
      </body>
    </html>
  );
}
