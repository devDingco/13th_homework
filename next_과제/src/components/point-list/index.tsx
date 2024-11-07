"use client";
import { usePointList } from "@/components/point-list/hook";
import TableList from "@/components/table-list/page";

interface DataType {
  key: string;
  _id: string;
  createdAt: string;
  name: string;
  price: number;
}

export default function PointList({
  listType,
}: {
  listType: "selling" | "buying" | "loading";
}) {
  const {
    pointTransactionsData,
    dataSource,
    columns,
    fetchPointTransactionsCount,
    refetch,
  } = usePointList({ listType });

  return (
    <>
      <div className="shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-2xl px-12 py-5">
        <div className="overflow-x-auto">
          <TableList
            data={pointTransactionsData}
            dataSource={dataSource}
            columns={columns}
            refetch={refetch}
            totalCount={fetchPointTransactionsCount}
          />
        </div>
      </div>
    </>
  );
}
