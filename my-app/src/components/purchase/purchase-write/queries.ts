import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export const CREATE_TRAVEL_PRODUCT = gql`
  mutation createTravelproductInput(
    $name: String!
    $remarks: String!
    $contents: String!
    $price: Int!
    $tags: [String!]
    $images: [String!]
    $zipcode: String
    $addressDetail: String
    $lat: Float
    $lng: Float
  ) {
    createTravelproduct(
      createTravelproductInput: {
        name: $name
        remarks: $remarks
        contents: $contents
        price: $price
        tags: $tags
        images: $images
        travelproductAddress: {
          zipcode: $zipcode
          addressDetail: $addressDetail
          lat: $lat
          lng: $lng
        }
      }
    ) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      createdAt
      travelproductAddress {
        zipcode
        addressDetail
        lat
        lng
      }
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
    $tags: [String!]
    $images: [String!]
    $zipcode: String
    $addressDetail: String
    $lat: Float
    $lng: Float
  ) {
    updateTravelproduct(
      travelproductId: $travelproductId
      updateTravelproductInput: {
        name: $name
        remarks: $remarks
        contents: $contents
        price: $price
        tags: $tags
        images: $images
        travelproductAddress: {
          zipcode: $zipcode
          addressDetail: $addressDetail
          lat: $lat
          lng: $lng
        }
      }
    ) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      travelproductAddress {
        zipcode
        addressDetail
        lat
        lng
      }
    }
  }
`;

export const FECTH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($id: ID!) {
    fetchTravelproduct(travelproductId: $id) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      travelproductAddress {
        zipcode
        addressDetail
        lat
        lng
      }
    }
  }
`;
