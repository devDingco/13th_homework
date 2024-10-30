import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Layout from "@/commons/layout";
// import ApolloHeaderSetting from "@/commons/settings/22-01-apollo-header-setting";

// 기본 폰트 설정 2개
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

// meta-data
export const metadata: Metadata = {
  title: "메인캠프 과제",
  description: "메인캠프 과제 프로젝트 입니다.",
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
        {children}
      </body>
    </html>
  );
}

// 2. 구조분해할당 리팩토링 후 => let {children} = props
// children 사용
// interface IProps {
//   children: React.ReactNode;
// }
// export default function RootLayout({ children }: IProps) {
//   return (
//     <html lang="en">
//       <body className={`${철수의폰트.variable} ${글로벌폰트.variable}`}>
//         <div>======== 여기 위는 레이아웃입니다. ========</div>
//         {/* <ApolloUploadSetting> */}
//         <ApolloHeaderSetting>
//           <Layout>{children}</Layout>
//         </ApolloHeaderSetting>
//         {/* </ApolloUploadSetting> */}
//         <div>======== 여기 아래는 레이아웃입니다. ========</div>
//       </body>
//     </html>
//   );
// }
