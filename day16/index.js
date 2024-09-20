const 게시글등록페이지 = () => {
  return (
    <div className="전체창">
      <header>게시물 등록</header>
      <main>
        <div className="메인첫번째박스">
          <div className="작성자박스">
            <label htmlFor="작성자인풋">
              작성자<span>*</span>
            </label>
            <input
              type="text"
              id="작성자인풋"
              placeholder="작성자 명을 입력해 주세요."
            />
          </div>
          <div className="비밀번호박스">
            <label htmlFor="비밀번호인풋">
              비밀번호<span>*</span>
            </label>
            <input
              type="text"
              id="비밀번호인풋"
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
        </div>
        <div className="제목박스">
          <label htmlFor="제목인풋">
            제목<span>*</span>
          </label>
          <input
            type="text"
            id="제목인풋"
            placeholder="제목을 입력해 주세요."
          />
        </div>
        <div className="내용박스">
          <label htmlFor="내용인풋">
            내용<span>*</span>
          </label>
          <textarea
            type="text"
            id="내용인풋"
            placeholder="내용을 입력해 주세요."
          ></textarea>
        </div>
        <div className="주소박스">
          <div className="우편번호전체박스">
            <label htmlFor="우편번호인풋">주소</label>

            <div className="우편번호창">
              <input type="text" id="우편번호인풋" placeholder="01234" />
              <div className="우편번호검색">우편번호 검색</div>
            </div>
          </div>
          <input
            className="주소입력인풋"
            type="text"
            placeholder="주소를 입력해 주세요."
          ></input>
          <input
            className="상세주소입력인풋"
            type="text"
            placeholder="상세주소"
          ></input>
        </div>
        <div className="유튜브링크박스">
          <label htmlFor="유튜브링크인풋">유튜브링크</label>
          <input
            type="text"
            id="유튜브링크인풋"
            placeholder="링크를 입력해 주세요."
          />
        </div>
        <div className="사진첨부여섯번째박스">
          <label htmlFor="">사진 첨부</label>
          <div id="사진업로드전체박스">
            <div className="사진박스">
              <img src="./add.png" alt="" />
              <div>클릭해서 사진 업로드</div>
            </div>
            <div className="사진박스">
              <img src="./add.png" alt="" />
              <div>클릭해서 사진 업로드</div>
            </div>
            <div className="사진박스">
              <img src="./add.png" alt="" />
              <div>클릭해서 사진 업로드</div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="푸터전체박스">
          <div className="푸터취소">취소</div>
          <div className="푸터등록하기">등록하기</div>
        </div>
      </footer>
    </div>
  );
};
