'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import { useAccessTokenStore } from '@/commons/store/access-store';

const FETCH_USER_LOGGED_IN = gql`
    query fetchUserLoggedIn {
        fetchUserLoggedIn {
            _id
            email
            name
        }
    }
`;

export default function LayoutNavigation() {
    const { data } = useQuery(FETCH_USER_LOGGED_IN);
    console.log('FETCH_USER_LOGGED_IN :::', data);
    // Zustand

    const router = useRouter();

    const onClickLoginPage = () => {
        router.push('/login');
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
                        <div>트립토크</div>
                        <div>숙박권 구매</div>
                        <div>마이 페이지</div>
                    </div>

                    {data === 'undefined' ? (
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
                        <div className={styles.homeLoginbox}>
                            <Image
                                src="/images/header_default_profile.png"
                                alt="로그인_기본로고"
                                width={40}
                                height={40}
                            ></Image>
                            <div>{data?.fetchUserLoggedIn.name}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
