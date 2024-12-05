'use client';

import styles from './styles.module.css';
import Footer from '../../commons/layout/header/footer';
import Image from 'next/image';

import location from '/public/images/Location.png';
import profile from '/public/images/my-setting.png';
import plus from '/public/images/plus.png';
import { useRouter } from 'next/navigation';

export default function ListPage() {
    const isFixed = true;

    const router = useRouter();

    const onclickNewPage = (e) => {
        router.push('/soloplace-logs/new');
        console.log('온클릭');
    };

    return (
        <div className={styles.contianer}>
            <div className={styles.layout}>
                {/* 프로팅버튼 */}
                <button className={styles.floatingBtn} onClick={onclickNewPage}>
                    <Image src={plus} alt="plus" />
                </button>

                <div className={styles.emptyBox}>
                    등록된 플레이스가 없는데요
                </div>

                {/* 푸터 */}
                <Footer isFixed={isFixed}>
                    <div className={styles.footerBox}>
                        <button className={styles.footerBoxLocation}>
                            <Image src={location} alt="location" />
                            <div>플레이스</div>
                        </button>
                        <button>
                            <Image src={profile} alt="profile" />
                        </button>
                    </div>
                </Footer>
            </div>
        </div>
    );
}
