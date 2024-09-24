// import { useState } from "react";
import "./BoardsDetail.css";

const BoardDetail = () => {
  return (
    <main className="containerWap">
      <header className="headerTitle">
        <span>
          살어리 살어리랏다 청산애 살어리랏다멀위랑 도래랑 먹고 청산에
          살어리랏다얄ㄹ리얄리 얄라리얄라
        </span>
      </header>
      <section className="sectionDiv">
        <div className="contentWriterDiv">
          <div className="WriterDiv">
            <div>
              <img src="/img/profile.png" alt="profile" />
              <span>홍길동</span>
            </div>
            <span>2024.11.11</span>
          </div>
          <hr />
          <div className="WriterImg">
            <div>
              <img src="/img/link.png" alt="link" />
              {/* <img src="/location." /> */}
              {/* <img src="/img/location." /> */}
              <img src="/img/location.png" />
            </div>
          </div>
        </div>
        <div className="contentImg">
          <div>
            <img src="/img/Tranquil Beachside Serenity.png" alt="image" />
          </div>
        </div>
        <div className="contentWriting">
          제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이
          지명하는 자를 임명한다. 국회는 선전포고, 국군의 외국에의 파견 또는
          외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다. 모든
          국민은 직업선택의 자유를 가진다. 위원은 탄핵 또는 금고 이상의 형의
          선고에 의하지 아니하고는 파면되지 아니한다. 국무총리 또는 행정각부의
          장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령
          또는 부령을 발할 수 있다.
        </div>
      </section>
      <section className="sectionDiv">
        <img src="/img/Frame.png" alt="frame" />
      </section>
      <section className="sectionDiv">
        <div className="goodBadBtn">
          <img src="/img/good.png" alt="good" />
          <span>24</span>
        </div>
        <div className="goodBadBtn">
          <img src="/img/bad.png" alt="bad" />
          <span>24</span>
        </div>
      </section>
      <section className="sectionDiv">
        <button>
          <img src="/img/left_icon.png" alt="icon" />
          목록으로
        </button>
        <button>
          <img src="/img/left_icon2.png" alt="icon" />
          수정하기
        </button>
      </section>
    </main>
  );
};

export default BoardDetail;
