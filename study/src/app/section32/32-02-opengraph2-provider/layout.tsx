"use client";

// import Head from "next/head";

export default function OpenGraphProviderLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Head> */}
      <meta property="og:title" content="제목" />
      <meta property="og:description" content="설명" />
      <meta property="og:image" content="이미지주소" />
      {/* </Head> */}
      {children}
    </>
  );
}
