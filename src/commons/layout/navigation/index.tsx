'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAccessTokenStore } from '@/commons/store/access-store';
import { useState } from 'react';

const FETCH_USER_LOGGED_IN = gql`
    query fetchUserLoggedIn {
        fetchUserLoggedIn {
            email
            name
        }
    }
`;

const FETCH_USER_LOGOUT = gql`
    mutation logoutUser {
        logoutUser
    }
`;

export default function LayoutNavigation() {
    const { data } = useQuery(FETCH_USER_LOGGED_IN);
    const [로그아웃] = useMutation(FETCH_USER_LOGOUT);
    // console.log('FETCH_USER_LOGGED_IN :::', data);

    const router = useRouter();

    const onClickLoginPage = () => {
        router.push('/login');
    };

    // 큰흐름은 로그인 여부 스테이트를 전역으로 만들고 data값이 바뀔 때를 리렌더 되게 유도하여 로그아웃페이지를 설계한다
    // Zustand로 로그인 불린 여부를 주고 로그아웃 핸들러에 로그인 불린(false)를 주자

    const onClickLogOut = async () => {
        await 로그아웃()
            .then((response) => {
                // 로그아웃 성공 시 처리
                alert('로그아웃이 성공적으로 처리 되었습니다');
                // window.location.reload();
                // router.push('/');
            })
            .catch((error) => {
                // 에러 처리
                alert(error.message);
            });
    };

    const [isTripTalkActive, setIsTripTalkActive] = useState(false);
    const [isVoucherActive, setIsVoucherActive] = useState(false);
    const [isMyActive, setIsMyActive] = useState(false);

    const onClickNavi = (event) => {
        const id = event.target.id;

        if (id === '1') {
            setIsTripTalkActive((prev) => !prev);
            setIsVoucherActive(false);
            setIsMyActive(false);
            router.push('/triptalk');
        } else if (id === '2') {
            setIsVoucherActive((prev) => !prev);
            setIsTripTalkActive(false);
            setIsMyActive(false);
            router.push('/voucher');
        } else if (id === '3') {
            setIsMyActive((prev) => !prev);
            setIsTripTalkActive(false);
            setIsVoucherActive(false);
            router.push('/mypage');
        }
    };

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.homeHeader}>
                    <div className={styles.homeHeaderLeft}>
                        <Image
                            src="/images/logo.png"
                            alt="link"
                            width={56}
                            height={32}
                        ></Image>
                        <div
                            id="1"
                            className={`${styles.homeHeaderLeftTitle} ${
                                isTripTalkActive ? styles.active : ''
                            }`}
                            onClick={onClickNavi}
                        >
                            트립토크
                        </div>
                        <div
                            id="2"
                            className={`${styles.homeHeaderLeftTitle} ${
                                isVoucherActive ? styles.active : ''
                            }`}
                            onClick={onClickNavi}
                        >
                            숙박권 구매
                        </div>
                        <div
                            id="3"
                            className={`${styles.homeHeaderLeftTitle} ${
                                isMyActive ? styles.active : ''
                            }`}
                            onClick={onClickNavi}
                        >
                            마이 페이지
                        </div>
                    </div>

                    {data === undefined ? ( // 문자열 undefined가 아니네?
                        <div className={styles.homeLogoutButtonBox}>
                            <button className={styles.homeLogoutButton}>
                                <div
                                    className="textLogin"
                                    onClick={onClickLoginPage}
                                >
                                    Login
                                </div>
                                <Image
                                    src="/images/arrow_right.png"
                                    alt="로고"
                                    width={9}
                                    height={19}
                                ></Image>
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className={styles.homeLoginbox}>
                                <Image
                                    src="/images/header_default_profile.png"
                                    alt="로그인_기본로고"
                                    width={40}
                                    height={40}
                                ></Image>
                                <div>{data?.fetchUserLoggedIn.name}</div>
                                <button
                                    onClick={onClickLogOut}
                                    style={{ fontWeight: 'bold' }}
                                >
                                    로그아웃
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
