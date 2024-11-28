'use client';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAccessTokenStore } from '../stores/accessToken';

const withLoginCheck =
  (WrappedComponent: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const { refreshAccessToken } = useAuth();
    const { accessToken } = useAccessTokenStore();
    const router = useRouter();

    useEffect(() => {
      const checkLogin = async () => {
        if (!accessToken) {
          const token = await refreshAccessToken();
          if (!token) {
            alert('로그인이 필요합니다.');
            router.push('/login');
          }
        }
      };
      if (!accessToken) checkLogin();
    }, [accessToken, refreshAccessToken, router]);

    return accessToken ? <WrappedComponent {...props} /> : null;
  };

export default withLoginCheck;
