"use client";
import styles from './styles.module.css';


interface IBoard {
    index: number
    writer: string
    title: string
    // createdAt: string;
};

const Board = ({index, title, writer}: IBoard) => {
    const onClickBoard = () => {
        console.log("하이루")
    }
    
    return(
        <>
            <li className={styles.board} onClick={onClickBoard}>
                <p className={styles.board_number}>{index}</p>                
                <p className={styles.board_title}>{title}</p>
                <p className={styles.board_writer}>{writer}</p>
                <p className={styles.board_date}>2024.04.01</p>             
                <img src="/assets/delete.png" className={styles.board_deleteImg}/>
            </li>
            
        </>
        
    );
}

export default Board

