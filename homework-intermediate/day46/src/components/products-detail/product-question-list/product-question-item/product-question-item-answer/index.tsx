'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER } from '../product-question-item-answer-list';

export const CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
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

export const UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
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

interface IcreateTravelproductQuestionAnswerSchema {
	contents: string;
}

const createTravelproductQuestionAnswerSchema: z.ZodType<IcreateTravelproductQuestionAnswerSchema> =
	z.object({
		contents: z.string().min(1, { message: '답변할 내용을 입력해 주세요.' }),
	});

export function ProductQuestionAnswer(props) {
	const {
		productQuestion,
		toggleIsReplying,
		isEditing,
		initialContents,
		answerId,
	} = props;

	const [createTravelproductQuestionAnswer] = useMutation(
		CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
	);
	const [updateTravelproductQuestionAnswer] = useMutation(
		UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
	);

	const { register, formState, handleSubmit, setValue } =
		useForm<IcreateTravelproductQuestionAnswerSchema>({
			mode: 'onChange',
			resolver: zodResolver(createTravelproductQuestionAnswerSchema),
		});

	useEffect(() => {
		if (isEditing && initialContents) setValue('contents', initialContents);
	}, [isEditing, initialContents, setValue]);

	// Create
	const onClickSubmit = async (
		data: IcreateTravelproductQuestionAnswerSchema,
	) => {
		try {
			const result = await createTravelproductQuestionAnswer({
				variables: {
					createTravelproductQuestionAnswerInput: { ...data },
					travelproductQuestionId: productQuestion._id,
				},
				refetchQueries: [FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER],
			});
			toggleIsReplying(); // 입력창 닫기
		} catch (error) {
			if (error instanceof Error)
				console.log(
					'🚀 ~ ProductQuestionAnswerListItem ~ error.message:',
					error.message,
				);
		}
	};

	// Update
	const onClickUpdate = async (
		data: IcreateTravelproductQuestionAnswerSchema,
	) => {
		try {
			await updateTravelproductQuestionAnswer({
				variables: {
					updateTravelproductQuestionAnswerInput: { ...data },
					travelproductQuestionAnswerId: answerId,
				},
			});
			toggleIsReplying();
		} catch (error) {
			if (error instanceof Error)
				console.log('🚀 ~ onClickUpdate ~ error:', error.message);
		}
	};

	return (
		<form
			className="flex flex-col items-end gap-4"
			onSubmit={handleSubmit(isEditing ? onClickUpdate : onClickSubmit)}
		>
			<textarea
				className="h-36 w-full resize-none rounded-lg border px-4 py-3"
				placeholder="답변할 내용을 입력해 주세요."
				{...register('contents')}
			></textarea>
			<div className="text-red-500">{formState.errors.contents?.message}</div>
			<div className="flex gap-2">
				<button
					type="button"
					className="h-12 rounded-lg border border-black px-4 py-3"
					onClick={toggleIsReplying}
				>
					취소
				</button>
				<button
					type="submit"
					className="h-12 rounded-lg bg-black px-4 py-3 text-white"
				>
					답변 하기
				</button>
			</div>
		</form>
	);
}
