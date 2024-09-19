const 게시글등록 = () => {
  return (
    <div className="root">
      <header>게시물 등록</header>
      <main>
        <div className="writer_password_box">
          <div className="inputBox writer">
            <label for="writerInput">
              작성자<span>*</span>
            </label>
            <input
              type="text"
              id="writerInput"
              placeholder="작성자 명을 입력해 주세요"
            ></input>
          </div>
          <div className="inputBox password">
            <label>
              비밀번호<span>*</span>
            </label>
            <input
              type="text"
              id="passwordInput"
              placeholder="비밀번호를 입력해 주세요."
            ></input>
          </div>
        </div>
        <hr />
        <div className="inputBox title">
          <label for="titleInput">
            제목<span>*</span>
          </label>
          <input
            type="text"
            id="titleInput"
            placeholder="제목을 입력해 주세요."
          ></input>
        </div>
        <hr />
        <div className="inputBox content">
          <label for="contentTextarea">
            내용<span>*</span>
          </label>
          <textarea
            id="contentTextarea"
            placeholder="내용을 입력해주세요."
          ></textarea>
        </div>
        <hr />
        <div className="address_box">
          <div className="inputBox addressNumber">
            <label for="addressNumberInput">주소</label>
            <div className="addressNumberSearchBox">
              <input
                type="text"
                id="addressNumberInput"
                placeholder="01234"
              ></input>
              <div className="addressNumberButton">우편번호 검색</div>
            </div>
          </div>
          <input type="text" placeholder="주소를 입력해 주세요."></input>
          <input type="text" placeholder="상세주소"></input>
        </div>
        <hr />
        <div className="inputBox youtube">
          <label for="youtubeInput">유튜브 링크</label>
          <input
            type="text"
            id="youtubeInput"
            placeholder="링크를 입력해 주세요."
          ></input>
        </div>
        <hr />
        <div className="inputBox photo">
          <label>사진첨부</label>
          <div className="photoCardBox">
            <div className="photoBox">
              <div className="photoCard">
                <img src="./assets/add.png"></img>
                <div className="photo_text">클릭해서 사진 업로드</div>
              </div>
            </div>
            <div className="photoBox">
              <div className="photoCard">
                <img src="./assets/add.png"></img>
                <div className="photo_text">클릭해서 사진 업로드</div>
              </div>
            </div>
            <div className="photoBox">
              <div className="photoCard">
                <img src="./assets/add.png"></img>
                <div className="photo_text">클릭해서 사진 업로드</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <button className="button cancel">취소</button>
        <button className="button register">등록하기</button>
      </footer>
    </div>
  );
};
