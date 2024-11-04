"use client";
import { usePointList } from "@/components/point-list/hook";
import { Table } from "antd";
import styles from "./styles.module.scss";

export default function PointList({
  listType,
}: {
  listType: "selling" | "buying" | "loading";
}) {
  const {
    loading,
    listItemMouseHandler,
    dataSource,
    columns,
    fetchPointTransactionsCount,
    pageChangeHandler,
    page,
  } = usePointList({ listType });

  return (
    <>
      <div className="shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-2xl px-12 py-5">
        <div className="overflow-x-auto">
          <Table
            id={styles.boardList}
            dataSource={dataSource.length === 0 ? [] : dataSource}
            columns={columns}
            size="small"
            onRow={() => {
              return {
                onMouseOver: (event) => listItemMouseHandler(event, "over"),
                onMouseLeave: (event) => listItemMouseHandler(event, "leave"),
              };
            }}
            pagination={{
              position: ["none", "bottomCenter"],
              // pageSize: Number(data?.fetchBoards.length) || 10,
              current: page,
              defaultPageSize: 10,
              responsive: true,
              total: fetchPointTransactionsCount,
              showTotal: (total) => `총 게시글 수 : ${total}`,
              defaultCurrent: 1,
              showLessItems: false,
              onShowSizeChange: (current, size) => {
                console.log(current, size);
              },
              onChange: (page) => {
                //pageSize
                pageChangeHandler(page);
              },
              showSizeChanger: false,
              showQuickJumper: true,
            }}
            tableLayout="auto"
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}
