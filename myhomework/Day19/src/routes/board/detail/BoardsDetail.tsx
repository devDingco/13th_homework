// import { useState } from "react";
import "./BoardsDetail.css";

const BoardsDetail = () => {
  return (
    <div className="layout">
      <div className="head">
        <div className="contentTitle">
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
          쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
        </div>{" "}
        {/* 제목 */}
        <div className="createInfo">
          {" "}
          {/* 프로필 이미지+작성자이름 / 작성일자 <- jsutify-content:space-between, 가로, 아래에 Margin 주고 border-bottom 해서 선 추가 */}
          <div className="writerName">
            <img
              src="/img/icon/profile_img.png"
              className="profileImg"
              alt=""
            />
            <span id="whoWrite">홍길동</span>
          </div>
          <div className="writeDate">2024.11.11</div>
        </div>
        <div className="shareImg">
          {" "}
          {/* 링크이미지 + 위치이미지 <- 오른쪽 정렬, 가로 */}
          <img src="/img/icon/link_icon_24.png" className="shareicon" alt="" />
          <img src="/img/icon/location_24.png" className="shareicon" alt="" />
        </div>
      </div>

      <div className="contentBox">
        {" "}
        {/* 이미지 + 내용 칸 <- 넓게..., 세로, 이미지랑 텍스트 다 왼쪽 정렬 */}
        <img src="/img/content_img.png" className="contentImg" alt="" />
        <span id="contentsPoem">
          살겠노라 살겠노라. 청산에 살겠노라.
          <br />
          머루랑 다래를 먹고 청산에 살겠노라.
          <br />
          얄리얄리 얄랑셩 얄라리 얄라
          <br />
          <br />
          우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
          <br />
          너보다 시름 많은 나도 자고 일어나 우노라.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
          <br />
          이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          이럭저럭 하여 낮일랑 지내 왔건만
          <br />
          올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          어디다 던지는 돌인가 누구를 맞히려던 돌인가.
          <br />
          미워할 이도 사랑할 이도 없이 맞아서 우노라.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          살겠노라 살겠노라. 바다에 살겠노라.
          <br />
          나문재, 굴, 조개를 먹고 바다에 살겠노라.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
          <br />
          사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          가다 보니 배불룩한 술독에 독한 술을 빚는구나.
          <br />
          조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
        </span>
      </div>

      <div className="previewBox">
        {" "}
        {/* 동영상 미리보기 (기능x 이미지만 넣기) <- 내용 작성 칸이랑 w 똑같이!!, background-color: lightgray, 가운데 정렬 */}
        <img src="/img/video.png" className="previewImg" alt="" />
      </div>

      <div className="evaluate">
        {" "}
        {/* 싫어요 이미지(숫자랑 div로 묶기(세로)), 좋아요 이미지(숫자랑 div로 묶기(세로)) <- 버튼으로 만들고 이미지 넣기 해야겠당... 가로, 가운데 정렬, gap 줘야 함 */}
        <div className="hate">
          <button className="hateButton"></button>
          <span className="hateNum">24</span>
        </div>
        <div className="like">
          <button className="likeButton"></button>
          <span className="likeNum">12</span>
        </div>
      </div>

      <div className="toButtons">
        {" "}
        {/* 목록으로 버튼, 수정하기 버튼 <- 가로, gap 줘야 함, 둘 다 버튼 안에 이미지 넣어야 함 */}
        <button className="toList">목록으로</button>
        <button className="edit">수정하기</button>
      </div>
    </div>
  );
};

export default BoardsDetail;
