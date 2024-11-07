'use client';

import { useEffect } from 'react';
import { useAccessTokenStore } from '../stores/accessToken';
import { useLoadStore } from '../stores/loadStore';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';

export const withLoginCheck =
  (Component: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const router = useRouter();
    const { isLoaded } = useLoadStore();
    const { accessToken } = useAccessTokenStore();

    useEffect(() => {
      if (!isLoaded) return;
      if (accessToken) return;

      Modal.warning({
        title: '로그인이 필요합니다.',
        content: '로그인 페이지로 이동합니다.',
        onOk() {
          router.push('/login');
        },
      });
    }, [isLoaded, accessToken, router]);
    return <Component {...props} />;
  };
