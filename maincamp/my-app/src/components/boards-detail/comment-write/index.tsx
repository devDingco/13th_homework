"use client"
import { Modal, Rate } from "antd"
import styles from "./styles.module.css"
import { ICommentWriteProps } from "./types";
import { useBoardCommentWrite } from "./hook";

export default function BoardCommentWrite({
    comment,
    commentEdit,
    setCommentEdit,
}: ICommentWriteProps){
    const {
        onChangeContent,
        onChangeWriter,
        onChangePassword,
        setCommentContent,
        setCommentWriter,
        setCommentPassword,
        commentPassword,
        commentWriter,
        commentContent,
        onChangeStar,
        CreateBoardComment,
        changeComment,
        isActive,
        registerActive,
        registerColor,
        isModalOpen,
        handleOk,
        handleCancel,
        modalContent,
    } = useBoardCommentWrite(commentEdit ? comment : null, setCommentEdit);

    return(
        <div className={styles.comment_write_wrap}>
            {!commentEdit && (
                <div className={styles.comment_top}>
                    <p className={styles.commentImg}></p>
                    <p>댓글</p>
                </div>
            )}
            <div>
                <Rate 
                    className={styles.rateStar}
                    onChange={(event) => onChangeStar(event)}  
                />
            </div>
            <div className={styles.content_box}>
                <div className={styles.content_flex}>
                    <div className={styles.writer}>
                        <div className={styles.d_flex}>
                            <p>작성자</p>
                            <span>*</span>
                        </div>
                        <input 
                            value={commentWriter}
                            // disabled={commentEdit}
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
                            value={commentPassword}
                            // disabled={commentEdit}
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
                <div>  
                    {commentEdit ? (
                        <div>
                            <button onClick={() => setCommentEdit(false)}>취소</button>
                            <button onClick={changeComment}>수정하기</button>
                        </div>
                    ) : (
                        <button
                            style={isActive === true ? registerActive : registerColor}
                            onClick={CreateBoardComment}
                        >
                            댓글 등록
                        </button>
                    )} 
                </div>
            </div>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <p>{modalContent}</p>
            </Modal>
        </div>
    )
}