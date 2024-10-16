'use client';

import { useAppContext } from '@/contexts/AppContext';
import { BoardData } from '@/app/types/IBoarData';
import Image from 'next/image';
import styles from './styles.module.css';
import { getDate } from '@/commons/units/date';
import { useBoardsDetail } from './hook';
import Link from 'next/link';
import CommentWriteUI from '../commentWrite/index';
import CommentListUI from '../commentList/index';
import Address from '@/components/address/page';

interface IBoardsDetailUIProps {
    data: BoardData;
}

export default function BoardsDetailUI({
    data,
}: IBoardsDetailUIProps): JSX.Element {
    const { boardId } = useAppContext();
    console.log('나 여기있어요', boardId);

    const { loading, error, handleOnClickList } = useBoardsDetail();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!data) {
        return <p>다시 하라한다</p>;
    }
    return (
        <>
            <div className={styles.layout}>
                <div className={styles.detailMain}>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.profile}>
                        <div className={styles.userProfile}>
                            <div className={styles.left}>
                                <Image
                                    src="/images/userIcon.png"
                                    alt="profile"
                                    className={styles.userIcon}
                                    width={0}
                                    height={0}
                                />
                                <div className={styles.userName}>
                                    {data.writer}
                                </div>
                            </div>

                            <div className={styles.date}>
                                {getDate(data.createdAt)}
                            </div>
                        </div>
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/images/linkIcon.png"
                                alt="링크"
                                className={styles.linkIcon}
                                width={0}
                                height={0}
                            />

                            <Address />
                        </div>
                    </div>

                    <section className={styles.section}>
                        <div className={styles.contentImg}>
                            <Image
                                src="/images/beach.png"
                                alt="beachImage"
                                width={400}
                                height={531}
                            />
                        </div>
                        <article className={styles.contentText}>
                            {data.contents}
                        </article>
                        <article className={styles.playArea}></article>
                        <article className={styles.likeCount}>
                            <div className={styles.icon}>
                                <Image
                                    src="/images/breakHeart.png"
                                    alt="삐빅"
                                    width={24}
                                    height={24}
                                />
                                <div>0</div>
                            </div>
                            <div className={styles.icon}>
                                <Image
                                    src="/images/likeHeart.png"
                                    alt="좋다"
                                    width={24}
                                    height={24}
                                />
                                <div>12</div>
                            </div>
                        </article>
                    </section>

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
                </div>
            </div>
            <CommentWriteUI />
            <CommentListUI />
        </>
    );
}
