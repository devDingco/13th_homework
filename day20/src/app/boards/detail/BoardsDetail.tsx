import "./BoardDetail.css";

const IMAGE_SRC = {
  profileImage: require("@assets/profile_image.png"),
  linkImage: require("@assets/link.png"),
  locationImage: require("@assets/location.png"),
  cheongsanImage: require("@assets/cheongsan.png"),
  neotubeImage: require("@assets/neotube.png"),
  badImage: require("@assets/bad.png"),
  goodImage: require("@assets/good.png"),
  hamberger: require("@assets/hamberger.png"),
  pencil: require("@assets/pencil.png"),
} as const;

const BoardsDetail = () => {
  return (
    <div className="detail-layout">
      <div className="detail-body">
        <div className="detail-frame">
          <div className="detail-subject">
            살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
            쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
          </div>
          <div className="detail-metadata-container">
            <div className="detail-metadata-profile">
              <img src={IMAGE_SRC.profileImage} alt="프로필이미지" />
              <div>홍길동</div>
            </div>
            <div className="detail-metadata-date">2024.11.11</div>
          </div>
          <div className="enroll-border"></div>
          <div className="detail-metadata-icon-container">
            <img src={IMAGE_SRC.linkImage} alt="링크아이콘" />
            <img src={IMAGE_SRC.locationImage} alt="위치아이콘" />
          </div>
          <div className="detail-content-container">
            <img
              src={IMAGE_SRC.cheongsanImage}
              alt="청산사진"
              className="detail-content-image"
            />

            <div className="detail-content-text">
              <div>살겠노라 살겠노라. 청산에 살겠노라.</div>
              <div>머루랑 다래를 먹고 청산에 살겠노라.</div>
              <div>얄리얄리 얄랑셩 얄라리 얄라</div>
              <div className="text-gap"></div>
              <div>우는구나 우는구나 새야. 자고 일어나 우는구나 새야.</div>
              <div>너보다 시름 많은 나도 자고 일어나 우노라.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="text-gap"></div>
              <div>
                갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
              </div>
              <div>이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="text-gap"></div>
              <div>이럭저럭 하여 낮일랑 지내 왔건만</div>
              <div>올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="text-gap"></div>
              <div>어디다 던지는 돌인가 누구를 맞히려던 돌인가.</div>
              <div>미워할 이도 사랑할 이도 없이 맞아서 우노라.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="text-gap"></div>
              <div>살겠노라 살겠노라. 바다에 살겠노라.</div>
              <div>나문재, 굴, 조개를 먹고 바다에 살겠노라.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="text-gap"></div>
              <div>가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.</div>
              <div>
                사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
              </div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="text-gap"></div>
              <div>가다 보니 배불룩한 술독에 독한 술을 빚는구나.</div>
              <div>
                조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
              </div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
            </div>
            <img src={IMAGE_SRC.neotubeImage} alt="너튜브사진" />
            <div className="detail-content-goodorbad">
              <div className="detail-good-container">
                <img src={IMAGE_SRC.badImage} alt="싫어요" />
                <div className="detail-bad-text">24</div>
              </div>
              <div className="detail-good-container">
                <img src={IMAGE_SRC.goodImage} alt="좋아요" />
                <div className="detail-good-text">12</div>
              </div>
            </div>
            <div className="detail-buttons-container">
              <button className="detail-button">
                <img alt="목록아이콘" src={IMAGE_SRC.hamberger} />
                <div>목록으로</div>
              </button>
              <button className="detail-button">
                <img alt="수정아이콘" src={IMAGE_SRC.pencil} />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetail;
