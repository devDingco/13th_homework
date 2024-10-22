'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { useBoardDetail } from './hook';
import BoardsComponentComment from '../comments-write';

export default function BoardsComponentDetail() {
    const { 날짜담는통, data, onClickMoveBoardList, onClickMoveEditPage } =
        useBoardDetail();

    return (
        <>
            <div className={styles.layout}>
                <div>
                    <div className={styles.header}>
                        <div className={styles.headertitle}>
                            {data?.fetchBoard?.title}
                        </div>
                        <div className={styles.headerdetail}>
                            <div className={styles.headerdetailname}>
                                {data?.fetchBoard?.writer}
                            </div>
                            <div className={styles.headerdetaildate}>
                                {날짜담는통}
                            </div>
                        </div>
                    </div>

                    <hr className={styles.detailhr} />

                    <div className={styles.main}>
                        <div className={styles.mainlinklocation}>
                            <Image
                                src="/images/list.png"
                                alt="link"
                                width={24}
                                height={24}
                            ></Image>
                            <Image
                                src="/images/location.png"
                                alt="location"
                                width={24}
                                height={24}
                            ></Image>
                        </div>
                        <div className={styles.mainPhotoBox}>
                            <Image
                                className={styles.mainPhoto}
                                alt="mainphoto"
                                src="/images/beach.png"
                                width={400}
                                height={531}
                                // layout="responsive"
                            ></Image>
                            <div>{data?.fetchBoard?.contents}</div>
                        </div>
                    </div>
                    <div className={styles.video}>
                        <Image
                            src="/images/fake_video.png"
                            alt="fake_video"
                            width={822}
                            height={464}
                        ></Image>
                    </div>
                    <div className={styles.videofeedback}>
                        <Image
                            src="/images/broken_heart.png"
                            alt="videofeedback"
                            width={24}
                            height={24}
                        ></Image>
                        <Image
                            src="/images/heart.png"
                            alt="heart"
                            width={24}
                            height={24}
                        ></Image>
                    </div>
                    <div
                        className={styles.bottombutton}
                        // onClick={onClickMoveBoardList}
                    >
                        <button
                            className={styles.listbutton}
                            onClick={onClickMoveBoardList}
                        >
                            <Image
                                src="/assets/list.png"
                                alt="list"
                                className={styles.listImage}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    objectFit: 'cover',
                                }}
                                width={17}
                                height={17}
                            ></Image>
                            목록으로
                        </button>
                        <button
                            className={styles.penbutton}
                            onClick={onClickMoveEditPage}
                        >
                            <Image
                                src="/assets/pen.png"
                                alt="pen"
                                className={styles.penImage}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    objectFit: 'cover',
                                }}
                                width={24}
                                height={24}
                            ></Image>
                            수정하기
                        </button>
                    </div>
                </div>
                {/* <BoardsComponentComment /> */}
            </div>
        </>
    );
}
