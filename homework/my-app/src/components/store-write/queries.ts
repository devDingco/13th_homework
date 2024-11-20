import { gql } from "@apollo/client";

// GraphQL Queries and Mutations
export const CREATE_TRAVELPRODUCT = gql`
  mutation createTravelproduct($input: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $input) {
      _id
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export const FETCH_TRAVEL_PRODUCT = gql`
  query FetchTravelProduct2($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      travelproductAddress {
        zipcode
        address
        addressDetail
      }
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
