/** @format */
'use client';

import { useEffect } from 'react';

export default function useIsScrollLock(isLocked: boolean) {
	useEffect(() => {
		document.body.classList.toggle('overflow-hidden', isLocked);
		if (isLocked) window.scrollTo(0, 0);

		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, [isLocked]);
}
