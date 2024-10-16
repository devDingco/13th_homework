import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './styles.module.css';

export default function Header() {
    const router = useRouter();

    const handleOnClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        router.push('/');
    };

    const handleOnClickNav = () => {
        router.push('../../boards/new');
    };

    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.logoArea} onClick={handleOnClick}>
                    <Image
                        className={styles.logo}
                        src="/images/helloLogo.png"
                        alt="안녕"
                        width={0}
                        height={0}
                    />
                </div>
                <div className={styles.headerNav}>
                    <span>세계속으로</span>
                    <span onClick={handleOnClickNav}>자랑하기</span>
                    <span>로컬맛집공유해요</span>
                    <span>집주인에게 속닥속닥</span>
                </div>
            </div>
            <div className={styles.signContainer}>
                <button className={styles.loggInBtn}>로그인</button>
                <button className={styles.signBtn}>회원가입</button>
            </div>
        </>
    );
}
