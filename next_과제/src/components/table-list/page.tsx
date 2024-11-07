import { Table } from "antd";
import styles from "./styles.module.scss";
import { usePageChange } from "@/commons/stores/page-store";
import { useSearch } from "@/commons/stores/search-store";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TableList(props) {
  const pathname = usePathname();
  const { search } = useSearch();

  const {
    data,
    refetch,
    tableItemHandler = () => {},
    dataSource,
    columns,
    totalCount,
  } = props;

  const { page, setPage } = usePageChange();

  useEffect(() => {
    // ! 페이지 변경시 테이블 페이지 초기화
    setPage(1);
  }, [pathname]);

  // ! 페이지 변경시 리페치 처리 핸들러
  const pageChangeHandler = async (page: number) => {
    const result = await refetch({
      search,
      page,
    });
    console.log(result);
    setPage(page);
  };

  return (
    <div className="shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-2xl px-12 py-5">
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
          loading={data === undefined}
        />
      </div>
    </div>
  );
}
