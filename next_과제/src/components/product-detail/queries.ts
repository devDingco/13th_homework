import { gql } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCT_DETAIL = gql`
  query fetchTravelproductDetail($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      tags
      images
      pickedCount
      price
      seller {
        _id
        name
        picture
      }
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
    }
  }
`;

export const DELETE_TRAVEL_PRODUCT = gql`
  mutation deleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`;
