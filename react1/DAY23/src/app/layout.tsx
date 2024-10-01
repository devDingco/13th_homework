import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import ApolloSetting from "@/commons/settings/apollo-setting";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "50 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Welcome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.variable} antialiased`}
      >
        <ApolloSetting>
        {children}
        </ApolloSetting>
       
      </body>
    </html>
  );
}
