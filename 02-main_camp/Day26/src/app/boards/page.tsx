"use client"
import styles from './styles.module.css';
import { useQuery } from '@apollo/client';
import Board from '@/app/boards/components/Board';
import BoardsHeader from '@/app/boards/components/BoardsHeader';
import { FETCH_BOARDS } from '@/commons/graphql/backend-api';

const BoardsPage = () => {
    const { data } = useQuery(FETCH_BOARDS);
    console.log(data?.fetchBoards)

    return(
        <div className={styles.boards_RootContainer}>
            <main className={styles.boards_MainContainer}>
                <BoardsHeader />
                <ul className={styles.boards_ul}>
                    {data?.fetchBoards.map((el: any, index: number) => <Board key={el._id} id={el._id} index={index + 1} title={el.title} writer={el.writer}/>)}
                </ul>
            </main>
        </div>
    );
}

export default BoardsPage