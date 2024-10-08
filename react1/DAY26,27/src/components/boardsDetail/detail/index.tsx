'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { getDate } from '@/commons/units/date';
import { useBoardsDetail } from './hook';
import Link from 'next/link';

export default function BoardsDetailUI(): JSX.Element {
    const { boardId, data, loading, error, handleOnClickList } =
        useBoardsDetail();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { fetchBoard } = data;
    return (
        <>
            <div className={styles.layout}>
                <div className={styles.detailMain}>
                    <div className={styles.title}>{fetchBoard.title}</div>
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
                                    {fetchBoard.writer}
                                </div>
                            </div>

                            <div className={styles.date}>
                                {getDate(fetchBoard.createdAt)}
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
                            <Image
                                src="/images/mapIcon.png"
                                alt="위치"
                                className={styles.mapIcon}
                                width={0}
                                height={0}
                            />
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
                            {fetchBoard.contents}
                        </article>
                        <article className={styles.playArea}>
                            <Image
                                src="/images/playBg.png"
                                alt="플레이영상"
                                className={styles.playImg}
                                width={822}
                                height={464}
                            />
                        </article>
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
        </>
    );
}
