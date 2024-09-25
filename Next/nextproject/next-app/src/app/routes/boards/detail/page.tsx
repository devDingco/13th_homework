"use client";

import React from 'react';
import styles from './style.module.css';
import Image from 'next/image'

export default function BoardsDetail () {
    
    return (
        <div className={styles.css_layout}>
            <div className={styles.css_header}>살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라</div>                   
                <div className={styles.css_info}>
                    <div className={styles.css_user}>
                        <div className={styles.css_name}>
                            <Image src='/assets/Profile.png' width={0} height={0} sizes='100vw' alt='profile' className={styles.css_profileimage} />                            
                            홍길동
                        </div>
                        <div className={styles.css_date}>2024-09-23</div>
                    </div>
                    <div className={styles.css_detailhr}></div>
                    <div className={styles.css_side}>
                        <div className={styles.css_clip}>
                            <Image src='/assets/Clip.png' width={0} height={0} sizes='100vw' alt='clip' className={styles.css_clip} />
                        </div>
                        <div className={styles.css_location}>
                            <Image src='/assets/Location.png' width={0} height={0} sizes='100vw' alt='location' className={styles.css_location} />
                        </div>
                    </div>
                </div>
            <div>
                <div className={styles.css_image}>
                    <Image src='/assets/MainImage.png' width={0} height={0} sizes='100vw' alt='mainimage' className={styles.css_image} />
                </div>
            </div>
                <div className={styles.css_text}>
                   
                        살겠노라 살겠노라. 청산에 살겠노라. <br/>
                        머루랑 다래를 먹고 청산에 살겠노라. <br/>
                        얄리얄리 얄랑셩 얄라리 얄라 <br/>
                        <br/>
                        우는구나 우는구나 새야. 자고 일어나 우는구나 새야. <br/>
                        너보다 시름 많은 나도 자고 일어나 우노라. <br/>
                        얄리얄리 얄라셩 얄라리 얄라 <br/>
                        <br/>
                        갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐 <br/>
                        이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐. <br/>
                        얄리얄리 얄라셩 얄라리 얄라 <br/>
                        <br/>
                        이럭저럭 하여 낮일랑 지내 왔건만 <br/> 
                        올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가. <br/>
                        얄리얄리 얄라셩 얄라리 얄라 <br/>
                        <br/>
                        어디다 던지는 돌인가 누구를 맞히려던 돌인가. <br/>
                        미워할 이도 사랑할 이도 없이 맞아서 우노라. <br/>
                        얄리얄리 얄라셩 얄라리 얄라 <br/>
                        <br/>
                        살겠노라 살겠노라. 바다에 살겠노라. <br/>
                        나문재, 굴, 조개를 먹고 바다에 살겠노라. <br/>
                        얄리얄리 얄라셩 얄라리 얄라 <br/>
                        <br/>
                        가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라. <br/>
                        사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라. <br/>
                        얄리얄리 얄라셩 얄라리 얄라 <br/>
                        <br/>
                        가다 보니 배불룩한 술독에 독한 술을 빚는구나. <br/>
                        조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1] <br/>
                        얄리얄리 얄라셩 얄라리 얄라<br/>
                    
                </div>
                <div className={styles.css_bottomimage}>
                    <Image src='/assets/BottomImage.png' width={0} height={0} sizes='100vw' alt='bottomimage' className={styles.css_bottomimageImage} />
                </div>
            <div className={styles.css_heart}>
                <div className={styles.css_hate}>
                <Image src='/assets/Hate.png' width={0} height={0} sizes='100vw' alt='hate' className={styles.css_hate} /><span>24</span>
                </div>
                <div className={styles.css_like}>
                    <Image src='/assets/Like.png' width={0} height={0} sizes='100vw' alt='like' className={styles.css_like} /> <span>12</span>
                </div>
            </div>
                <div className={styles.css_detailbutton}>
                    <button className={styles.css_list}>
                        <Image src='/assets/List.png' width={0} height={0} sizes='100vw' alt='list' className={styles.css_listimage} />
                    </button>
                    <button className={styles.css_modify}>
                    <Image src='/assets/Modify.png' width={0} height={0} sizes='100vw' alt='modify' className={styles.css_modifyimage} />
                    </button>
                </div>
        </div>
    )
}
