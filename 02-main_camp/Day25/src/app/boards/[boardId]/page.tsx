"use client";
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation'
import styles from './styles.module.css';
import { Divider } from '@/app/components/boards/Boards-write';
import { FETCH_BOARD } from '@/commons/graphql/backend-api';

const BoardsDetail = () => {
    const router = useRouter()
    const params = useParams()
    console.log(params.boardId)

    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: params.boardId
        }
    })

    const title = data?.fetchBoard.title
    const writer = data?.fetchBoard.writer
    const contents = data?.fetchBoard.contents

    const onClickEditButton = () => {
        router.push(`/boards/${params.boardId}/edit`)
    }

    const onClickShowBoards = () => {
        router.push("/boards")
    }
    
    return (
        <div className={styles.BoardsDetail_root}>
            <header className={styles.BoardsDetail_header}>{title}</header>
            <div className={styles.BoardsDetail_userForm_and_sideButton}>
                <div className={styles.BoardsDetail_userForm}>
                    <div className={styles.profileName}>
                        <img className={styles.profileImg} src="/assets/profile.png"/>{writer}
                    </div>
                    <div className={styles.postDate}>2024.11.11</div>
                </div>
                <Divider />
                <section className={styles.BoardsDetail_userForm_sideButton_section}>
                    <button className={styles.BoardsDetail_userForm_sideButton}><img src="/assets/link.png" /></button>
                    <button className={styles.BoardsDetail_userForm_sideButton}><img src="/assets/location.png" /></button>
                </section>
            </div>
            <article className={styles.BoardsDetail_article}>
                    <figure><img src="/assets/boards_main_img.png" /></figure>
                    <p className={styles.BoardsDetail_p}>
                        {contents}
                    </p>
            </article>
            <section className={styles.BoardsDetail_video_section}><img src="/assets/video.png"/></section>
            <section className={styles.BoardsDetail_heartButton_list_section}>
                    <div className={styles.BoardsDetail_heartBreak_button}><img src="/assets/heartBreak.png"/>24</div>
                    <div className={styles.BoardsDetail_heart_button}><img src="/assets/heart.png" />12</div>
            </section>
            <footer className={styles.BoardsDetail_footer}>
                <button className={styles.BoardsDetail_footer_button} onClick={onClickShowBoards}><img src="/assets/list.png"/>목록으로</button>
                <button className={styles.BoardsDetail_footer_button} onClick={onClickEditButton}><img src="/assets/edit.png" />수정하기</button>
            </footer>
        </div>
    );
}

export default BoardsDetail