'use client';

import { DELETE_BOARD } from '@/app/graphql/deleteBoard';
import { FETCH_BOARDS } from '@/app/graphql/fetchBoards';
import { useMutation, useQuery } from '@apollo/client';
import styles from './styles.module.css';
import Image from 'next/image';
import { getDate } from '@/commons/units/date';
import { useRouter } from 'next/navigation';

export default function BoardsList(): JSX.Element {
    const router = useRouter();

    const { data, loading, error } = useQuery(FETCH_BOARDS);
    const [deleteBoard] = useMutation(DELETE_BOARD);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const handleOnClick = (_id: string) => {
        router.push(`/boards/${_id}`);
    };

    const handleOnClickDelete = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        try {
            await deleteBoard({
                variables: {
                    boardId: String(e.currentTarget.id),
                },
                optimisticResponse: {
                    deleteBoard: true,
                },
                update: (cache) => {
                    const data: any = cache.readQuery({ query: FETCH_BOARDS });
                    if (data?.fetchBoards) {
                        const updateBoards = data.fetchBoards.filter(
                            (board: { _id: string }) =>
                                board._id !== e.currentTarget.id
                        );

                        cache.writeQuery({
                            query: FETCH_BOARDS,
                            data: { fetchBoards: updateBoards },
                        });
                    }
                },
                refetchQueries: [{ query: FETCH_BOARDS }],
            });
            console.log('삭제 성공');
        } catch (error) {
            console.log('삭제오류', error);
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.Body}>
                <div className={styles.listBox}>
                    <header className={styles.header}>
                        <span className={styles.headerItem}>번호</span>
                        <span className={styles.headerItem}>제목</span>
                        <span className={styles.headerItem}>작성자</span>
                        <span className={styles.headerItem}>날짜</span>
                        <span className={styles.headerItem}>삭제</span>
                    </header>
                    {data?.fetchBoards.map((el) => {
                        return (
                            <div
                                key={el._id}
                                className={styles.wrapper}
                                onClick={() => handleOnClick(el._id)}
                            >
                                <span className={styles.listItem}>
                                    {el._id}
                                </span>
                                <span className={styles.listItem}>
                                    {el.title}
                                </span>
                                <span className={styles.listItem}>
                                    {el.writer}
                                </span>
                                <span className={styles.listItem}>
                                    {getDate(el.createdAt)}
                                </span>

                                <span>
                                    <button
                                        id={el._id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOnClickDelete(e);
                                        }}
                                    >
                                        <Image
                                            src="/images/deleteIcon.png"
                                            alt="delete"
                                            className={styles.deleteBtn}
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
