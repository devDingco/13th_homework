import Image from "next/image";
import styles from "./styles.module.css";

export default function Detail() {
  return (
    <>
      <div className={styles.전체박스}>
        <div className={styles.타이틀}>
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
          쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄 <br /> 라
        </div>
        <div className={styles.헤더전체박스}>
          <div className={styles.윗줄전체박스}>
            <div className={styles.홍길동박스}>
              <img src="/img/img.svg" alt="" />
              <div>홍길동</div>
            </div>

            <div className="날짜">2024.11.11</div>
          </div>
          <hr className={styles.hr스타일} />
          <div className={styles.아랫줄전체박스}>
            <img src="/img/image2.svg" alt="" />
            <img src="/img/room.svg" alt="" />
          </div>
        </div>
        <img src="/img/beach.png" width="400px" alt="" />
        <div>
          살겠노라 살겠노라. 청산에 살겠노라. <br />
          머루랑 다래를 먹고 청산에 살겠노라. <br />
          얄리얄리 얄랑셩 얄라리 얄라 <br />
          <br />
          우는구나 우는구나 새야. 자고 일어나 우는구나 새야. <br />
          너보다 시름 많은 나도 자고 일어나 우노라. <br />
          얄리얄리 얄라셩 얄라리 얄라 <br />
          <br />
          갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐 <br />
          이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐. <br />
          얄리얄리 얄라셩 얄라리 얄라 <br />
          <br />
          이럭저럭 하여 낮일랑 지내 왔건만 <br />
          올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가. <br />
          얄리얄리 얄라셩 얄라리 <br />
          <br />
          얄라 어디다 던지는 돌인가 누구를 맞히려던 돌인가. <br />
          미워할 이도 사랑할 이도 없이 맞아서 우노라. <br />
          얄리얄리 얄라셩 얄라리 얄라 <br />
          <br />
          살겠노라 살겠노라. 바다에 살겠노라. <br />
          나문재, 굴, 조개를 먹고 바다에 살겠노라. <br />
          얄리얄리 얄라셩 얄라리 얄라 <br />
          <br />
          가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라. <br />
          사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라. <br />
          얄리얄리 얄라셩 얄라리 얄라 <br />
          <br />
          가다 보니 배불룩한 술독에 독한 술을 빚는구나. <br />
          조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1] <br />
          얄리얄리 얄라셩 얄라리 얄라
        </div>
        <div className={styles.영상사진박스}>
          <img src="/img/Frame.svg" width="822px" alt="" />
        </div>
        <div className={styles.푸터전체박스}>
          <div className={styles.하트전체박스}>
            <img className={styles.왼쪽하트} src="/img/Vector.svg" alt="" />
            <img className="오른쪽하트" src="/img/good.svg" alt="" />
          </div>
          <div className={styles.숫자박스}>
            <div className={styles.왼쪽24}>24</div>
            <div className={styles.오른쪽12}>12</div>
          </div>
        </div>
        <div className={styles.푸터2전체박스}>
          <button className={styles.button}>
            <img src="/img/footer2.svg" alt="" />
            <div>목록으로</div>
          </button>
          <button className={styles.button}>
            <img src="/img/footer1.svg" alt="" />
            <div>수정하기</div>
          </button>
        </div>
      </div>
    </>
  );
}

// export default Detail;
