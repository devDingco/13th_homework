/** @format */
'use client';

import { useRouter } from 'next/navigation';

export default function useOnClickBack() {
	const router = useRouter();
	const onClickBack = () => {
		router.back();
	};
	return onClickBack;
}
