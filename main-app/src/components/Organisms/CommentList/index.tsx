"use client";

import CommentUI from "@/components/Molecules/Comment";
import InfiniteScroll from "react-infinite-scroll-component";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { FetchBoardCommentsDocument } from "@/common/graphql/graphql";

import { css } from "@/common/styled-system/css";

export default function CommentListUI() {
    const [hasMore, setHasMore] = useState(true);
    const params = useParams();

    const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
        variables: { page: 1, boardId: String(params.boardId) },
    });

    const onNext = () => {
        if (data === undefined) return;

        fetchMore({
            variables: {
                page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult.fetchBoardComments.length) {
                    setHasMore(false);
                    return;
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
        <section className={CSS_CommentBG}>
            <InfiniteScroll
                next={onNext}
                hasMore={hasMore}
                loader={<div>...Loading...</div>}
                dataLength={data?.fetchBoardComments.length ?? 0}
            >
                {data && data.fetchBoardComments.length > 0 ? (
                    data.fetchBoardComments.map((el, idx) => <CommentUI el={el} key={idx} />)
                ) : (
                    <div>등록된 댓글이 없습니다.</div>
                )}
            </InfiniteScroll>
        </section>
    );
}

const CSS_CommentBG = css({
    backgroundColor: "#F2F3F7",
    borderRadius: "0.8rem",
    display: "flex",
    gap: "1rem",
    margin: "2rem 0rem",
});
