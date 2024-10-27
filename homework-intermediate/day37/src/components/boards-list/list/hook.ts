import { useMutation, useQuery } from '@apollo/client';
import {
	DeleteBoardDocument,
	FetchBoardsDocument,
} from '@/commons/graphql/graphql';
import { useRouter } from 'next/navigation';
import { useState, MouseEvent } from 'react';
import { Modal } from 'antd';
import { BoardListProps } from '.';

export default function useBoardList({ activePage }: BoardListProps) {
	const [hoveredId, setHoveredId] = useState('');
	const [deleteBoard] = useMutation(DeleteBoardDocument);

	const router = useRouter();

	const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		try {
			const response = await deleteBoard({
				variables: { boardId: hoveredId },
				refetchQueries: [
					{
						query: FetchBoardsDocument,
						variables: { page: +(activePage || 1) },
					},
				],
			});
			Modal.success({
				content: `게시글 ${response.data?.deleteBoard} 삭제가 완료되었습니다.`,
			});
			// refetch({ page: +activePage });
		} catch (err) {
			Modal.error({
				content: `게시글 삭제에 실패했습니다.`,
			});
			console.error('삭제실패');
		}
	};

	const onClickDetail = async (
		event: MouseEvent<HTMLButtonElement>,
		id: String,
	) => {
		event.stopPropagation();
		router.push(`/boards/${id}`);
	};

	return { hoveredId, setHoveredId, onClickDelete, onClickDetail };
}
