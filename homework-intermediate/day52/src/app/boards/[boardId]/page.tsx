'use client';

import CommentList from '@/components/boards-detail/comment-list';
import CommentWrite from '@/components/boards-detail/comment-write';
import BaordDeatil from '@/components/boards-detail/detail';

export default function BoardsDetailPage() {
	return (
		<>
			<BaordDeatil />
			<CommentWrite />
			<CommentList />
		</>
	);
}
