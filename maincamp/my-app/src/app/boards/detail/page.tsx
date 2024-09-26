// import './BoardsDetail.css'
"use client"
import styles from "./styles.module.css"

const BoardsDetail = () => {
    
    return (
        <div className={styles.content}>
            <h1>살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라</h1>
            <div className={styles.profile}>
                <div className={styles.profileLeft}>
                    <p className={styles.profile_icon}></p>
                    <p>홍길동</p>
                </div>
                <div className={styles.createDate}>
                    <p>2024.11.11</p>
                </div>
            </div>
            <div className={styles.subject}>
                <div className={styles.subjectIcon}>
                    <p className={styles.clip}></p>
                    <p className={styles.mapIcon}></p>
                </div>
                <p className={styles.subjectImg}></p>
                <p>살겠노라 살겠노라. 청산에 살겠노라.<br/>
                머루랑 다래를 먹고 청산에 살겠노라.<br/>
                얄리얄리 얄랑셩 얄라리 얄라<br/>

                우는구나 우는구나 새야. 자고 일어나 우는구나 새야.<br/>
                너보다 시름 많은 나도 자고 일어나 우노라.<br/>
                얄리얄리 얄라셩 얄라리 얄라<br/>

                갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐<br/>
                이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.<br/>
                얄리얄리 얄라셩 얄라리 얄라<br/>

                이럭저럭 하여 낮일랑 지내 왔건만<br/>
                올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.<br/>
                얄리얄리 얄라셩 얄라리 얄라<br/>

                어디다 던지는 돌인가 누구를 맞히려던 돌인가.<br/>
                미워할 이도 사랑할 이도 없이 맞아서 우노라.<br/>
                얄리얄리 얄라셩 얄라리 얄라<br/>

                살겠노라 살겠노라. 바다에 살겠노라.<br/>
                나문재, 굴, 조개를 먹고 바다에 살겠노라.<br/>
                얄리얄리 얄라셩 얄라리 얄라<br/>

                가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.<br/>
                사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.<br/>
                얄리얄리 얄라셩 얄라리 얄라<br/>

                가다 보니 배불룩한 술독에 독한 술을 빚는구나.<br/>
                조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]<br/>
                얄리얄리 얄라셩 얄라리 얄라<br/>
                </p>
            </div>
            <div className={styles.videoBg}>
                <div className={styles.video}></div>
            </div>
            <div className={styles.emotion}>
                <div className={styles.bad}>
                    <div className={styles.badIcon}></div>
                    <p>24</p>
                </div>
                <div className={styles.good}>
                    <div className={styles.goodIcon}></div>
                    <p>12</p>
                </div>
            </div>
            <div className={styles.bottomBtn}>
                <button></button>
                <button></button>
            </div>
        </div>
    )

}


export default BoardsDetail