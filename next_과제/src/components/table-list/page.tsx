import { Table } from "antd";
import styles from "./styles.module.scss";
import { ITableListProps } from "./types";
import { useTableList } from "./hook";

export default function TableList<T>(props: ITableListProps<T>) {
  const {
    isLoading,
    refetch,
    tableItemHandler = () => {},
    dataSource,
    columns,
    totalCount,
  } = props;

  const { page, pageChangeHandler } = useTableList({ refetch });

  return (
    <div className="shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-2xl px-12 py-5 max-sm:px-2">
      <div className="overflow-x-auto">
        <Table
          id={styles.tableList}
          dataSource={dataSource.length === 0 ? [] : dataSource}
          columns={columns}
          size="small"
          onRow={(record) => {
            return { ...tableItemHandler(record) };
          }}
          pagination={{
            position: ["none", "bottomCenter"],
            current: page,
            defaultPageSize: 10,
            responsive: true,
            total: totalCount,
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
          loading={isLoading}
        />
      </div>
    </div>
  );
}
