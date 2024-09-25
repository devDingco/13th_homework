import "../../../styles/boards/new/BoardsDetail.css";
// import {} from "../../../components/button";

// assets import
import bannerImg from "../../../assets/images/detail_banner.png";
import videoImg from "../../../assets/images/detail_video.png";
import postImg from "../../../assets/images/detail_img.png";
import profileImg from "../../../assets/images/profile_img.png";

import linkIcon from "../../../assets/icon/link.svg";
import locationIcon from "../../../assets/icon/location.svg";
import likeIcon from "../../../assets/icon/good.svg";
import unlikeIcon from "../../../assets/icon/bad.svg";
import menuIcon from "../../../assets/icon/menu.svg";
import editIcom from "../../../assets/icon/edit.svg";
import leftArrowIcon from "../../../assets/icon/left_arrow.svg";
import loginIcon from "../../../assets/icon/login.svg";

const BoardsDetail = () => {
  return (
    <div className="detailPostPage">
      {/* 모바일 헤더 */}
      <div className="detailMobileHeader">
        <img src={leftArrowIcon} alt="back" />
        <div className="detailMobileLogin">
          <p>로그인</p>
          <img src={loginIcon} alt="login" />
        </div>
      </div>
      <div className="detailMobileBanner">
        <img src={bannerImg} alt="banner img" />
      </div>

      {/* 제목 */}
      <div>
        <div>
          <pre>
            살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리
            얄라
          </pre>
        </div>
        <div>
          <div>
            <img src={profileImg} alt="profile img" />
            <p>홍길동</p>
          </div>
          <p>2024.05.29</p>
        </div>
        <div>
          <button className="backNone">
            <img src={linkIcon} alt="link icon" />
          </button>
          <button className="backNone">
            <img src={locationIcon} alt="location icon" />
          </button>
        </div>
      </div>

      {/* 내용 */}
      <div>
        <div>
          <img src={postImg} alt="post img" />
        </div>
        <pre>
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
        </pre>
        <div>
          <img src={videoImg} alt="video img" />
        </div>
      </div>

      {/* 버튼 */}
      <div>
        <div>
          <div>
            <button className="backNone">
              <img src={unlikeIcon} alt="unlike icon" />
            </button>
            <p>23</p>
          </div>
          <div>
            <button className="backNone">
              <img src={likeIcon} alt="ike icon" />
            </button>
            <p>43</p>
          </div>
        </div>
        <div>
          <button className="backNone">
            <img src={menuIcon} alt="menu icon" />
            목록으로
          </button>
          <button className="backNone">
            <img src={editIcom} alt="edit icon" />
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetail;
