"use client";
import { gql, useQuery } from "@apollo/client";
import React from "react";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

const LoginSuccessPage = () => {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  return <div>{data?.fetchUserLoggedIn.name}님 환영합니다.</div>;
};

export default LoginSuccessPage;
