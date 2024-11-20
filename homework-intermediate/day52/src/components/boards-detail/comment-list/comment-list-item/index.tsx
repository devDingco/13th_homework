'use client';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Flex, Rate } from 'antd';
import Image from 'next/image';
import useCommentListItem from './hook';
import { BoardComment } from '@/commons/graphql/graphql';
import CommentWrite from '../../comment-write';
import { useMutation } from '@apollo/client';
import { DELETE_BOARD_COMMENT } from '@/commons/apis/mutations/mutation-delete-board-comment';

const IMAGE_SRC = {
	chatImage: {
		src: require('@/assets/chat.png'),
		alt: '댓글입력창아이콘',
	},
	starImage: {
		src: require('@/assets/star.png'),
		alt: '별점아이콘',
	},
	profileImage: {
		src: require('@/assets/profile.png'),
		alt: '기본프로필아이콘',
	},
} as const;

type Props = {
	commentItem: BoardComment;
};

export default function CommentItem({ commentItem }: Props) {
	const { isEdit, onToggleEdit } = useCommentListItem();
	const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);

	const onClickDeleteComment = (boardCommentId: string) => async () => {
		// 비밀번호 입력 받기
		const password = prompt('작성했을 때의 비밀번호를 입력해 주세요.');

		// 댓글 삭제 mutation
		await deleteBoardComment({
			variables: {
				password,
				boardCommentId,
			},
			update(cahce, { data }) {
				cahce.modify({
					fields: {
						fetchBoardComments: (prev, { readField }) => {
							const deleteBoardCommentId = data.deleteBoardComment;
							const currnetBoardComments = prev.filter(
								(boardComment) =>
									readField('_id', boardComment) !== deleteBoardCommentId,
							);

							return [...currnetBoardComments];
						},
					},
				});
			},
		});
	};

	return (
		<>
			{isEdit ? (
				<CommentWrite
					isEdit={isEdit}
					commentItem={commentItem}
					onToggleEdit={onToggleEdit}
				/>
			) : (
				<div key={commentItem._id} className="flex w-full flex-col gap-5">
					<div className="flex gap-3">
						<Image
							src={IMAGE_SRC.profileImage.src}
							alt={IMAGE_SRC.profileImage.alt}
						></Image>
						<div>{commentItem.writer}</div>
						<Flex gap="middle">
							<Rate disabled value={commentItem.rating} />
						</Flex>
					</div>
					<div>{commentItem.contents}</div>
					<div className="flex justify-between">
						<div>
							{new Date(
								isEdit ? commentItem.updatedAt : commentItem.createdAt,
							).toLocaleString('ko-KR', {
								timeZone: 'Asia/Seoul',
							})}
						</div>
						<div className="flex gap-4">
							<button onClick={onToggleEdit}>
								<EditOutlined />
							</button>
							<button onClick={onClickDeleteComment(commentItem._id)}>
								<DeleteOutlined />
							</button>
						</div>
					</div>
					<hr className="my-10" />
				</div>
			)}
		</>
	);
}
