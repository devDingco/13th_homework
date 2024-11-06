'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
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

const FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER = gql`
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

export function ReplyItemList(props) {
	const { replyItem } = props;

	const { data, refetch } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER, {
		variables: { page: 1, travelproductQuestionId: replyItem._id },
	});

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

	const [createTravelproductQuestionAnswer] = useMutation(
		CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
	);
	const [updateTravelproductQuestionAnswer] = useMutation(
		UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
	);
	const [deleteTravelproductQuestionAnswer] = useMutation(
		DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER,
	);

	// Create
	const onClickSubmit = () => {};
	// Update
	const onClickUpdate = () => {};
	// Delete
	const onClickDelet = async () => {
		try {
			await deleteTravelproductQuestionAnswer({
				variables: { travelproductQuestionAnswerId },
			});
		} catch (error) {}
	};

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
