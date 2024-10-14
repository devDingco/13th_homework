import Icon from "@/components/iconFactory";
import { useBoardList } from "@/components/board-list/hook";
import SearchBox from "@/components/searchBox";
import { Button, Table } from "antd";
import styles from "./styles.module.scss";

export default function BoardList({ searchBox }: { searchBox?: boolean }) {
  const {
    data,
    listItemMouseHandler,
    detailPageHandler,
    handleSearch,
    dataSource,
    columns,
    fetchBoardsCount,
    searchParams,
    setSearchParams,
    router,
  } = useBoardList();

  return (
    <>
      {searchBox && (
        <div className="flex gap-4 justify-between flex-wrap">
          <SearchBox handleSearch={handleSearch} />
          <Button
            className="max-sm:fixedBtn"
            size="large"
            color="primary"
            variant="solid"
            icon={<Icon icon="rwite" className="w-6 h-6" />}
            onClick={() => router.push("/boards/new")}
          >
            트립토크 등록
          </Button>
        </div>
      )}
      <div className="shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-2xl px-12 py-5">
        <div className="overflow-x-auto">
          <Table
            id={styles.boardList}
            dataSource={dataSource.length === 0 ? [] : dataSource}
            columns={columns}
            size="small"
            onRow={(record) => {
              return {
                onClick: (event) =>
                  detailPageHandler(event, record.deleteBoard || ""),
                onMouseOver: (event) => listItemMouseHandler(event, "over"),
                onMouseLeave: (event) => listItemMouseHandler(event, "leave"),
              };
            }}
            pagination={{
              position: ["none", "bottomCenter"],
              // pageSize: Number(data?.fetchBoards.length) || 10,
              current: searchParams.page ? Number(searchParams.page) : 1,
              defaultPageSize: 10,
              responsive: true,
              total: fetchBoardsCount,
              showTotal: (total) => `총 게시글 수 : ${total}`,
              defaultCurrent: searchParams.page ? Number(searchParams.page) : 1,
              showLessItems: false,
              onShowSizeChange: (current, size) => {
                console.log(current, size);
              },
              onChange: (page, pageSize) => {
                const startDate = searchParams.startDate;
                const endDate = searchParams.endDate;
                const search = searchParams.search;

                const newParams = {
                  page: String(page),
                  pageSize: String(pageSize),
                  startDate,
                  endDate,
                  search,
                };
                setSearchParams(newParams);
              },
              showSizeChanger: false,
              showQuickJumper: true,
            }}
            tableLayout="auto"
            loading={data === undefined}
          ></Table>
        </div>
      </div>
    </>
  );
}
