"use client";

import Header from "@/components/commons/header";
import MyInfo from "../../components/my-page/my-info";
import styles from "./styles.module.css";
import { withAuth } from "@/commons/hocs/withAuth";
import { gql, useQuery } from "@apollo/client";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

function MyPage() {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  return (
    <div className={styles.mypage_body}>
      <div className={styles.mypage_page}>
        <Header>마이 페이지</Header>
        <div>
          <MyInfo />
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(MyPage);
