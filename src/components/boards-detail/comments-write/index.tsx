'use client';
import styles from './styles.module.css';
import { useState } from 'react';
import { Rate } from 'antd';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { FetchBoardCommentsDocument } from '@/commons/graphql/graphql';
import Image from 'next/image';

const FETCH_BOARD_CREATE_COMMENT = gql`
    mutation createBoardComment(
        $createBoardCommentInput: CreateBoardCommentInput!
        $boardId: ID!
    ) {
        createBoardComment(
            createBoardCommentInput: $createBoardCommentInput
            boardId: $boardId
        ) {
            _id
            writer
            contents
            rating
        }
    }
`;

export default function BoardsComponentComment() {
    const [writer, setWriter] = useState('');
    const [password, setPassword] = useState('');
    const [contents, setContents] = useState('');
    const [writerError, setwriterError] = useState('');
    const [passwordError, setPassworError] = useState('');
    const [contentsError, setcontentsError] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(3);
    const params = useParams();
    const [댓글생성함수] = useMutation(FETCH_BOARD_CREATE_COMMENT);

    let onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWriter(event.target.value);
        if (event.target.value === '') {
            setwriterError('필수입력 사항 입니다');
        } else {
            setwriterError('');
        }

        if (writer !== '' && password !== '' && contents !== '') {
            setIsActive(true);
        }
    };

    let onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if (event.target.value === '') {
            setPassworError('필수입력 사항 입니다');
        } else {
            setPassworError('');
        }

        if (writer !== '' && password !== '' && contents !== '') {
            setIsActive(true);
        }
    };

    let onChangeContents = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value);
        if (event.target.value === '') {
            setcontentsError('필수입력 사항 입니다');
        } else {
            setcontentsError('');
        }

        if (writer !== '' && password !== '' && contents !== '') {
            setIsActive(true);
        }
    };

    const onClickCommentButton = async () => {
        try {
            const { data } = await 댓글생성함수({
                variables: {
                    boardId: String(params.boardId),
                    createBoardCommentInput: {
                        writer: writer,
                        password: password,
                        contents: contents,
                        rating: 0,
                    },
                    refetchQueries: [
                        {
                            query: FETCH_BOARD_CREATE_COMMENT,
                            variables: {
                                boardId: String(params.boardId),
                            },
                        },
                    ],
                },
            });
            console.log('data ::', data);
            if (data?.createBoardComment) {
                setWriter(''); // 작성자 초기화
                setPassword(''); // 비밀번호 초기화
                setContents(''); // 내용 초기화
                setValue(1);
                setIsActive(false); // 버튼 비활성화
                alert('댓글 등록이 완료 되었습니다!');
            } else {
                alert('댓글 등록이 실패했는데요?!');
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                            작성자<span className="text-red-500">*</span>
                        </div>

                        <input
                            type="text"
                            placeholder="작성자 명을 입력해 주세요."
                            className={styles.inputWriter}
                            onChange={onChangeWriter}
                            value={writer}
                        />
                        <div className={styles.requiedMention}>
                            {writerError}
                        </div>
                    </div>
                    <div className={styles.inputBoxPasswordBox}>
                        <div className={styles.inputBoxPassword}>
                            비밀번호<span className="text-red-500">*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="비밀번호를 입력해 주세요."
                            className={styles.inputPassword}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <div className={styles.requiedMention}>
                            {passwordError}
                        </div>
                    </div>
                </div>
                <div className={styles.inputTextareaBox}>
                    <textarea
                        className={styles.comment}
                        placeholder="댓글을 입력해주세요."
                        onChange={onChangeContents}
                        value={contents}
                    ></textarea>
                    <div className={styles.requiedMention}>{contentsError}</div>
                    <div className={styles.commentBoxButton}>
                        <button
                            className={styles.regiCommentButton}
                            onClick={() => onClickCommentButton()}
                            style={{
                                color: '#fff',
                                backgroundColor:
                                    isActive === true
                                        ? 'blue'
                                        : 'var(--gray-300, #c7c7c7)',
                            }}
                        >
                            댓글등록
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
