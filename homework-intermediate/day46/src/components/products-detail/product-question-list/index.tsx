'use client';

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';
import { useState } from 'react';
import { Item } from './item';
import { TravelproductQuestion } from '@/commons/graphql/graphql';

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

export default function ProductQuestionList(props) {
	const params = useParams();
	const travelproductId = params.travelproductId;
	const { data, fetchMore, refetch } = useQuery(
		FETCH_TRAVEL_PRODUCT_QUESTIONS,
		{
			variables: {
				travelproductId,
			},
		},
	);

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
		<div
			id="scrollableTargetDiv"
			className="h-96 overflow-y-scroll border border-red-600"
		>
			<InfiniteScroll
				hasMore={hasMore}
				next={onNext}
				loader={<div>문의내역 불러오는 중..</div>}
				dataLength={data?.fetchTravelproductQuestions.length ?? 0}
				scrollableTarget="scrollableTargetDiv"
			>
				{data?.fetchTravelproductQuestions.map(
					(item: TravelproductQuestion) => {
						return (
							<Item
								item={item}
								user={item.user}
								key={item._id}
								refetch={refetch}
							/>
						);
					},
				)}
			</InfiniteScroll>
		</div>
	);
}
