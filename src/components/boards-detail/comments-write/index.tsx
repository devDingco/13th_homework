'use client';
import styles from './styles.module.css';
import { useState } from 'react';
import { Rate } from 'antd';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

// 댓글작성 쿼리
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

// 댓글 조회 쿼리
export const FETCH_BOARD_COMMENTS = gql`
    query fetchBoardComments($page: Int, $boardId: ID!) {
        fetchBoardComments(page: $page, boardId: $boardId) {
            _id
            writer
            contents
            rating
            createdAt
        }
    }
`;

// 댓글 수정 쿼리
export const UPDATE_BOARD_COMMENTS = gql`
    mutation updateBoardComment(
        $updateBoardCommentInput: UpdateBoardCommentInput!
        $password: String
        $boardCommentId: ID!
    ) {
        updateBoardComment(
            updateBoardCommentInput: $updateBoardCommentInput
            password: $password
            boardCommentId: $boardCommentId
        ) {
            _id
        }
    }
`;

export default function BoardsComponentComment(props) {
    const { isEdit, commentData, finishEdit } = props;

    console.log(commentData);

    // console.log(props.el);
    const [writer, setWriter] = useState('');
    const [editWriter, setEditWriter] = useState('');
    const [title, setTitle] = useState('');
    const [editTtile, setEditTitle] = useState('');
    const [password, setPassword] = useState('');
    const [contents, setContents] = useState('');
    const [writerError, setwriterError] = useState('');
    const [passwordError, setPassworError] = useState('');
    const [contentsError, setcontentsError] = useState('');

    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(3);

    const [댓글생성함수] = useMutation(FETCH_BOARD_CREATE_COMMENT);
    const [댓글수정함수] = useMutation(UPDATE_BOARD_COMMENTS);
    const router = useRouter();
    const params = useParams();

    const onClickCancle = () => {
        router.refresh();
    };

    const onClickUpdateComment = async () => {
        const 입력받은비밀번호 = prompt('작성하셨던 비밀번호를 입력하세요');
        const myvariables = {
            password: 입력받은비밀번호,
            boardCommentId: String(commentData._id),

            updateBoardCommentInput: {},
        };
        if (contents) myvariables.updateBoardCommentInput.contents = contents;

        try {
            const result = await 댓글수정함수({
                variables: myvariables,
                refetchQueries: [
                    {
                        query: FETCH_BOARD_COMMENTS,
                        variables: { boardId: String(params.boardId) },
                    },
                ],
            });
            console.log('댓글수정함수 ::', result);
            if (result.errors) throw new Error('사용자 비밀번호 입력값 불일치');
            alert('수정이 완료 되었습니다');
            if (finishEdit) {
                finishEdit(); // 수정 모드 종료
            }
        } catch (error) {
            alert('기존 비밀번호와 맞지않아요 ㅜㅜ');
            console.log('error');
        }
    };

    const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const onChangeContents = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const onClickCommentButton = async (event: any) => {
        try {
            const result = await 댓글생성함수({
                variables: {
                    boardId: String(params.boardId),
                    createBoardCommentInput: {
                        writer: writer,
                        password: password,
                        contents: contents,
                        rating: 0,
                    },
                },
            });
            console.log('댓글생성함수 ::', result);
            if (result?.data.createBoardComment._id) {
                setWriter(''); // 작성자 초기화
                setPassword(''); // 비밀번호 초기화
                setContents(''); // 내용 초기화
                setValue(1);
                setIsActive(false); // 버튼 비활성화
                alert('댓글 등록이 완료 되었습니다!');
                router.refresh(); // 페이지 새로고침
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
