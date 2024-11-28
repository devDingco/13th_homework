"use client";

import Icon from "@/components/icon-factory";
import { useBoardList } from "@/components/board-list/hook";
import SearchBox from "@/components/search-box";
import { Button } from "antd";
import TableList from "@/components/table-list/page";
import { DataType } from "./types";

export default function BoardList({ searchBox }: { searchBox?: boolean }) {
  const {
    data,
    listItemMouseHandler,
    tableItemOnClick,
    dataSource,
    columns,
    fetchBoardsCount,
    router,
    refetch,
    countDataRefetch,
  } = useBoardList();

  return (
    <>
      {searchBox && (
        <div className="flex gap-4 justify-between flex-wrap">
          <SearchBox refetch={refetch} countDataRefetch={countDataRefetch} />
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

      <TableList
        isLoading={data === undefined}
        refetch={refetch}
        tableItemHandler={(record: DataType) => ({
          onClick: () => tableItemOnClick(record._id || ""),
          onMouseOver: (e: React.MouseEvent<HTMLTableRowElement>) =>
            listItemMouseHandler(e, "over", record._id || ""),
          onMouseLeave: (e: React.MouseEvent<HTMLTableRowElement>) =>
            listItemMouseHandler(e, "leave", record._id || ""),
        })}
        dataSource={dataSource}
        columns={columns}
        totalCount={fetchBoardsCount || 0}
      />
    </>
  );
}
