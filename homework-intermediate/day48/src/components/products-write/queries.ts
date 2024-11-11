import { gql } from '@apollo/client';

export const CREATE_TRAVEL_PRODUCT = gql`
	mutation createTravelproduct(
		$createTravelproductInput: CreateTravelproductInput!
	) {
		createTravelproduct(createTravelproductInput: $createTravelproductInput) {
			_id
			name
			remarks
			contents
			price
			tags
			images
			pickedCount
			buyer {
				_id
				email
				name
			}
			seller {
				_id
				email
				name
			}
			soldAt
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export const FETCH_TRAVEL_PRODUCT = gql`
	query fetchTravelproduct($travelproductId: ID!) {
		fetchTravelproduct(travelproductId: $travelproductId) {
			_id
			name
			remarks
			contents
			price
			tags
			images
			pickedCount
			buyer {
				_id
				email
				name
			}
			seller {
				_id
				email
				name
			}
			soldAt
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export const UPDATE_TRAVEL_PRODUCT = gql`
	mutation updateTravelproduct(
		$updateTravelproductInput: UpdateTravelproductInput!
		$travelproductId: ID!
	) {
		updateTravelproduct(
			updateTravelproductInput: $updateTravelproductInput
			travelproductId: $travelproductId
		) {
			_id
			name
			remarks
			contents
			price
			tags
			images
			pickedCount
			soldAt
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export const createPointTransactionOfBuyingAndSelling = gql`
	mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
		createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
			_id
			name
			remarks
			contents
			price
			tags
			images
			pickedCount
			soldAt
			createdAt
			updatedAt
			deletedAt
		}
	}
`;
