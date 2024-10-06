"use client";

// import { IYoutubeLinkStyles } from "@/types/IYoutubeLinkStyles";
import styles from "@/app/pages/boards/new/BoardsNew.module.css";

const YoutubeLink = (): JSX.Element => {
    return (
        <>
            <div className={styles.formContent}>
                <label htmlFor="youtubeUrl">유투브 링크</label>
            
                <input id="youtubeUrl" className={styles.youtubeUrl} type="url" placeholder="링크를 입력해주세요" />
            </div>
        </>
    )
};

export default YoutubeLink;