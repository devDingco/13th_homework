import { useFetchBoardsQuery } from '@/graphql/queries/fetchBoards/fetchBoards.generated';

export default function useListComponent() {
  const { data } = useFetchBoardsQuery();
  return { data };
}
