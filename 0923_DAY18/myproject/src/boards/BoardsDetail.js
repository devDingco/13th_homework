
import "./BoardsDetail.css";
import profileImage from "../assets/profile_img.png";
import linkIcon from "../assets/link_icon.png";
import locationIcon from "../assets/location_icon.png";
import badIcon from "../assets/bad_img.png";
import goodIcon from "../assets/good_img.png";
import menuIcon from "../assets/menu_icon.png";
import writeIcon from "../assets/write_icon.png";
import imageA from "../assets/imageA.png";
import mov from "../assets/mov.png";



const BoardsDetail = () => {
  return (
    <div className="layout">
      <div className="title">살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
      </div>
      {/* 작성자 일자 영역  */}
      <div className="profile-date-flex">
        <div className="profile-flex">
          <img src={profileImage} alt="프로필이미지" />
          <div className="css_writer">홍길동</div>
        </div>
        <div className="css_date">2024.11.11</div>
      </div>
      <div className="border_bottom"></div>
      <div className="link_location-section-flex">
        <div className="link_location-flex">
          <img src= {linkIcon} alt="링크아이콘" />
          <img src= {locationIcon} alt="로케이션아이콘" />
        </div>
        
      </div>
      <div className="main_container_flex">
        <img src= {imageA} alt="첨부한이미지"/>
        <div className="css_main_contents_text">
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
          얄리얄리 얄라셩 얄라리 얄라 <br />
          <br />
          어디다 던지는 돌인가 누구를 맞히려던 돌인가. <br />
          미워할 이도 사랑할 이도 없이 맞아서 우노라. <br />
          얄리얄리 얄라셩 얄라리 얄라 <br />
          <br />
          살겠노라 살겠노라. 바다에 살겠노라. <br />
          나문재, 굴, 조개를 먹고 바다에 살겠노라. <br />
          얄리얄리 얄라셩 얄라리 얄라 <br />
          <br />
          가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.<br />
          사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.<br />
          얄리얄리 얄라셩 얄라리 얄라<br />
          <br />
          가다 보니 배불룩한 술독에 독한 술을 빚는구나.<br />
          조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]<br />
          얄리얄리 얄라셩 얄라리 얄라<br />
        </div>
      </div>
      
      <div className="css_mov_section">
        <img src= {mov} alt="영상이미지" />
      </div>
      <div className="tendencies_number_flex">
        <div className="bad_section_flex">
          <img src= {badIcon} alt="배드이미지" />
          <span>24</span>
        </div>
        <div className="good_section_flex">
          <img src= {goodIcon} alt="굳이미지" />
          <span>12</span>
        </div>
      </div>
      <div className="button_flex">
        <button className="css_button_design">
          <img src= {menuIcon} alt="목록으로"/>
          <span className="css_button_text">목록으로</span>
        </button>
        <button className="css_button_design">
          <img src= {writeIcon} alt="수정하기"/>
          <span className="css_button_text">수정하기</span>
        </button>
      </div>
    </div>   
    
  )
}


export default BoardsDetail;