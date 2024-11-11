import { gql } from "@apollo/client";

export const CREATE_TRAVEL_PRODUCT = gql`
  mutation createTravelproductInput(
    $name: String!
    $remarks: String!
    $contents: String!
    $price: Int!
    $tags: [String!]
  ) {
    createTravelproduct(
      createTravelproductInput: {
        name: $name
        remarks: $remarks
        contents: $contents
        price: $price
        tags: $tags
      }
    ) {
      _id
      name
      remarks
      contents
      price
      tags
      pickedCount
      createdAt
    }
  }
`;

export const UPDATE_TRAVEL_PRODUCT = gql`
  mutation updateTravelproduct(
    $travelproductId: ID!
    $name: String!
    $remarks: String!
    $contents: String!
    $price: Int
  ) {
    updateTravelproduct(
      travelproductId: $travelproductId
      updateTravelproductInput: {
        name: $name
        remarks: $remarks
        contents: $contents
        price: $price
      }
    ) {
      price
      pickedCount
      soldAt
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
      tags
      price
    }
  }
`;
