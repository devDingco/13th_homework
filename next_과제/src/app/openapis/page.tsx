import MovieList from "@/components/openapis-list";

export default function OpenApisPage() {
  return (
    <div className="mainContent">
      <h3 className="font-bold text-4xl text-center text-blue-600 my-12">
        현재 상영중인 영화 목록
      </h3>
      <MovieList />
    </div>
  );
}
