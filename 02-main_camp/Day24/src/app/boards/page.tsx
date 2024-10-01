"use client"
import styles from './styles.module.css';
import Board from '@/app/boards/components/Board';
import BoardHeader from './components/BoardHeader';
import { gql, useQuery } from '@apollo/client';

const FETCH_BOARDS = gql`
    query {
        fetchBoards {
            _id
            writer
            title
            createdAt
        }
    }
`;

const BoardsPage = () => {
    const { data } = useQuery(FETCH_BOARDS);
    console.log(data?.fetchBoards)

    return(
        <div className={styles.boards_RootContainer}>
            <main className={styles.boards_MainContainer}>
                <BoardHeader />
                <ul className={styles.boards_ul}>
                    {data?.fetchBoards.map((el: any, index: number) => <Board key={el._id} id={el._id} index={index + 1} title={el.title} writer={el.writer}/>)}
                </ul>
            </main>
        </div>
    );
}

export default BoardsPage