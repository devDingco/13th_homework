import styles from "./styles.module.css";

import List from "../list";
import Pagination from "../pagination";
import BoardsListSearch from "../search";
import useBoardsListContainer from "./hook";

export default function BoardsListContainer() {
  const { data, keyword, getDebounce, lastPage, refetch } =
    useBoardsListContainer();

  return (
    <div className={styles.boards_list_page_body}>
      <div className={styles.boards_list_page}>
        <div className={styles.header}>트립토크 게시판</div>
        {/* 검색 컴포넌트 */}
        <BoardsListSearch getDebounce={getDebounce} />
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
              <List data={data} keyword={keyword} />
            </div>
            {/* 페이지네이션 컴포넌트 */}
            <Pagination refetch={refetch} lastPage={lastPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
