import Header from "@/components/commons/header";
import MyInfo from "../../components/my-page/my-info";
import styles from "./styles.module.css";

const MyPage = () => {
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
};
export default MyPage;
