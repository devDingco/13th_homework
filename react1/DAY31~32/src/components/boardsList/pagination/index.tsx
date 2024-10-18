import { Pagination as AntPagination } from 'antd';

interface IPaginationProps {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    totalItems,
    currentPage,
    pageSize,
    onPageChange,
}: IPaginationProps) {
    return (
        <>
            <AntPagination
                total={totalItems}
                current={currentPage}
                pageSize={pageSize}
                showSizeChanger={false}
                onChange={onPageChange}
            />
        </>
    );
}
