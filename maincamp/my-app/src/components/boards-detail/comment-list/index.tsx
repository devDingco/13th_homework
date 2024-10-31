"use client"
import { Rate } from "antd";
import useBoardCommentList from "./hook"
import styles from "./styles.module.css"
import InfiniteScroll from "react-infinite-scroll-component";

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
                    <span style={{ margin: "10px" }}>{el.title}</span>
                    <span style={{ margin: "10px" }}>{el.writer}</span>
                </div>
                ))}
                {data?.fetchBoardComments.map((comment, index) => (
                    <div key={comment?._id} className={styles.comment_list_container}>
                        <div className={styles.profile}>
                            <div className={styles.d_flex}>
                                <p className={styles.profileIcon}></p>
                                <p className={styles.writer}>{comment?.writer}</p>
                                <Rate 
                                    className={styles.rateStar}
                                    onChange={(event) => onChangeStar(event)}  
                                />
                            </div>
                            <div>
                                <button className={styles.editIcon}></button>
                                <button className={styles.closeIcon}></button>
                            </div>
                        </div>
                        <div className={styles.comment_text}>
                            {comment?.contents} 
                        </div>
                        <div className={styles.comment_date}>
                            {comment?.createdAt.split("T")[0].replace(/-/g, ".")}
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}