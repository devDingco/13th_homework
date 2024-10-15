import { gql, useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import List from "./list";
import Pagination from "./pagination";

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export default function BoardsList() {
  const { data, refetch } = useQuery(FetchBoardsDocument);
  const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
  // 마지막페이지 계산하기
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  return (
    <div className={styles.board_list_body}>
      <div className={styles.board_list}>
        <div className={styles.header_box}>
          <div>번호</div>
          <div>제목</div>
          <div>작성자</div>
          <div>날짜</div>
        </div>
        <div className={styles.list_box}>
          {/* board 리스트 컴포넌트 */}
          <List data={data} />
        </div>
        {/* 페이지네이션 컴포넌트 */}
        <Pagination refetch={refetch} lastPage={lastPage} />
      </div>
    </div>
  );
}
