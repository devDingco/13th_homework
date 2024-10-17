"use client"
import { Rate } from "antd"
import styles from "./styles.module.css"
import useBoardCommentWrite from "./hook"

export default function BoardCommentWrite(){
    const {
        CreateBoardComment,
        onChangeContent,
        onChangeWriter,
        onChangePassword,
        setCommentContent,
        setCommentWriter,
        setCommentPassword,
    } = useBoardCommentWrite();
    
    return(
        <div className={styles.comment_write_wrap}>
            <div className={styles.comment_top}>
                <p className={styles.commentImg}></p>
                <p>댓글</p>
            </div>
            {/* <Rate onChange={setValue} value={value} /> */}
            <div className={styles.content_box}>
                <div className={styles.content_flex}>
                    <div className={styles.writer}>
                        <div className={styles.d_flex}>
                            <p>작성자</p>
                            <span>*</span>
                        </div>
                        <input 
                            onChange={onChangeWriter}
                            type="text" 
                            placeholder="작성자 명을 입력해주세요."
                        />
                    </div>
                    <div className={styles.password}>
                        <div className={styles.d_flex}>
                            <p>비밀번호</p>
                            <span>*</span>
                        </div>
                        <input 
                            onChange={onChangePassword}
                            type="password" 
                            placeholder="비밀번호를 입력해주세요."
                        />
                    </div>
                </div>
                <div className={styles.comment_box}>
                    <textarea 
                        onChange={onChangeContent}
                        placeholder="댓글을 입력해주세요." 
                    />
                </div>
                <button onClick={CreateBoardComment}>댓글 등록</button>
            </div>
        </div>
    )
}