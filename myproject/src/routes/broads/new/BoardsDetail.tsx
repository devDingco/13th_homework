import "./BoardsDetail.css";

const BoardsDetail = () => {
  const text = `
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
    `;
  return (
    <main>
      <div className="title_box">
        살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
        쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
      </div>
      <div className="details_box">
        <div className="writer_date_box">
          <div className="writer_box">
            <img src="/img/profile.png" />
            <div className="writer">홍길동</div>
          </div>
          <div className="date_box">2024.11.11</div>
        </div>
        <hr />
        <div className="icon_box">
          <img src="/img/link.png" />
          <img src="/img/location.png" />
        </div>
      </div>
      <img
        className="content_box_img"
        src="/img/Tranquil Beachside Serenity 1.png"
      />
      <div className="content_box">
        <pre>{text}</pre>
      </div>
      <div className="video_box">
        <img src="/img/video.png" />
      </div>
      <div className="bad_good_box">
        <div className="heart_box bad">
          <img src="/img/bad.png" />
          <div className="bad_count">24</div>
        </div>
        <div className="heart_box good">
          <img src="/img/good.svg" />
          <div className="good_count">24</div>
        </div>
      </div>
      <div className="list_edit_box">
        <div className="button_box">
          <img src="/img/menu.png" />
          <div className="button_text">목록으로</div>
        </div>
        <div className="button_box">
          <img src="/img/edit.png" />
          <div className="button_text">수정하기</div>
        </div>
      </div>
    </main>
  );
};

export default BoardsDetail;
