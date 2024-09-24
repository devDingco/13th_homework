import React from "react";
import "../../../css/BoardsDetail.css";

const BoardsDetail = () => {
  return (
    <div className="detail-all-container">
      <div className="detail-container">
        <div className="detail-title-area">
          <div className="detail-title">
            살어리 살어리라사 청산에 살어리라사멀위랑 도래랑 먹고 청산에 살어리랏다얄리얄리 얄랑셩 얄라리얄라라라얄랑셩
            얄라리얄라라라
          </div>
        </div>
        <div className="info-area">
          <div className="nick">
            <div className="profile-img">
              <img src="/assets/profile.png" alt="profile" />
            </div>
            <p>홍길동</p>
          </div>
          <div className="date">2024.11.11</div>
        </div>
        <div className="share-area">
          <div className="share-img">
            <img src="/assets/clip.png" alt="clip" />
            <img src="/assets/place.png" alt="place" />
          </div>
        </div>
        <div className="detail-content-area">
          <img src="/assets/example.png" alt="ex" className="content-img" />
          <div className="detail-content">
            <p>살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에 살겠노라. 얄리얄리 얄랑셩 얄라리 얄라 </p>
            <p>
              우는구나 우는구나 새야. 자고 일어나 우는구나 새야. 너보다 시름 많은 나도 자고 일어나 우노라. 얄리얄리
              얄라셩 얄라리 얄라
            </p>
            <p>
              갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐 이끼 묻은 쟁기를 가지고 물 아래 갈던 밭
              보았느냐. 얄리얄리 얄라셩 얄라리 얄라
            </p>
            <p>
              이럭저럭 하여 낮일랑 지내 왔건만 올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가. 얄리얄리 얄라셩 얄라리
              얄라{" "}
            </p>
            <p>
              어디다 던지는 돌인가 누구를 맞히려던 돌인가. 미워할 이도 사랑할 이도 없이 맞아서 우노라. 얄리얄리 얄라셩
              얄라리 얄라
            </p>
            <p>
              살겠노라 살겠노라. 바다에 살겠노라. 나문재, 굴, 조개를 먹고 바다에 살겠노라. 얄리얄리 얄라셩 얄라리 얄라
            </p>
            <p>
              가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라. 사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을
              듣노라. 얄리얄리 얄라셩 얄라리 얄라
            </p>
            <p>
              가다 보니 배불룩한 술독에 독한 술을 빚는구나. 조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌
              하리이까.[1] 얄리얄리 얄라셩 얄라리 얄라
            </p>
          </div>
          <div className="video-area">
            <img src="/assets/video.png" alt="video" />
          </div>
          <div className="heart-area">
            <div className="broken-heart">
              <img src="/assets/broken-heart.png" alt="brokenheart" />
              <p>24</p>
            </div>
            <div className="red-heart">
              <img src="/assets/red-heart.png" alt="redheart" />
              <p>12</p>
            </div>
          </div>
          <div className="detail-btn-area">
            <button>
              <img src="/assets/list.png" alt="list"/>
              목록으로</button>
            <button>
              <img src="/assets/edit.png" alt="edit"/>
              수정하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetail;
