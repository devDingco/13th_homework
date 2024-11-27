'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Modal } from 'antd';

// 회원가입
const CREATE_USER = gql`
    mutation createUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            _id
            email
            name
        }
    }
`;

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [loginUser] = useMutation(CREATE_USER);

    const onChangeEmail = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);

        // 이메일 형식 확인을 위한 정규 표현식
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeConfirmPassword = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        if (password !== confirmPassword) {
            alert('비밀번호가 틀려요 자식아');
        }
    };

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onClickSignUp = async () => {
        try {
            const result = await loginUser({
                variables: {
                    createUserInput: {
                        email: email,
                        name: name,
                        password: password,
                    },
                },
            });
            alert('회원가입을 축하합니당!');
            router.push('/');
        } catch (err) {
            alert(err);
        }
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
                    <div className={styles.mainTitle}>회원가입</div>
                    <div className={styles.subTitle}>
                        회원가입을 위해 아래 빈칸을 모두 채워 주세요
                    </div>

                    <div className={styles.inputBox}>
                        <div className={styles.inputTitle}>
                            이메일 <div className={styles.star}>*</div>
                        </div>
                        <input
                            type="text"
                            placeholder="이메일을 입력하세요"
                            onChange={onChangeEmail}
                        />

                        <div className={styles.inputTitle}>
                            이름<div className={styles.star}>*</div>
                        </div>
                        <input
                            type="text"
                            placeholder="이름을 입력하세요"
                            onChange={onChangeName}
                        />
                        <div className={styles.inputTitle}>
                            비밀번호<div className={styles.star}>*</div>
                        </div>
                        <input
                            type="text"
                            placeholder="비밀번호를 입력하세요"
                            onChange={onChangePassword}
                        />
                        <div className={styles.inputTitle}>
                            비밀번호 확인<div className={styles.star}>*</div>
                        </div>
                        <input
                            type="text"
                            placeholder="비밀번호를 한번 더 입력하세요"
                            // onChange={onChangeConfirmPassword}
                        />
                    </div>

                    <button className={styles.loginBtn} onClick={onClickSignUp}>
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
