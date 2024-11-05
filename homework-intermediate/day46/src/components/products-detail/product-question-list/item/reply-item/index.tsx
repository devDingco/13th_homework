'use client';

import { gql, useMutation } from '@apollo/client';
import Image from 'next/image';
import RETURN from '@/assets/return.png';

const CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
	mutation createTravelproductQuestionAnswer(
		$createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!
		$travelproductQuestionId: ID!
	) {
		createTravelproductQuestionAnswer(
			createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput
			travelproductQuestionId: $travelproductQuestionId
		) {
			_id
			contents
			travelproductQuestion
			user {
				_id
				name
				email
			}
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

const UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
	mutation updateTravelproductQuestionAnswer(
		$updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!
		$travelproductQuestionAnswerId: ID!
	) {
		updateTravelproductQuestionAnswer(
			updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput
			travelproductQuestionAnswerId: $travelproductQuestionAnswerId
		) {
			_id
			contents
			travelproductQuestion
			user {
				_id
				name
				email
			}
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

const DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
	mutation deleteTravelproductQuestionAnswer(
		$travelproductQuestionAnswerId: ID!
	) {
		deleteTravelproductQuestionAnswer(
			travelproductQuestionAnswerId: $travelproductQuestionAnswerId
		)
	}
`;

// TODO: travelProduct에 대한 id를 받아서, 해당 id의 Answer목록 보여주기
export function ReplyItemList(props) {
	return (
		<div className="flex">
			<div className="pl-3">
				<Image src={RETURN} alt="문의내용답변" />
			</div>
			<div>트리플스타, 알고리즘스타, 무슨내용을스타, 스타, 와타시와 스타</div>
		</div>
	);
}

export function ReplyItem(props) {
	const { toggleIsReplying } = props;

	// Create
	const [createTravelproductQuestionAnswer] = useMutation(
		CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
	);
	// Update
	const [updateTravelproductQuestionAnswer] = useMutation(
		UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
	);
	// Delete
	const [deleteTravelproductQuestionAnswer] = useMutation(
		DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER,
	);

	return (
		<div className="flex flex-col items-end gap-4">
			<textarea
				className="h-36 w-full resize-none rounded-lg border px-4 py-3"
				placeholder="답변할 내용을 입력해 주세요."
			></textarea>
			<div className="flex gap-2">
				<button
					type="button"
					className="h-12 rounded-lg border border-black px-4 py-3"
					onClick={toggleIsReplying}
				>
					취소
				</button>
				<button className="h-12 rounded-lg bg-black px-4 py-3 text-white">
					답변 하기
				</button>
			</div>
		</div>
	);
}
