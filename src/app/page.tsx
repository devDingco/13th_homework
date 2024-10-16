'use client';
import Image from 'next/image';
import styles from './styles.module.css';

export default function Home() {
    return (
        <div className={styles.layout}>
            <div className={styles.homeHeader}>
                <div className={styles.homeHeaderLeft}>
                    <Image
                        src="/assets/logo.png"
                        alt="link"
                        width={56}
                        height={32}
                    ></Image>
                    <div>트립토크</div>
                    <div>숙박권 구매</div>
                    <div>마이 페이지</div>
                </div>

                <div className={styles.homeLoginButtonBox}>
                    <button className={styles.homeLoginButton}>
                        <div className="textLogin">로그인</div>
                        <Image
                            src="/assets/arrow_right.png"
                            alt="로고"
                            width={9}
                            height={19}
                        ></Image>
                    </button>
                </div>
            </div>

            <div className="carousel"></div>
            <div className="tripTalk">
                <h1>오늘의 핫한 트립토크</h1>
            </div>
            <div className="tripTalkBoard">
                <h1>트립토크 게시판</h1>
            </div>
        </div>
    );
}
