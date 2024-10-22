"use client"
import styles from "./styles.module.css";

export default function LayoutNavigationPage(){

    return(
        <div className={styles.naviWrap}>
            <div className={styles.naviBg}>
                <div className={styles.naviLeft}>
                    <div className={styles.logo}></div>
                    <div>트립토크</div>
                    <div>숙박권 구매</div>
                    <div>마이 페이지</div>
                </div>
                <div className={styles.naviRight}>
                    <div className={styles.profileIcon}></div>
                    <div className={styles.dropdown}></div>
                </div>
            </div>
        </div>
    )
}