'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import PROFILE_IMG from '@/assets/profile.png';
import Image from 'next/image';
import { useState } from 'react';
import { Divider, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const FETCH_TRAVEL_PRODUCTS = gql`
	query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {
		fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
			_id
			name
			remarks
			contents
		}
	}
`;

export const FETCH_TRAVEL_PRODUCT_QUESTIONS = gql`
	query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {
		fetchTravelproductQuestions(
			page: $page
			travelproductId: $travelproductId
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

const UPDATE_TRAVEL_PRODUCT_QUESTION = gql`
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

const FETCH_USER_LOGGED_IN = gql`
	query fetchUserLoggedIn {
		fetchUserLoggedIn {
			_id
			email
			name
		}
	}
`;

export default function ProductQuestionList(props) {
	const params = useParams();
	const travelproductId = params.travelproductId;
	const { data, fetchMore } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTIONS, {
		variables: {
			travelproductId,
		},
	});

	const [hasMore, setHasMore] = useState(true);

	const onNext = () => {
		if (!data?.fetchTravelproductQuestions.length) {
			return;
		}
		fetchMore({
			variables: {
				page: Math.ceil(data?.fetchTravelproductQuestions.length / 10) + 1,
				travelproductId,
			},
			updateQuery(previousQueryResult, { fetchMoreResult }) {
				if (!fetchMoreResult.fetchTravelproductQuestions.length) {
					setHasMore(false);
					return {
						fetchTravelproductQuestions: [
							...previousQueryResult.fetchTravelproductQuestions,
						],
					};
				}

				return {
					fetchTravelproductQuestions: [
						...previousQueryResult.fetchTravelproductQuestions,
						...fetchMoreResult.fetchTravelproductQuestions,
					],
				};
			},
		});
	};

	return (
		<div id="scrollableTargetDiv" className="h-72 overflow-y-scroll">
			<InfiniteScroll
				hasMore={hasMore}
				next={onNext}
				loader={<div>문의내역 불러오는 중..</div>}
				dataLength={data?.fetchTravelproductQuestions.length ?? 0}
				scrollableTarget="scrollableTargetDiv"
			>
				{data?.fetchTravelproductQuestions.map((item, idx) => {
					return <Item item={item} user={item.user} key={item._id} />;
				})}
			</InfiniteScroll>
		</div>
	);
}

const productQuestionSchema = z.object({
	contents: z.string().min(0),
});

function Item({ item, user }) {
	const { register, handleSubmit } = useForm({
		mode: 'onChange',
		resolver: zodResolver(productQuestionSchema),
	});
	const [isEditing, setIsEditing] = useState(false);
	const { data } = useQuery(FETCH_USER_LOGGED_IN);

	const toggleIsEditing = () => {
		// 현재 로그인 사용자와 문의를 남긴 사용자가 다르면..
		if (data.fetchUserLoggedIn._id !== user._id) {
			Modal.info({ content: '본인이 작성한 문의 내역만 수정할 수 있습니다!' });
			return;
		}
		setIsEditing((prev) => !prev);
	};

	const [updateTravelproductQuestion] = useMutation(
		UPDATE_TRAVEL_PRODUCT_QUESTION,
	);
	const onSubmit = async (data) => {
		const result = await updateTravelproductQuestion({
			variables: {
				updateTravelproductQuestionInput: { ...data },
				travelproductQuestionId: item._id,
			},
		});
		toggleIsEditing();
	};

	return (
		<div className="flex flex-col gap-4" key={item._id}>
			<div className="flex justify-between gap-4">
				<div className="flex gap-2">
					<Image src={PROFILE_IMG} alt="사용자프로필이미지" />
					<div>{user.name}</div>
				</div>
				{!isEditing && (
					<div className="flex gap-4">
						<EditOutlined onClick={toggleIsEditing} />
						<DeleteOutlined />
					</div>
				)}
			</div>
			{isEditing ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<textarea
						className="h-36 w-full resize-none rounded-lg border px-4 py-3"
						placeholder="수정할 문의사항을 입력해 주세요."
						{...register('contents')}
					></textarea>
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
				<div>{item.contents}</div>
			)}
			{!isEditing && <div>{item.updatedAt}</div>}
			<Divider className="h-[1px] bg-[#E4E4E4]" />
		</div>
	);
}
