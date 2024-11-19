import PROFILE_IMG from '@/assets/profile.png';
import REPLY from '@/assets/reply.png';
import Image from 'next/image';
import { Divider, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateTravelproductInput } from '@/commons/graphql/graphql';
import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ProductQuestionAnswerList } from './product-question-item-answer-list';
import { ProductQuestionAnswer } from './product-question-item-answer';

interface IProductQuestion extends UpdateTravelproductInput {}

const productQuestionSchema: z.ZodType<IProductQuestion> = z.object({
	contents: z.string().min(1, { message: '수정할 문의 내역을 작성해 주세요.' }),
});

export const UPDATE_TRAVEL_PRODUCT_QUESTION = gql`
	mutation updateTravelproductQuestion(
		$updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!
		$travelproductQuestionId: ID!
	) {
		updateTravelproductQuestion(
			updateTravelproductQuestionInput: $updateTravelproductQuestionInput
			travelproductQuestionId: $travelproductQuestionId
		) {
			_id
			contents
			user {
				_id
				name
				email
			}
			updatedAt
		}
	}
`;

export const DELETE_TRAVEL_PRODUCT_QUESTION = gql`
	mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {
		deleteTravelproductQuestion(
			travelproductQuestionId: $travelproductQuestionId
		)
	}
`;

export const FETCH_USER_LOGGED_IN = gql`
	query fetchUserLoggedIn {
		fetchUserLoggedIn {
			_id
			email
			name
			userPoint {
				_id
				amount
			}
		}
	}
`;

export function ProductQuestionItem(props) {
	const { productQuestion, user, refetch } = props;

	const [isReplying, setIsReplying] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, formState } = useForm<IProductQuestion>({
		mode: 'onChange',
		resolver: zodResolver(productQuestionSchema),
	});

	const { data } = useQuery(FETCH_USER_LOGGED_IN);
	const [updateTravelproductQuestion] = useMutation(
		UPDATE_TRAVEL_PRODUCT_QUESTION,
	);
	const [deleteTravelproductQuestion] = useMutation(
		DELETE_TRAVEL_PRODUCT_QUESTION,
	);

	const toggleIsEditing = () => {
		// 현재 로그인 사용자와 문의를 남긴 사용자가 다르면..
		if (data.fetchUserLoggedIn._id !== user._id) {
			Modal.info({ content: '본인이 작성한 문의 내역만 수정할 수 있습니다!' });
			return;
		}
		setIsEditing((prev) => !prev);
	};

	const toggleIsReplying = () => {
		setIsReplying((prev) => !prev);
	};

	const onSubmit = async (data: IProductQuestion) => {
		const result = await updateTravelproductQuestion({
			variables: {
				updateTravelproductQuestionInput: { ...data },
				travelproductQuestionId: productQuestion._id,
			},
		});
		toggleIsEditing();
	};

	const onClickDelete = () => {
		deleteTravelproductQuestion({
			variables: { travelproductQuestionId: productQuestion._id },
		});
		refetch();
		setIsEditing(false);
	};

	return (
		<div className="flex flex-col gap-4" key={productQuestion._id}>
			<div className="flex justify-between gap-4">
				<div className="flex gap-2">
					<Image src={PROFILE_IMG} alt="사용자프로필이미지" />
					<div>{user.name}</div>
				</div>
				{!isEditing && (
					<div className="flex gap-4">
						<EditOutlined onClick={toggleIsEditing} />
						<DeleteOutlined onClick={onClickDelete} />
					</div>
				)}
			</div>
			{isEditing ? (
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<textarea
						className="h-36 w-full resize-none rounded-lg border px-4 py-3"
						placeholder="수정할 문의사항을 입력해 주세요."
						{...register('contents')}
						defaultValue={productQuestion.contents}
					></textarea>
					<div className="text-red-500">
						{formState.errors.contents?.message}
					</div>
					<div className="flex justify-end gap-2">
						<button
							type="button"
							className="h-12 rounded-lg border border-black px-4 py-3"
							onClick={toggleIsEditing}
						>
							취소
						</button>
						<button
							type="submit"
							className="h-12 rounded-lg bg-black px-4 py-3 text-white"
						>
							수정 완료
						</button>
					</div>
				</form>
			) : (
				<>
					<div>{productQuestion.contents}</div>
					<div>{productQuestion.updatedAt}</div>
					<ProductQuestionAnswerList productQuestion={productQuestion} />
				</>
			)}
			{isReplying ? (
				<ProductQuestionAnswer
					productQuestion={productQuestion}
					toggleIsReplying={toggleIsReplying}
				/>
			) : (
				<button className="flex items-center gap-2" onClick={toggleIsReplying}>
					<Image src={REPLY} alt="문의내용답변하기" />
					답변하기
				</button>
			)}
			<Divider className="h-[1px] bg-[#E4E4E4]" />
		</div>
	);
}
