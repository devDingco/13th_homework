import { gql } from "@apollo/client";

export const FETCH_PRODUCT_DETAIL = gql`
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
      }
      seller {
        name
        picture
      }
    }
  }
`;
