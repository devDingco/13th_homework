import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "@/_common/layout";
import ApolloSetting from "@/_common/settings/apollo-setting";

const dohyeon = localFont({
  src: "../../public/fonts/BMDOHYEON_ttf.ttf",
  variable: "--font-dohyeon",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tripper",
  description: "인생을 여행하는 Tripper들을 위한 커뮤니티",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dohyeon.variable} w-screen`}>
        <ApolloSetting>
          <Layout>{children}</Layout>
        </ApolloSetting>
      </body>
    </html>
  );
}
