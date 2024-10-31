import { Pagination } from "antd";

export default function BoardsListPagination(props) {
  const onClickPage = (page) => {
    props.setCurrentPage(page);
    props.refetch({ page: Number(props.currentPage) });
    console.log(page);
  };
  // console.log(props.boardsCount);
  // total만 넣어주면 저절로 다음이전버튼 가능
  return (
    <Pagination
      align="center"
      defaultCurrent={1}
      total={props.dataBoardCount?.fetchBoardsCount}
      style={{ margin: "30px 0px" }}
      pageSize={10} // 보여질 목록수
      onChange={onClickPage}
    />
  );
}
