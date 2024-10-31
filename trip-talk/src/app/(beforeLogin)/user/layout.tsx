import Image from 'next/image';
import React, { ReactNode } from 'react';
import LoginImage from '@/../public/images/image1.png';

export default function UserAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="w-full min-w-[300px] max-w-[400px]">{children}</div>
      <div className="relative w-[calc(100vw-300px)] h-screen">
        <Image
          src={LoginImage}
          alt="로그인 화면 이미지"
          fill
          objectFit="cover"
        />
      </div>
    </div>
  );
}
