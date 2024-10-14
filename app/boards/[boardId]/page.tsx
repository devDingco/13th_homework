'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { gql, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';

export default function BoardsDetail() {
    // 날짜
    const date = new Date();
    const options = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate().toString().padStart(2, '0'),
    };

    const 날짜담는통 = options.year + '.' + options.month + '.' + options.date;

    const FETCH_BOARD = gql`
        query fetchBoard($boardId: ID!) {
            fetchBoard(boardId: $boardId) {
                _id
                writer
                title
                contents
                youtubeUrl
                likeCount
                dislikeCount
            }
        }
    `;

    const params = useParams();
    const router = useRouter();

    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: String(params.boardId),
        },
    });

    const onClickMoveBoardList = () => {
        router.push('/boards');
    };

    const onClickMoveEditPage = () => {
        alert('응 시진핑');
        router.push(`/boards/${params.boardId}/edit`);
    };

    return (
        <>
            <div className={styles.layout}>
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
                            src="/assets/list.png"
                            alt="link"
                            width={24}
                            height={24}
                        ></Image>
                        <Image
                            src="/assets/location.png"
                            alt="location"
                            width={24}
                            height={24}
                        ></Image>
                    </div>
                    <div className={styles.mainPhotoBox}>
                        <Image
                            className={styles.mainPhoto}
                            alt="mainphoto"
                            src="/assets/beach.png"
                            width={400}
                            height={531}
                            // layout="responsive"
                        ></Image>
                        <div>{data?.fetchBoard?.contents}</div>
                    </div>
                </div>
                <div className={styles.video}>
                    <Image
                        src="/assets/fake_video.png"
                        alt="fake_video"
                        width={822}
                        height={464}
                    ></Image>
                </div>
                <div className={styles.videofeedback}>
                    <Image
                        src="/assets/broken_heart.png"
                        alt="videofeedback"
                        width={24}
                        height={24}
                    ></Image>
                    <Image
                        src="/assets/heart.png"
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
        </>
    );
}
