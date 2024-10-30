'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WithLoginPage = (Component: any) => (props: any) => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null) {
      alert('로그인 후 이용 가능합니다!!!');
      router.push('/user/login');
    }
  }, []);

  return <Component {...props} />;
};

export default WithLoginPage;
