//index.js
const 게시글등록페이지 = () => {
  return (
    <div class="게시물등록하기전체">
      <div class="title">게시물 등록</div>
      <img class="이전으로돌아가기" src="./assets/cancel.png" / >
      {/* 작성자 비밀번호 작성하는 행 영역 */}
      <div class="작성영역모두전체">
        <div class="작성자와비밀번호영역">
          <div class="작성보여주는곳">
            <div class = "타이틀과필수표시">
              <span class="title2">작성자</span><span class="필수작성">*</span>
            </div>
            
            <input class="css_input" type="text" placeholder="작성자 명을 입력해 주세요."></input>
          </div>
          <div class="작성보여주는곳">
            <div class = "타이틀과필수표시">
              <span class="title2">비밀번호</span><span class="필수작성">*</span>
            </div>
            <input class="css_input" type="password" placeholder="비밀번호를 입력해 주세요."></input>
          </div>
        </div>
        
      </div>
      {/* 제목 작성 하는 행 영역 */}
      <div class="작성보여주는곳">
        <div class = "타이틀과필수표시">
          <span class="title2">제목</span><span class="필수작성">*</span>
        </div>
          <input class="css_input" type="text" placeholder="제목을 입력해 주세요."></input>
      </div>
      {/* 내용 작성 하는 행 영역 */}
      <div class="작성보여주는곳">
        <div class = "타이틀과필수표시">
          <span class="title2">내용</span><span class="필수작성">*</span>
        </div>
        <textarea class="css_textarea"  placeholder="내용을 입력해 주세요."></textarea>
      </div>
      {/* 주소 작성 영역 */}
      <div class="작성보여주는곳">
        <div class="title2">주소</div>
        <div class="css_주소작성영역전체">
          <div class="css_우편번호검색영역">
            <input class="css_input_우편번호" type="text" placeholder="01234"></input> <button class="css_우편번호버튼">우편번호 검색</button>
          </div>
          
          <input class="css_input" type="text" placeholder="지번, 도로명, 건물명으로 검색"></input>
          <input class="css_input" type="text" placeholder="건물명, 동/호수 등의 상세주소 입력"></input>
        </div>
          
      </div>
      <hr class="css_line"></hr>
      {/* 유튜브링크 작성 영역 */}
      <div class="작성보여주는곳">
          <span class="title2">유튜브 링크</span>
          <input class="css_input" type="text" placeholder="링크를 입력해 주세요."></input>
      </div>
      <hr class="css_line"></hr>
      {/* 사진첨부 작성 영역 */}
      <div class="작성보여주는곳">
        <span class="title2">사진 첨부</span>
        <div class = "사진업로드행영역">
          <div class="사진업로드영역">
            <img class="img_plus" src ="./assets/add.png" />
            <span class="css_img_upload_text">사진 업로드</span>
          </div>
          <div class="사진업로드영역">
            <img class="img_plus" src ="./assets/add.png" />
            <span class="css_img_upload_text">사진 업로드</span>
          </div>
          <div class="사진업로드영역">
            <img class="img_plus" src ="./assets/add.png" />
            <span class="css_img_upload_text">사진 업로드</span>
          </div>
        </div>
        
      </div>
      {/* 버튼 작성 영역 */}
      <div class="css_button_area">
        <button class="css_cancel_button">취소</button>
        <button class="css_signup_button">등록하기</button>
      </div>
    </div>
  )
  }