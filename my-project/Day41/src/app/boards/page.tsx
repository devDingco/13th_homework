"use client";

import Boards from "@/components/boards-list/list";
import Search from "@/components/boards-list/search/page";
import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      title
      writer
      createdAt
    }
  }
`;

export default function BoardsPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  return (
    <div>
      <Search data={data} refetch={refetch} />
      <Boards data={data} refetch={refetch} />
    </div>
  );
}
