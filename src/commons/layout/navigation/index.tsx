'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

export default function LayoutNavigation() {
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

                    <div className={styles.homeLoginButtonBox}>
                        <button className={styles.homeLoginButton}>
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
                </div>
            </div>
        </>
    );
}
