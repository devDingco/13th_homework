"use client"
import styles from "./styles.module.css"

export default function BoardCommentList() {

    return(
        <div>
            <div>
                <div className={styles.profile}>
                    <div className={styles.d_flex}>
                        <p className={styles.profile_icon}></p>
                        <p></p>
                    </div>
                    <div className={styles.comment_box}>
                        <p className={styles.comment_text}></p>
                    </div>
                    <div>
                        <p className={styles.comment_date}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}