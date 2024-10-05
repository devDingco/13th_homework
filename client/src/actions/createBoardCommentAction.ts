/** @format */
'use server';

import postComment from '@/apis/comments/postComment';

export default async function createBoardCommentAction(prevState, formData) {
	const author: string | null = formData.get('Author');
	const password: string | null = formData.get('Password');
	const content: string | null = formData.get('Comment');
	const rating: number | null = +formData.get('Rating');

	if (!author || !password || !content || !rating) return { error: '댓글을 정확히 입력해주세요' };

	const result = await postComment({ author, password, content, rating }, prevState.boardId);
}
