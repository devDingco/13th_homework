import { Pagination } from "antd";

// 페이지네이션을 구현할 때 필요한 것
// 페이지 버튼을 누를때마다 게시글 불러오기(refetch)
// 현재 페이지 값을 관리할 스테이트와 set스테이트
// 총 페이지 수
export default function PageButton({
  currentPage,
  refetch,
  boardsCount,
  setCurrentPage,
}) {
  const onChangePage = (page) => {
    setCurrentPage(page);
    refetch({ page });
  };

  return (
    <Pagination
      defaultCurrent={1}
      current={currentPage}
      onChange={onChangePage}
      showSizeChanger={false}
      pageSize={10}
      align="center"
      total={boardsCount?.fetchBoardsCount}
    />
  );
}
