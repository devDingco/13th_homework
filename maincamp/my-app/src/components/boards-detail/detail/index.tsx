"use client"
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import styles from "./styles.module.css"
import useBoardsDetail from "@/components/boards-detail/detail/hook"

export default function BoardsDetail() {
    const {data, onClickEdit} = useBoardsDetail();

    return (
        <div className={styles.content}>
            <h1>{data?.fetchBoard?.title}</h1>
            <div className={styles.profile}>
                <div className={styles.profileLeft}>
                    <p className={styles.profile_icon}></p>
                    <p>{data?.fetchBoard?.writer}</p>
                </div>
                <div className={styles.createDate}>
                    <p>{data?.fetchBoard?.createdAt.split("T")[0].replace(/-/g, ".")}</p>
                </div>
            </div>
            <div className={styles.subject}>
                <div className={styles.subjectIcon}>
                    <p className={styles.clip}></p>
                    <p className={styles.mapIcon}></p>
                </div>
                <p className={styles.subjectImg}></p>
                <p>{data?.fetchBoard?.contents}</p>
            </div>
            <div className={styles.videoBg}>
                <div className={styles.video}></div>
            </div>
            <div className={styles.emotion}>
                <div className={styles.bad}>
                    <div className={styles.badIcon}></div>
                    {/* <FrownOutlined /> */}
                    <p>24</p>
                </div>
                <div className={styles.good}>
                    <div className={styles.goodIcon}></div>
                    {/* <SmileOutlined /> */}
                    <p>12</p>
                </div>
            </div>
            <div className={styles.bottomBtn}>
                <button></button>
                <button onClick={onClickEdit}></button>
            </div>
        </div>
    )
}