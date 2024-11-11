'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useNewAccessTokenLoaded } from '../stores/new-access-token-load-store';
import { useAccessTokenStore } from '../stores/access-token-store';

export const withLoginCheck = (Component: any) => (props: any) => {
	const router = useRouter();
	const { newAccessTokenLoaded } = useNewAccessTokenLoaded();
	const { accessToken } = useAccessTokenStore();

	useEffect(() => {
		// if (localStorage.getItem('accessToken') === null) {
		// 	alert('로그인 후 이용 가능합니다');
		// 	router.push('/login');
		// }

		// 새로운 accessToken이 발급되지 않았으면 검사 안함
		if (!newAccessTokenLoaded) return;

		// 이미 accessToken이 존재하면 검사 안함
		if (accessToken) return;

		// accessToken이 없으면 로그인 유도
		alert('로그인 후 이용 가능합니다.');
		router.push('/login');
	}, [newAccessTokenLoaded]);

	return <Component {...props} />;
};
