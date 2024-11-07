import { gql } from "@apollo/client";

export const CREATE_POINT__TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId) {
      _id
    }
  }
`;
