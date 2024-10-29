export interface IBoardsListSearchProps {
  countRefetch: () => void;
  refetch: () => void;
  keyword: string | undefined;
  setKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
}
