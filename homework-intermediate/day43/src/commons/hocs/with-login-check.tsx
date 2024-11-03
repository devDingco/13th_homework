'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const withLoginCheck = (Component: any) => (props: any) => {
	const router = useRouter();

	useEffect(() => {
		if (localStorage.getItem('accessToken') === null) {
			alert('로그인 후 이용 가능합니다');
			router.push('/login');
		}
	}, []);

	return <Component {...props} />;
};
