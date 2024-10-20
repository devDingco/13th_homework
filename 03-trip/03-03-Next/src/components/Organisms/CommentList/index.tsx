"use client";

import { Rate } from "antd";

import Image from "next/image";
import profile from "/public/svg/person.svg";
import edit from "/public/svg/edit.svg";
import close from "/public/svg/close.svg";

import {
    comment_btn,
    comment_input,
    comment_label,
    comment_wrap,
} from "@/commons/styles/commentStyles";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

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
                page:
                    Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
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
        <section style={comment_wrap}>
            <InfiniteScroll
                next={onNext}
                hasMore={hasMore}
                loader={<div>...Loading...</div>}
                dataLength={data?.fetchBoardComments.length ?? 0}
            >
                {data && data.fetchBoardComments.length > 0 ? (
                    data.fetchBoardComments.map((el) => (
                        <div key={el._id}>
                            <div style={comment_input}>
                                <div style={comment_label}>
                                    <Image src={profile} alt="profile" />
                                    <div>{el.writer}</div>
                                    <Rate
                                        value={el.rating}
                                        allowHalf
                                        disabled
                                    />
                                </div>
                                <div style={comment_label}>
                                    <div style={comment_btn}>
                                        <Image src={edit} alt="edit" />
                                    </div>
                                    <div style={comment_btn}>
                                        <Image src={close} alt="close" />
                                    </div>
                                </div>
                            </div>

                            <pre>{el.contents}</pre>

                            <div>{el.createdAt.split("T")[0]}</div>
                        </div>
                    ))
                ) : (
                    <div>등록된 댓글이 없습니다.</div>
                )}
            </InfiniteScroll>
        </section>
    );
}
