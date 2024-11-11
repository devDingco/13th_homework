import { useMyProductList } from "./hook";
import SearchBox from "@/components/search-box";
import TableList from "@/components/table-list/page";
import { DataType } from "./types";

export default function MyProductList() {
  const {
    data,
    tableItemOnClick,
    dataSource,
    columns,
    fetchProductsCount,
    refetch,
    countDataRefetch,
  } = useMyProductList();

  return (
    <>
      <div className="self-end">
        <SearchBox
          refetch={refetch}
          countDataRefetch={() => countDataRefetch()}
          isDate={false}
        />
      </div>

      <TableList
        data={data}
        refetch={refetch}
        tableItemHandler={(record: DataType) => ({
          onClick: () => tableItemOnClick(record._id || ""),
        })}
        dataSource={dataSource}
        columns={columns}
        totalCount={fetchProductsCount}
      />
    </>
  );
}
