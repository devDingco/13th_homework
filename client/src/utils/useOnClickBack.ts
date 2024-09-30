/** @format */

import { useRouter } from 'next/navigation';

export function useOnClickBack() {
	const router = useRouter();
	const onClickBack = () => {
		router.back();
	};
	return onClickBack;
}
