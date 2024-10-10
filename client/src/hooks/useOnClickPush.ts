/** @format */
'use client';

import { useRouter } from 'next/navigation';

export default function useOnClickPush() {
	const router = useRouter();

	const onClickPush = (url: string, event?: React.MouseEvent<HTMLImageElement>) => {
		event?.preventDefault();

		router.push(url);
	};

	return onClickPush;
}
