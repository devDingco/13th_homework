import React, { ReactNode } from 'react';
import Image from 'next/image';
import Logo from '@/../public/images/logo.svg';
import UserImage from '@/../public/images/user.svg';
import Link from 'next/link';
import { PlusSquareOutlined } from '@ant-design/icons';

interface HeaderType {
  children: ReactNode;
}

export default function HeaderLayout({ children }: HeaderType) {
  return (
    <header className="flex gap-4 items-center w-full max-w-[1280px] mx-auto h-20">
      <Link href="/boards">
        <Image src={Logo} width={0} height={0} alt="" />
      </Link>
      {children}
      <Link href="/boards/new">
        <PlusSquareOutlined style={{ fontSize: '30px' }} />
      </Link>
      <Image src={UserImage} width={0} height={0} alt="" />
    </header>
  );
}
