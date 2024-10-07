'use client';

import { FETCH_BOARD } from '@/app/graphql/fetchBoard';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import BoardsDetail from '@/components/boardsDetail';

import styles from '@/components/boardsDetail/styles.module.css';
import Link from 'next/link';

export default function BoardsDetailPage() {
    const { boardId } = useParams();
    const router = useRouter();

    const { data, loading, error } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: boardId,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { fetchBoard } = data;

    const handleOnClickList = () => {
        console.log('boards list');
        router.replace('/boards/');
    };

    return (
        <>
            <BoardsDetail
                title={fetchBoard.title}
                writer={fetchBoard.writer}
                createdAt={fetchBoard.createAt}
                contents={fetchBoard.contents}
            />
            <div className={styles.buttonWrapper}>
                <button
                    type="button"
                    className={styles.listBtn}
                    onClick={handleOnClickList}
                >
                    목록으로
                </button>
                <Link href={`/boards/${boardId}/edit`}>
                    <button type="button" className={styles.editBtn}>
                        수정하기
                    </button>
                </Link>
            </div>
        </>
    );
}
