import { gql } from "@apollo/client";

// 서비스 정보 가져오기
export const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($productId: ID!) {
    fetchTravelproduct(travelproductId: $productId) {
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
        addressDetail
        lat
        lng
      }
      buyer {
        _id
      }
      seller {
        _id
        name
        picture
      }
      soldAt
    }
  }
`;

// toggleTravelproductPick
export const TOGGLE_TRAVEL_PRODUCT_PICK = gql`
  mutation toggleTravelproductPick($travelproductId: ID!) {
    toggleTravelproductPick(travelproductId: $travelproductId)
  }
`;
