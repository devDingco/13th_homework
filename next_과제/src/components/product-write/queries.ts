import { gql } from "@apollo/client";

export const CREATE_TRAVEL_PRODUCT = gql`
  mutation createTravelproduct(
    $createTravelProductInput: CreateTravelproductInput!
  ) {
    createTravelproduct(createTravelProductInput: $createTravelProductInput) {
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
