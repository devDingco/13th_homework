import { useQuestionList } from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";
import QuestionItem from "../product-question-item";

export default function QuestionList({ sellerId }: { sellerId: string }) {
  const { data, error, loading, fetchMoreData, hasMore, reply } =
    useQuestionList({ sellerId });

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="pb-28">
      <InfiniteScroll
        dataLength={data?.fetchTravelproductQuestions.length ?? 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {data?.fetchTravelproductQuestions.map((questionData, idx) => (
          <QuestionItem
            key={questionData._id + idx}
            questionData={questionData}
            reply={reply}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
