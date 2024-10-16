import styles from './styles.module.css';

export default function Footer() {
    return (
        <>
            <footer>
                <div className={styles.footerContainer}>
                    <div className={styles.footerContent}>
                        <h3>
                            주식회사 도봉산방구석 | 공동주인님:설추냥/꽃니미
                        </h3>
                        <p>
                            조공하는사람: <span>설미선</span>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
