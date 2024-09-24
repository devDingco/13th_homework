const BoardsDetail = () => {
  return (
    <div id="detailContainer" className="container">
      <div className="boardInfo">
        <div id="boardTitle">추후 글 제목이 들어가는 공간입니다.</div>
        <div className="detailBlock">
          <div className="boardWriter">
            <img
              src={`${process.env.PUBLIC_URL}/images/profile.png`}
              alt="profile"
            />
            <p id="writer">요플레</p>
          </div>
          <div className="boardDate">
            <p id="date">2024.11.11</p>
          </div>
        </div>
        <div className="contentExtra">
          <img src={`${process.env.PUBLIC_URL}/images/link.png`} alt="공유" />
          <img
            src={`${process.env.PUBLIC_URL}/images/location.png`}
            alt="위치"
          />
        </div>
      </div>

      <div className="boardContent">
        <img
          className="exImg"
          src={`${process.env.PUBLIC_URL}/images/exampleImg.png`}
          alt="예시 그림"
        />
        <div id="detailContent">
          <p>추후 글이 들어올 예정</p>
        </div>
        <img
          className="exVideo"
          src={`${process.env.PUBLIC_URL}/images/videoEx.png`}
          alt="예시 동영상"
        />
      </div>
      <div className="countLike">
        {/* 추후 각각의 div을 만지면 count */}
        <div>
          <img src={`${process.env.PUBLIC_URL}/images/bad.png`} alt="싫어요" />
          <p id="badCount" style={{ color: 'black' }}>
            24
          </p>
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}/images/good.png`} alt="좋아요" />
          <p id="goodCount" style={{ color: 'red' }}>
            54
          </p>
        </div>
      </div>
      <div className="detailBtnList">
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/images/list_icon.png`}
            alt="목록"
          />
          목록으로
        </button>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/images/edit_icon.png`}
            alt="수정"
          />
          수정하기
        </button>
      </div>
    </div>
  );
};
export default BoardsDetail;
