import Image from "next/image";
import BoardsList from "@/components/boards-list/list";
import ListPagination from "@/components/boards-list/pagination";
import { useQuery } from "@apollo/client";
import { FetchBoardDocument, FetchBoardsCountDocument } from "@/commons/graphql/graphql";

export default function Home() {

  const {data, refetch} = useQuery(FetchBoardDocument);

  const {data: dataBoardsCount} = useQuery(FetchBoardsCountDocument);

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  console.log(data);

  return(
    <>
      <BoardsList />
      <ListPagination refetch={refetch} lastPage={lastPage} />
    </>
  )
}
