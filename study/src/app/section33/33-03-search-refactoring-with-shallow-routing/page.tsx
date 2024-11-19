import SearchBox from "./search";
import SearchList from "./list";
import SearchPagination from "./pagination";

export default function SearchBoardListPage() {
  return (
    <>
      <SearchBox />
      <div className="flex flex-col gap-4 p-3">
        <SearchList />
        <SearchPagination />
      </div>
    </>
  );
}
