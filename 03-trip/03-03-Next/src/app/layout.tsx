import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import * as React from "react";
import ApolloSetting from "@/commons/settings/apollo-setting";

const Paperlogy = localFont({
    src: "./fonts/Paperlogy-4Regular.woff2",
    variable: "--font-paperlogy-regular",
    weight: "400",
});

const Pretendard = localFont({
    src: "./fonts/PretendardVariable.woff2",
    variable: "--font-pretendard-var",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "[이하성] Maincamp Next migration",
    description: "project for code.camp 13th front-end course",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${Paperlogy.variable} ${Pretendard.variable}`}>
                <ApolloSetting>{children}</ApolloSetting>
            </body>
        </html>
    );
}
