const 게시글등록페이지 = () => {
  return (
    // 게시글등록을 위한 내용
    <div class="게시물등록전체상자">
      <nav>게시물 등록</nav>
      {/* 작성자, 비번 입력칸 */}
      <div class="작성자입력상자">
        <div class="작성자비밀번호구성">
          <div class="필수입력부분">
            <span>작성자</span>
            <span class="필수별표시">*</span>
          </div>
          <input
            type="text"
            placeholder="작성자 명을 입력해 주세요."
            class="중간입력창크기"
          />
        </div>
        <div class="작성자비밀번호구성">
          <div class="필수입력부분">
            <span>비밀번호</span>
            <span class="필수별표시">*</span>
          </div>
          <input
            type="text"
            placeholder="비밀번호를 입력해 주세요."
            class="중간입력창크기"
          />
        </div>
      </div>
      <hr />
      {/* 게시글등록부분 */}
      <div class="게시글등록전체상자">
        {/* 제목부분 */}
        <div class="구분상자">
          <div class="필수입력부분">
            <span>제목</span>
            <span class="필수별표시">*</span>
          </div>
          <input
            type="text"
            placeholder="제목을 입력해 주세요."
            class="긴입력창크기"
          />
        </div>
        <hr />
        {/* 내용부분 */}
        <div class="구분상자">
          <div class="필수입력부분">
            <span>내용</span>
            <span class="필수별표시">*</span>
          </div>
          <textarea
            type="text"
            placeholder="내용을 입력해 주세요."
            class="내용입력창크기"
          ></textarea>
        </div>
        <hr />
        {/* 주소부분 */}
        <div class="구분상자">
          <span>주소</span>
          <div class="우편번호검색상자">
            <input type="text" placeholder="01234" class="작은입력창크기" />
            <button>우편번호 검색</button>
          </div>
          <input
            type="text"
            placeholder="주소를 입력해 주세요."
            class="긴입력창크기"
          />
          <input type="text" placeholder="상세주소" class="긴입력창크기" />
        </div>
        <hr />
        {/* 유튜브 링크 부분 */}
        <div class="구분상자">
          <span>유튜브 링크</span>
          <input
            type="text"
            placeholder="링크를 입력해 주세요."
            class="긴입력창크기"
          />
        </div>
        <hr />
        {/* 사진첨부 부분 */}
        <div class="구분상자">
          <span>사진 첨부</span>
          <form method="post" enctype="multipart/form-data">
            <이미지업로든버튼 />
            <이미지업로든버튼 />
            <이미지업로든버튼 />
          </form>
        </div>
        {/* 취소, 등록하기 버튼 부분 */}
        <div class="취소등록버튼상자">
          <button>취소</button>
          <button>등록하기</button>
        </div>
      </div>
    </div>
  );
};
