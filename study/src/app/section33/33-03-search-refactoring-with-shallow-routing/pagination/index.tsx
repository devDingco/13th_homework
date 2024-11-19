"use client";

import { Pagination } from "antd";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";

export default function SearchPagination() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const { refetch } = useQuery(FetchBoardsDocument, {
    variables: { search, page: Number(page) },
  });
  const onClickPage = async (page: number) => {
    await refetch({ search, page });
    window.history.pushState(null, "", `?search=${search}&page=${page}`);
  };
  return (
    <>
      <Pagination
        defaultCurrent={Number(page)}
        total={50}
        onChange={(page) => onClickPage(page)}
      />
    </>
  );
}
