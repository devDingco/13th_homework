import Image from "next/image";
import styles from "./styles.module.css";

export default function DetailPage() {
    return (
        <>
            <header>
                <p className={styles.header_title}>title</p>

                <div className={styles.header_info}>
                    <div className={styles.info_profile}>
                        <Image
                            src="/svg/person.svg"
                            alt="profile"
                            width={24}
                            height={24}
                            sizes="100%"
                        />
                        <p>author</p>
                    </div>
                    <div>
                        <p>date</p>
                    </div>
                </div>

                <div className={styles.info_link}>
                    <Image
                        src="/svg/link.svg"
                        alt="share"
                        width={24}
                        height={24}
                        sizes="100%"
                    />
                    <Image
                        src="/svg/location.svg"
                        alt="location"
                        width={24}
                        height={24}
                        sizes="100%"
                    />
                </div>
            </header>

            <main>
                <Image
                    src="/img/bg01.png"
                    alt="thumbnail"
                    width={400}
                    height={500}
                    sizes="100%"
                />

                <div className={styles.main_content}>
                    <pre>contents</pre>
                </div>

                <div className={styles.main_video}>
                    <Image
                        src="/img/bg02.png"
                        alt="video"
                        width={660}
                        height={360}
                        sizes="100%"
                    />
                </div>

                <div className={styles.main_recommend}>
                    <div>
                        <Image
                            src="/svg/bad.svg"
                            alt="thumbnail"
                            width={24}
                            height={24}
                            sizes="100%"
                        />
                        <p>24</p>
                    </div>
                    <div>
                        <Image
                            src="/svg/good.svg"
                            alt="thumbnail"
                            width={24}
                            height={24}
                            sizes="100%"
                        />
                        <p>12</p>
                    </div>
                </div>

                <div className={styles.main_btn}>
                    <div className={styles.btn_list}>
                        <Image
                            src="/svg/menu.svg"
                            alt="menu"
                            width={24}
                            height={24}
                            sizes="100%"
                        />
                        <p>목록으로</p>
                    </div>
                    <div className={styles.btn_edit}>
                        <Image
                            src="/svg/edit.svg"
                            alt="edit"
                            width={24}
                            height={24}
                            sizes="100%"
                        />
                        <p>수정하기</p>
                    </div>
                </div>
            </main>
        </>
    );
}
