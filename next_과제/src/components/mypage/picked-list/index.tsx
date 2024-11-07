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
    handleSearch,
    refetch,
  } = usePickedList();

  return (
    <>
      <div className="self-end">
        <SearchBox handleSearch={handleSearch} isDate={false} />
      </div>

      <TableList
        data={data}
        refetch={refetch}
        tableItemHandler={(record: DataType) => ({
          onClick: () => tableItemOnClick(record._id || ""),
        })}
        dataSource={dataSource}
        columns={columns}
        totalCount={pickedTotalCount}
      />
    </>
  );
}
