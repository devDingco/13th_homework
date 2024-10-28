'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { useBoardDetail } from './hook';
import { Divider, Tooltip } from 'antd';
import ReactPlayer from 'react-player/youtube';

export default function BoardsComponentDetail() {
    const { 날짜담는통, data, onClickMoveBoardList, onClickMoveEditPage } =
        useBoardDetail();
    console.log(data?.fetchBoard);
    const text = <span>{data?.fetchBoard.boardAddress.address}</span>;

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
                            <Tooltip placement="bottom" title={text}>
                                <Image
                                    src="/images/location.png"
                                    alt="location"
                                    width={24}
                                    height={24}
                                ></Image>
                            </Tooltip>
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
                        {data?.fetchBoard.youtubeUrl &&
                        data?.fetchBoard.youtubeUrl.includes('youtube.com') ? (
                            <ReactPlayer
                                url={data.fetchBoard.youtubeUrl}
                                muted={true}
                            />
                        ) : (
                            <div>유튜브 주소를 다시 입력해 주세요 ㅠㅠ</div>
                        )}
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
                    <div className={styles.detailLayout}>
                        <button
                            className={styles.listbutton}
                            onClick={onClickMoveBoardList}
                        >
                            <Image
                                src="/images/list.png"
                                alt="list"
                                className={styles.listImage}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    objectFit: 'cover',
                                }}
                                width={15}
                                height={15}
                            ></Image>
                            목록으로
                        </button>
                        <button
                            className={styles.penbutton}
                            onClick={onClickMoveEditPage}
                        >
                            <Image
                                src="/images/pen.png"
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
