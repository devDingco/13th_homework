"use client";
import { usePointList } from "@/components/point-list/hook";
import TableList from "@/components/table-list/page";
import { IData } from "@/components/point-list/types";

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
        data={pointTransactionsData}
        dataSource={dataSource}
        columns={columns}
        tableItemHandler={(record: IData) => ({
          onClick: () => {
            if (listType === "buying" || listType === "selling") {
              router.push(`/products/${record.travelproduct?._id}`);
            }
          },
        })}
        refetch={refetch}
        totalCount={fetchPointTransactionsCount}
      />
    </>
  );
}
