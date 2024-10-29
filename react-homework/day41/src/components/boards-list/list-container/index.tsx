import styles from "./styles.module.css";

import List from "../list";
import BoardsListSearch from "../search";
import useBoardsListContainer from "./hook";
import Header from "@/components/commons/header";

export default function BoardsListContainer() {
  const { data, keyword, setKeyword, lastPage, refetch, countRefetch } =
    useBoardsListContainer();

  return (
    <div className={styles.boards_list_page_body}>
      <div className={styles.boards_list_page}>
        <Header>트립토크 게시판</Header>
        {/* 검색 컴포넌트 */}
        <BoardsListSearch
          countRefetch={countRefetch}
          refetch={refetch}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        {/* 리스트 컴포넌트 */}
        <List
          data={data}
          keyword={keyword}
          lastPage={lastPage}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
