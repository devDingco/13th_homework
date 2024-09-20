const Mainpage = () => {
  return (
    <div class="css_wrap">
      <header>
        <p>게시글등록</p>
      </header>
      <main>
        {/* 작성자 비밀번호 */}
        <section class="css_containerWP">
          <div class="css_inputBox">
            <div>
              <span>작성자</span>
            </div>
            <input
              class="css_inputStyleBox"
              type="text"
              placeholder="작성자 명을 입력해 주세요"
            />
          </div>
          <div class="css_inputBox">
            <div>
              <span>비밀번호</span>
            </div>
            <input
              class="css_inputStyleBox"
              type="text"
              placeholder="비밀번호를 입력해 주세요"
            ></input>
          </div>
        </section>
        <hr />
        {/* 제목 */}
        <section class="css_containerTitle">
          <div>
            <span>제목</span>
          </div>
          <input
            class="css_inputStyleBox"
            type="text"
            placeholder="제목을 입력해 주세요"
          />
        </section>
        <hr />
        {/* 내용 */}
        <section class="css_writeBox">
          <div>
            <span>내용</span>
          </div>
          <input type="text" placeholder="내용을 입력해 주세요" />
        </section>
        {/* 주소 */}
        <section class="css_address">
          <div>
            <span>주소</span>
          </div>
          <div>
            <input type="text" class="css_addressNum" placeholder="01234" />
            <button class="css_addressBtn">우편번호검색</button>
          </div>
          <input
            class="css_inputStyleBox"
            type="text"
            placeholder="주소를 입력해 주세요"
          />
          <input class="css_inputStyleBox" type="text" placeholder="상세주소" />
        </section>
        <hr />
        {/* 유튜브링크 */}
        <section class="css_containerTitle">
          <div>
            <span>유튜브 링크</span>
          </div>
          <input
            class="css_inputStyleBox"
            type="text"
            placeholder="링크를 입력해 주세요."
          />
        </section>
        <hr />
        {/* 사진첨부 */}
        <section class="css_address">
          <div class="css_plusPotoTitle">
            <span>사진 첨부</span>
          </div>
          <div class="css_addPotoBox">
            <div class="css_poto">
              <img src="./Vector.png" alt="plusButton" />
              <p>클릭해서 사진 업로드</p>
            </div>
            <div class="css_poto">
              <img src="./Vector.png" alt="plusButton" />
              <p>클릭해서 사진 업로드</p>
            </div>
            <div class="css_poto">
              <img src="./Vector.png" alt="plusButton" />
              <p>클릭해서 사진 업로드</p>
            </div>
          </div>
        </section>
        <section class="css_buttonBox">
          <button class="noBtn">취소</button>
          <button class="addBtn">등록하기</button>
        </section>
      </main>
    </div>
  );
};
