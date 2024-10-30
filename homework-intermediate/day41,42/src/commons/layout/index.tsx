'use client';

import { useParams, usePathname } from 'next/navigation';
import BoardBanner from './banner';
import Navigation from './navigation';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
	const pathname = usePathname();
	const params = useParams();
	const HIDDEN_BOARD_BANNER = [
		'/boards/new',
		`/boards/${params.boardId}/edit`,
		'/openapis',
		'/myapis',
		'/mypage',
		'/products',
		'/login',
		'/signup',
	];
	const HIDDEN_NAVIGATION = ['/login', '/signup'];
	const isHiddenBoardBanner = HIDDEN_BOARD_BANNER.includes(pathname);
	const isHiddenNavigation = HIDDEN_NAVIGATION.includes(pathname);

	return (
		<div className="flex flex-col items-center gap-4 border-red-200">
			{!isHiddenNavigation && <Navigation />}
			{!isHiddenBoardBanner && <BoardBanner />}
			{children}
		</div>
	);
}
