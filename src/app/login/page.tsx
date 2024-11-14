'use client';

import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import Image from 'next/image';

export default function Login() {
    const router = useRouter();

    const onClickSignUpPage = () => {
        router.push('/signup');
    };

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.loginBox}>
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={120}
                        height={80}
                    />
                    <div className={styles.mainTitle}>
                        축구하자에 오신걸 환영합니다
                    </div>
                    <div className={styles.subTitle}>
                        트립트립에 로그인 하세요
                    </div>
                    <input type="text" placeholder="이메일을 입력하세요" />
                    <input type="text" placeholder="비밀번호를 입력하세요" />
                    <button className={styles.loginBtn}>로그인</button>
                    <button
                        className={styles.signBtn}
                        onClick={onClickSignUpPage}
                    >
                        회원가입
                    </button>
                </div>
                <div className={styles.loginImage}>
                    <Image
                        src="/images/login.png"
                        alt="로그인 이미지"
                        width={1820}
                        height={1080}
                    />
                </div>
            </div>
        </>
    );
}
