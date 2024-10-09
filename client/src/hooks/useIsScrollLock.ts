/** @format */
'use client';

import { useEffect } from 'react';

export default function useIsScrollLock(isLocked: boolean) {
	useEffect(() => {
		document.body.classList.toggle('overflow-hidden', isLocked);

		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, [isLocked]);
}
