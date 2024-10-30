'use client';

import { useParams, usePathname } from 'next/navigation';
import BoardBanner from './banner';
import Navigation from './navigation';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
	const pathname = usePathname();
	const params = useParams();
	const HIDDEN_HEADERS = [
		'/boards/new',
		`/boards/${params.boardId}/edit`,
		'/openapis',
		'/myapis',
		'/mypage',
		'/products',
	];
	const isHiddenHeader = HIDDEN_HEADERS.includes(pathname);

	return (
		<div className="flex flex-col items-center gap-4 border-red-200">
			<Navigation />
			{!isHiddenHeader && <BoardBanner />}
			{children}
		</div>
	);
}
