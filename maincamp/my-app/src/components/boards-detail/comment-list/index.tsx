"use client"
import { Rate } from "antd";
import useBoardCommentList from "./hook"
import styles from "./styles.module.css"
import InfiniteScroll from "react-infinite-scroll-component";
import CommentListItem from "../comment-list-item";

export default function BoardCommentList() {
    const { data, onChangeStar, onNext, hasMore } = useBoardCommentList();
    return(
        <div className={styles.comment_list_wrap}>
            <InfiniteScroll
                next={onNext}
                hasMore={hasMore}
                loader={<div>로딩중입니다</div>}
                dataLength={data?.fetchBoardComments.length ?? 0}
            >
                {data?.fetchBoardComments.map((el) => (
                <div key={el._id}>
                    {/* <span style={{ margin: "10px" }}>{el.title}</span>
                    <span style={{ margin: "10px" }}>{el.writer}</span> */}
                </div>
                ))}
                {data?.fetchBoardComments.map((comment, index) => (
                    <CommentListItem 
                        key={comment._id}
                        comment={comment}
                        index={index}
                        length={data?.fetchBoardComments.length ?? 0}
                    />
                ))}
            </InfiniteScroll>
        </div>
    )
}