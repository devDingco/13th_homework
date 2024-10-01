"use client";
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';


interface IBoard {
    id: string
    index: number
    writer: string
    title: string
    // createdAt: string;
};

const Board = ({id, index, title, writer}: IBoard) => {
    const router = useRouter()

    const onClickBoard = () => {
        console.log("이동합니다~ 바이바이")
        router.push(`/boards/detail/${id}`)
    }

    return(
        <li className={styles.board} onClick={onClickBoard}>
            <p className={styles.board_number}>{index}</p>                
            <p className={styles.board_title}>{title}</p>
            <p className={styles.board_writer}>{writer}</p>
            <p className={styles.board_date}>2024.04.01</p>             
            <img src="/assets/delete.png" className={styles.board_deleteImg}/>
        </li>  
    );
}

export default Board

