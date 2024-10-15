"use client";

import { COMMENT_FORM } from "../../../constants/constants";
import styles from "./styles.module.css";
import Comment from "../Comment/Comment";
import useCommentList from "../../../commons/hooks/useCommentList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/client";
import { FetchBoardCommentsDocument } from "../../../commons/graphql/graphql";
import { useParams } from "next/navigation";

export default function CommentList() {
  const params = useParams();
  const { data: dataCommentList } = useCommentList();
  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });
  const hasComments = dataCommentList?.fetchBoardComments.length;

  const onNext = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments) {
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          };
        }
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return (
    <div className={styles.comment_area}>
      {hasComments ? (
        <InfiniteScroll
          dataLength={data?.fetchBoardComments.length ?? 0}
          next={onNext}
          hasMore={true}
          loader={hasComments <= 0 && <div>loading...</div>}
        >
          <div>
            <ul>
              {dataCommentList?.fetchBoardComments.map((e, index: number) => (
                <Comment
                  key={e._id}
                  _id={e._id}
                  number={index + 1}
                  writer={String(e.writer)}
                  contents={e.contents}
                  createdAt={e.createdAt}
                  rating={e.rating}
                />
              ))}
            </ul>
          </div>
        </InfiniteScroll>
      ) : (
        <p>{COMMENT_FORM.NO_COMMENTS}</p>
      )}
    </div>
  );
}
