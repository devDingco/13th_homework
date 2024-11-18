"use client";
import { usePointList } from "@/components/mypage/point-list/hook";
import TableList from "@/components/table-list/page";
import { DataType } from "./types";

export default function PointList({
  listType,
}: {
  listType: "all" | "selling" | "buying" | "loading";
}) {
  const {
    pointTransactionsData,
    dataSource,
    columns,
    fetchPointTransactionsCount,
    refetch,
    router,
  } = usePointList({ listType });

  return (
    <>
      <TableList
        isLoading={pointTransactionsData === undefined}
        dataSource={dataSource}
        columns={columns || []}
        tableItemHandler={(record: DataType) => ({
          onClick: () => {
            if (listType === "buying" || listType === "selling") {
              router.push(`/products/${record.travelproduct?._id}`);
            }
          },
        })}
        refetch={refetch}
        totalCount={fetchPointTransactionsCount() || 0}
      />
    </>
  );
}
