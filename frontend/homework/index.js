const 게시글등록페이지 = () => {
  return (
    <div class="uploadPostPage">
      <div class="menuTitle">
        <p>게시글 등록하기</p>
        <img src="./assets/icon/close.svg" />
      </div>
      <div class="postContainer">
        {/* 작성자, 비번 */}
        <div class="titleContainer">
          <div class="inputContainer">
            <div class="labelTitle">
              <p class="label">작성자</p>
              <p class="important">*</p>
            </div>
            <input class="infoInput" type="text" placeholder="작성자 명을 입력해 주세요." />
          </div>
          <div class="inputContainer">
            <div class="labelTitle">
              <p class="label">비밀번호</p>
              <p class="important">*</p>
            </div>
            <input class="infoInput" type="password" placeholder="비밀번호를 입력해 주세요." />
          </div>
        </div>
        <hr />
        {/* 제목 */}
        <div class="inputContainer">
          <div class="labelTitle">
            <p class="label">제목</p>
            <p class="important">*</p>
          </div>
          <input class="infoInput" type="text" placeholder="제목을 입력해 주세요." />
        </div>
        <hr />
        {/* 내용 */}
        <div class="inputContainer">
          <div class="labelTitle">
            <p class="label">내용</p>
            <p class="important">*</p>
          </div>
          <textarea class="infoInputContent" type="text" placeholder="내용을 입력해 주세요."></textarea>
        </div>
        {/* 주소 */}
        <div class="inputContainer addressInput">
          <p class="label">주소</p>
          <div class="addressMail">
            <input class="infoInputAddress" type="text" placeholder="01234" />
            <button class="addressSearch">우편번호 검색</button>
          </div>
          <input class="infoInput" type="text" placeholder="주소를 입력해 주세요." />
          <input class="infoInput" type="text" placeholder="상세주소" />
        </div>
        <hr />
        {/* 유튜브 링크 */}
        <div class="inputContainer">
          <p class="label">유튜브 링크</p>
          <input class="infoInput" type="text" placeholder="링크를 입력해 주세요." />
        </div>
        <hr />
        {/* 사진 첨부 */}
        <div class="postUploadeImg">
          <p class="label">사진 첨부</p>
          <div class="postUploadImage">
            <button class="postUploadImageButton">
              <img src="./assets/icon/add.svg" />
              <p>사진 업로드</p>
            </button>
            <button class="postUploadImageButton">
              <img src="./assets/icon/add.svg" />
              <p>사진 업로드</p>
            </button>
            <button class="postUploadImageButton">
              <img src="./assets/icon/add.svg" />
              <p>사진 업로드</p>
            </button>
          </div>
        </div>
        <div class="postButtonGroup">
          <button class="checkButton postCancelButton">취소</button>
          <button class="checkButton postSubmitButton">등록하기</button>
        </div>
      </div>
    </div>
  );
};
