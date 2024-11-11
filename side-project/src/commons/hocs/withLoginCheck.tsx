'use client';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withLoginCheck =
  (WrappedComponent: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const { isAuthenticated, refreshAccessToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const checkLogin = async () => {
        if (!isAuthenticated) {
          const token = await refreshAccessToken();
          if (!token) {
            alert('로그인이 필요합니다.');
            router.push('/login');
          }
        }
      };
      checkLogin();
    }, [isAuthenticated, refreshAccessToken, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

export default withLoginCheck;
