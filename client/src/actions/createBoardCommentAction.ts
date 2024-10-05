/** @format */
'use server';

export default async function createBoardCommentAction(prevState, formData) {
	const author: string | null = formData.get('Author');
	const password: string | null = formData.get('Password');
	const comment: string | null = formData.get('Comment');
	const star: string | null = formData.get('Star');

	if (!author || !password || !comment || !star) return { error: '댓글을 입력해주세요' };
}
