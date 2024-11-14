'use client';

import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { useAccessTokenStore } from '@/commons/store/access-store';
import { useState } from 'react';

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            accessToken
        }
    }
`;

export default function Login() {
    const router = useRouter();
    const [loginUser] = useMutation(LOGIN_USER);
    const { setAccessToken } = useAccessTokenStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onClickSignUpPage = () => {
        router.push('/signup');
    };

    const onClickLogin = async () => {
        // 1. 로그인 뮤테이션날려서 accessToken 받아오기
        const result = await loginUser({
            variables: {
                email: email,
                password: password,
            },
        });

        const accessToken = result.data.loginUser.accessToken;
        console.log(accessToken);

        // 2. 받아온 accessToken을 globalState(Zustand)에 저장하기;
        if (accessToken === undefined) {
            alert('로그인의 실패함 -> 다시해봐');
        }
        setAccessToken(accessToken); // 토큰저장
        // localStorage.setItem('accessToken', accessToken); //더 이상 사용하지 않음 (refreshToken으로 사용)

        alert('이제 축구를 시작하시죠');
        // 3. 로그인 성공페이지로 이동하기
        router.push('/');
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
                    <button className={styles.loginBtn} onClick={onClickLogin}>
                        로그인
                    </button>
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
