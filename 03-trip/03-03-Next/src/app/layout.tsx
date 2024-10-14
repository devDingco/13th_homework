import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import * as React from "react";
import ApolloSetting from "@/commons/settings/apollo-setting";
import PageLayout from "@/commons/layout";

const Paperlogy = localFont({
    src: "./fonts/Paperlogy-3Light.woff2",
    variable: "--font-paperlogy-light",
    weight: "300",
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
                <ApolloSetting>
                    <PageLayout>{children}</PageLayout>
                </ApolloSetting>
            </body>
        </html>
    );
}
