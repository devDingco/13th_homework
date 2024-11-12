"use client";
import { gql } from "@apollo/client";

export const resetUserPassword = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;
