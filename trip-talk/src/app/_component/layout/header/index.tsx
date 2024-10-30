'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '@/../public/images/logo.svg';
import UserImage from '@/../public/images/user.svg';
import Link from 'next/link';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { FETCH_USER_LOGGED_IN } from '@/app/_api/board/Query';
import { useRouter } from 'next/navigation';

interface HeaderType {
  children: ReactNode;
}

export default function HeaderLayout({ children }: HeaderType) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    localStorage.getItem('accessToken') === null
      ? setIsLoggedIn(false)
      : setIsLoggedIn(true);
  }, []);

  return (
    <header className="flex gap-4 items-center w-full max-w-[1280px] mx-auto h-20">
      <Link href="/boards">
        <Image src={Logo} width={0} height={0} alt="" />
      </Link>
      {children}
      <Link href="/boards/new">
        <PlusSquareOutlined style={{ fontSize: '30px' }} />
      </Link>
      {isLoggedIn ? (
        <button className="flex flex-col justify-center items-center">
          <p>{data?.fetchUserLoggedIn.name}</p>
          <Image src={UserImage} width={0} height={0} alt="" />
        </button>
      ) : (
        <Link href={'/user/login'}>로그인</Link>
      )}
    </header>
  );
}
