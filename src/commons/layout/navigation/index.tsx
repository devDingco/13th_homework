'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAccessTokenStore } from '@/commons/store/access-store';

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
    console.log('FETCH_USER_LOGGED_IN :::', data);

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
                        <div className={styles.homeHeaderLeftTitle}>
                            트립토크
                        </div>
                        <div className={styles.homeHeaderLeftTitle}>
                            숙박권 구매
                        </div>
                        <div className={styles.homeHeaderLeftTitle}>
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
