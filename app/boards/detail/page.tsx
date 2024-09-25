'use client';
import Image from 'next/image';
import styles from './styles.module.css';

const BoardsDetail = () => {
    // 날짜
    const date = new Date();
    const options = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate().toString().padStart(2, '0'),
    };

    const 날짜담는통 = options.year + '.' + options.month + '.' + options.date;

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.header}>
                    <div className={styles.headertitle}>
                        응? 무슨 게시글할지 아직모름~~
                    </div>
                    <div className={styles.headerdetail}>
                        <div className={styles.headerdetailname}>장화현</div>
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

                    <Image
                        className={styles.mainphoto}
                        alt="mainphoto"
                        src="/assets/running.jpg"
                        width={1280}
                        height={512}
                    ></Image>
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
                <div className={styles.bottombutton}>
                    <button className={styles.listbutton}>
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
                    <button className={styles.penbutton}>
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
};

export default BoardsDetail;
