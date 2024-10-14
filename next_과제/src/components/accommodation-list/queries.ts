import { gql } from "@apollo/client";

export const FETCH_TRAVELS = gql`
  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {
    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress
      buyer
      seller
      soldAt
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
