"use client";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
    }
  }
`;

export default function LoginSuccessPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용해주세요.");
      router.push("/section22/22-03-login-localstorage-check");
    }
  }, []);

  return (
    <div>
      <h1>Login Success</h1>
      <p>{data?.fetchUserLoggedIn.name}님 환영합니다!</p>
      <div>이메일 : {data?.fetchUserLoggedIn.email}</div>
      <div>이름 : {data?.fetchUserLoggedIn.name}</div>
    </div>
  );
}
