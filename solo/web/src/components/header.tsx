/** @format */

'use client';

import { usePathname, useRouter } from 'next/navigation';

import Icon from './Icon';
import { headerMap } from '@/types/header.type';

export default function Header() {
	const path = usePathname();
	const router = useRouter();
	const item = headerMap[path] || { name: '' };

	return (
		<div className="flex py-5 gap-2 items-center z-10 absolute top-4">
			<button onClick={() => router.push('/detail')}>
				<Icon name="left_arrow" />
			</button>
			<div className="prose-sb_18_24">{item.name}</div>
		</div>
	);
}
