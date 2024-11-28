"use client";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
  const router = useRouter();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용가능");
      router.push("/section22/22-03-login-localstorage-check");
    }
  }, []);

  return <div>{data?.fetchUserLoggedIn.name}님 환영합니다.</div>;
};

export default LoginSuccessPage;
