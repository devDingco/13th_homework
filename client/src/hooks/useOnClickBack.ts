/** @format */
'use client';

import { useRouter } from 'next/navigation';

export default function useOnClickBack() {
	const router = useRouter();
	const onClickBack = () => {
		console.log(1);
		router.back();
	};
	return onClickBack;
}
