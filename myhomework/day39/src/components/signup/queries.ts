"use client";

import { gql } from "@apollo/client";

export const CreateUser = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
      picture
      userPoint {
        _id
        amount
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
