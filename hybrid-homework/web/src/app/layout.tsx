import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LayoutComponent from "@/commons/layout";
import DeviceSetting from "@/commons/settings/device-setting";

const suit = localFont({
  src: "../../public/fonts/SUIT-Variable.woff2",
  variable: "--font-suit",
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
      <body className={suit.variable}>
        <LayoutComponent>
          <DeviceSetting>{children}</DeviceSetting>
        </LayoutComponent>
      </body>
    </html>
  );
}
