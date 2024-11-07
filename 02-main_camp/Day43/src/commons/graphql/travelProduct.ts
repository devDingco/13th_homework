import { gql } from "@apollo/client";

// "67021b115413b3002914ce34"
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
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
        deletedAt
      }
      buyer {
        picture
        deletedAt
      }
      seller {
        picture
        deletedAt
      }
      soldAt
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TRAVEL_PRODUCT = gql`
  mutation createTravelProduct(
    $createTravelproductInput: CreateTravelproductInput!
  ) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
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
    }
  }
`;
