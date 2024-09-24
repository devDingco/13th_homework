import "../../../styles/BoardsDetail.css";

const BoardsDetail = () => {

    return (
        <>
            <div className="layout">
                <div className="detailMain">
                    <div className="title">살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라</div>
                    <div className="profile">
                        <div className="userProfile">
                            <div className="left">
                            <img src="/images/userIcon.png" alt="profile" />
                            <div className="userName">작성자</div>
                            </div>
                           
                            <div className="date">2024-09-23</div>
                        </div>
                        <div className="iconWrapper">
                            <img src="/images/linkIcon.png" alt="링크" className="linkIcon"/>
                            <img src="/images/mapIcon.png" alt="위치" className="mapIcon"/>
                        </div>
                    </div>

                    <section>
                        <div className="contentImg"><img src="/images/beach.png" alt="beachImage" /></div>
                        <article className="contentText">
                        살겠노라 살겠노라. 청산에 살겠노라.
머루랑 다래를 먹고 청산에 살겠노라.
얄리얄리 얄랑셩 얄라리 얄라

우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
너보다 시름 많은 나도 자고 일어나 우노라.
얄리얄리 얄라셩 얄라리 얄라

갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
얄리얄리 얄라셩 얄라리 얄라

이럭저럭 하여 낮일랑 지내 왔건만
올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
얄리얄리 얄라셩 얄라리 얄라

어디다 던지는 돌인가 누구를 맞히려던 돌인가.
미워할 이도 사랑할 이도 없이 맞아서 우노라.
얄리얄리 얄라셩 얄라리 얄라

살겠노라 살겠노라. 바다에 살겠노라.
나문재, 굴, 조개를 먹고 바다에 살겠노라.
얄리얄리 얄라셩 얄라리 얄라

가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
얄리얄리 얄라셩 얄라리 얄라

가다 보니 배불룩한 술독에 독한 술을 빚는구나.
조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
얄리얄리 얄라셩 얄라리 얄라
                        </article>
                        <article className="playArea">
                            <img src="/images/playBg.png" alt="플레이영상" className="playImg"/>
                        </article>
                        <article className="likeCount">
                            <div className="icon">
                                <img src="/images/breakHeart.png" alt="삐빅" />
                                <div>24</div>
                            </div>
                            <div className="icon">
                                <img src="/images/likeHeart.png" alt="좋다" />
                                <div>12</div>
                            </div>
                        </article>
                    </section>
                    <div className="buttonWrapper">
                        <button type="button" className="listBtn">목록으로</button>
                        <button type="button" className="editBtn">수정하기</button>
                   </div>
                </div>
            </div>
        </>
    )
};

export default BoardsDetail;