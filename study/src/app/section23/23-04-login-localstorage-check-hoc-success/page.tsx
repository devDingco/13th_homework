"use client";
import { useQuery, gql } from "@apollo/client";
import { withAuth } from "@/commons/hocs/23-04-withAuth";

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

function LoginSuccessPage() {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  return (
    <div>
      <h1>Login Success</h1>
      <p>{data?.fetchUserLoggedIn.name}님 환영합니다!</p>
      <div>이메일 : {data?.fetchUserLoggedIn.email}</div>
      <div>이름 : {data?.fetchUserLoggedIn.name}</div>
    </div>
  );
}

export default withAuth(LoginSuccessPage);
