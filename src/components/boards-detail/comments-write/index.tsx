'use client';
import styles from './styles.module.css';
import { Rate } from 'antd';
import Image from 'next/image';
import usehookCommentsWrite from './hook';

export default function BoardsComponentComment(props) {

    const {
        writer,
        password,
        contents,
        writerError,
        passwordError,
        contentsError,
        isActive,
        value,
        setValue,
        onClickCancle,
        onClickUpdateComment,
        onChangeWriter,
        onChangePassword,
        onChangeContents,
        onClickCommentButton,
    } = usehookCommentsWrite(props);

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.commentBox}>
                    <Image
                        src="/images/chat.png"
                        alt="chat"
                        width={24}
                        height={24}
                    ></Image>
                    댓글
                </div>
                <div className={styles.starBox}>
                    <Rate onChange={setValue} value={value} />
                </div>
                <div className={styles.inputBox}>
                    <div className={styles.inputBoxWriterBox}>
                        <div className={styles.inputBoxWriter}>
                            작성자 <span className="text-red-500">*</span>
                        </div>

                        <input
                            type="text"
                            placeholder="작성자 명을 입력해 주세요."
                            className={styles.inputWriter}
                            value={writer}
                            // defaultValue={commentData}
                            onChange={onChangeWriter}
                            disabled={props.isEdit ? true : false}
                        />
                        <div className={styles.requiedMention}>
                            {writerError}
                        </div>
                    </div>
                    <div className={styles.inputBoxPasswordBox}>
                        <div className={styles.inputBoxPassword}>
                            비밀번호 <span className="text-red-500">*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="비밀번호를 입력해 주세요."
                            className={styles.inputPassword}
                            onChange={onChangePassword}
                            value={password}
                            disabled={props.isEdit ? true : false}
                        />
                        <div className={styles.requiedMention}>
                            {passwordError}
                        </div>
                    </div>
                </div>
                <div className={styles.inputTextareaBox}>
                    <textarea
                        placeholder="댓글을 입력해주세요."
                        className={styles.comment}
                        onChange={onChangeContents}
                        value={contents}
                    ></textarea>
                    <div className={styles.requiedMention}>{contentsError}</div>
                    <div className={styles.commentBoxButton}>
                        <button
                            className={styles.cancleButton}
                            style={{
                                display:
                                    props.isEdit === true ? 'block' : 'none',
                            }}
                            onClick={onClickCancle}
                        >
                            취소
                        </button>

                        <button
                            className={styles.regiCommentButton}
                            onClick={
                                props.isEdit === true
                                    ? onClickUpdateComment
                                    : onClickCommentButton
                            }
                            style={{
                                color: '#fff',
                                backgroundColor:
                                    isActive === true
                                        ? 'blue'
                                        : 'var(--gray-300, #c7c7c7)',
                            }}
                        >
                            {props.isEdit === true ? '수정하기' : '댓글등록'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
