'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import styles from './styles.module.css';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

const FETCH_BOARDS = gql`
    query {
        fetchBoards {
            _id
            writer
            title
            contents
            createdAt
        }
    }
`;

const FETCH_BOARD = gql`
    query fetchBoard($mynumber: ID!) {
        fetchBoard(boardId: $mynumber) {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
        }
    }
`;

const DELETE_BOARD = gql`
    mutation deleteBoard($mynumber: ID!) {
        deleteBoard(boardId: $mynumber)
    }
`;

export default function BoardList(props: any) {
    const router = useRouter();
    const params = useParams();

    const { data } = useQuery(FETCH_BOARDS, {
        variables: {
            mynumber: params.boardId,
        },
    });

    // const { mutation_data } = useQuery(FETCH_BOARDS, {
    //     variables: {
    //         mynumber: params.boardId,
    //     },
    // });

    const onClickMoveToDetailPage = async (event) => {
        // router.push(`/boards/${data.fetchBoards._id}`);
        alert('자리 옮겨여');
    };

    const [삭제함수이름] = useMutation(DELETE_BOARD);

    const onClickDelete = (event) => {
        event.stopPropagation();
        삭제함수이름({
            variables: {
                mynumber: event.target.id,
            },
            refetchQueries: [{ query: FETCH_BOARDS }],
        });
        alert('삭제버튼을 눌렀군요');
    };

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.titleBox}>
                    <div className={styles.titleBoxNumber}>번호</div>
                    <div className={styles.titleBoxTitle}>제목</div>
                    <div className={styles.titleBoxWrite}>작성자</div>
                    <div className={styles.titleBoxDate}>날짜</div>
                </div>

                {data?.fetchBoards && data.fetchBoards.length > 0 ? (
                    data.fetchBoards.map((el: any, index: any) => (
                        <button
                            className={styles.boardListBox}
                            key={el._id}
                            onClick={onClickMoveToDetailPage}
                        >
                            <div className={styles.boardListBoxNumber}>
                                {index + 1}
                            </div>
                            <div className={styles.boardListBoxTitle}>
                                {el.title}
                            </div>
                            <div className={styles.boardListBoxWrite}>
                                {el.writer}
                            </div>
                            {/* <div>{ el.creactAt}</div> */}
                            <div className={styles.BoardListBoxDelete}>
                                <Image
                                    src="/assets/delete.png"
                                    alt="deleteImage"
                                    width={24}
                                    height={24}
                                    id={el._id}
                                    onClick={onClickDelete}
                                ></Image>
                            </div>
                        </button>
                    ))
                ) : (
                    <div>게시글이 없당!</div>
                )}
            </div>
        </>
    );
}
