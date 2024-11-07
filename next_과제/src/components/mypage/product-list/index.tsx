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
    handleSearch,
    refetch,
  } = useMyProductList();

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
        totalCount={fetchProductsCount}
      />
    </>
  );
}
