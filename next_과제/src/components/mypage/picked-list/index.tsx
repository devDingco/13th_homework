"use client";
import { usePickedList } from "@/components/mypage/picked-list/hook";
import SearchBox from "@/components/search-box";
import TableList from "@/components/table-list/page";
import { DataType } from "./types";

export default function PickedList() {
  const {
    data,
    tableItemOnClick,
    dataSource,
    columns,
    pickedTotalCount,
    refetch,
  } = usePickedList();

  return (
    <>
      <div className="self-end">
        <SearchBox refetch={refetch} isDate={false} />
      </div>

      <TableList
        isLoading={data === undefined}
        refetch={refetch}
        tableItemHandler={(record: DataType) => ({
          onClick: () => tableItemOnClick(record._id || ""),
        })}
        dataSource={dataSource}
        columns={columns || []}
        totalCount={pickedTotalCount || 0}
      />
    </>
  );
}
