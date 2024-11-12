'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import RETURN from '@/assets/return.png';
import { useState } from 'react';
import { ProductQuestionAnswer } from '../product-question-item-answer';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TravelproductQuestionAnswer } from '@/commons/graphql/graphql';

export const FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER = gql`
	query fetchTravelproductQuestionAnswers(
		$page: Int
		$travelproductQuestionId: ID!
	) {
		fetchTravelproductQuestionAnswers(
			page: $page
			travelproductQuestionId: $travelproductQuestionId
		) {
			_id
			contents
			user {
				_id
				email
				name
			}
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export const DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
	mutation deleteTravelproductQuestionAnswer(
		$travelproductQuestionAnswerId: ID!
	) {
		deleteTravelproductQuestionAnswer(
			travelproductQuestionAnswerId: $travelproductQuestionAnswerId
		)
	}
`;

export function ProductQuestionAnswerList(props) {
	const { productQuestion } = props;

	const [deleteTravelproductQuestionAnswer] = useMutation(
		DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER,
	);
	const { data, refetch } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER, {
		variables: { travelproductQuestionId: productQuestion._id },
	});

	const [editingId, setEditingId] = useState<string | null>(null);

	const toggleIsEditing = (id: string) => {
		if (editingId === id) {
			setEditingId(null);
		} else {
			setEditingId(id);
		}
	};

	const onClickDelete = async (id: string) => {
		await deleteTravelproductQuestionAnswer({
			variables: { travelproductQuestionAnswerId: id },
		});
		refetch();
	};

	return (
		<div className="flex flex-col gap-4">
			{data?.fetchTravelproductQuestionAnswers.map(
				(value: TravelproductQuestionAnswer) => (
					<div key={value._id} className="w-full">
						<div className="flex items-center">
							<div className="pl-3 pr-3">
								<Image src={RETURN} alt="문의내용답변" />
							</div>
							{/* Contents 영역을 flex-1로 너비 가득 채움 */}
							<div className="flex-1">{value.contents}</div>
							{/* 수정 및 삭제 아이콘들 */}
							<div className="flex gap-4">
								<EditOutlined onClick={() => toggleIsEditing(value._id)} />
								<DeleteOutlined onClick={() => onClickDelete(value._id)} />
							</div>
						</div>

						{/* editingId가 현재 항목의 ID와 같을 때만 수정 컴포넌트 표시 */}
						{editingId === value._id && (
							<div className="mt-4 rounded-lg p-4">
								<ProductQuestionAnswer
									productQuestion={productQuestion}
									toggleIsReplying={() => toggleIsEditing(value._id)} // 취소 버튼으로 편집 상태 해제
									isEditing={true}
									initialContents={value.contents}
									answerId={value._id}
								/>
							</div>
						)}
					</div>
				),
			)}
		</div>
	);
}
