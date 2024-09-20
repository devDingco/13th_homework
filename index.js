const 게시물등록페이지 = () => {
  return (
    <>
      <main className="게시물등록섹션">
        <section className="게시물등록">
          <h1>게시물 등록</h1>
        </section>

        <form>
          <fieldset className="이름과비번입력하는곳">
            <legend>사용자 정보</legend>

            <div className="반쪽인풋섹션">
              <label className="인풋이름">
                작성자 <span className="빨간별">*</span>
              </label>
              <input
                className="반쪽인풋"
                type="text"
                placeholder="작성자 명을 입력해 주세요."
              />
            </div>

            <div className="반쪽인풋섹션">
              <label className="인풋이름">
                비밀번호 <span className="빨간별">*</span>
              </label>
              <input
                className="반쪽인풋"
                type="password"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
          </fieldset>

          <hr className="실선" />

          <fieldset className="제목입력하는곳">
            <legend>게시물 제목</legend>
            <label className="인풋이름">
              제목 <span className="빨간별">*</span>
            </label>
            <input
              className="풀인풋"
              type="text"
              placeholder="제목을 입력해 주세요."
            />
          </fieldset>

          <hr className="실선" />

          <fieldset className="내용입력하는곳">
            <legend>게시물 내용</legend>
            <label className="인풋이름">
              내용 <span className="빨간별">*</span>
            </label>
            <textarea
              className="많이큰인풋"
              placeholder="내용을 입력해 주세요."
            />
          </fieldset>

          <hr className="실선" />

          <fieldset className="주소입력하는곳">
            <legend>주소 정보</legend>
            <label className="인풋이름">주소</label>
            <div className="우편번호입력하는곳">
              <input className="우편번호인풋" type="text" placeholder="01234" />
              <button className="우편버튼">우편번호 검색</button>
            </div>

            <input
              className="풀인풋"
              type="text"
              placeholder="주소를 입력해 주세요."
            />
            <input className="풀인풋" type="text" placeholder="상세주소" />
          </fieldset>

          <hr className="실선" />

          <fieldset className="링크입력하는곳">
            <legend>유튜브 링크</legend>
            <label className="인풋이름">유튜브 링크</label>
            <input
              className="풀인풋"
              type="text"
              placeholder="링크를 입력해 주세요."
            />
          </fieldset>

          <hr className="실선" />

          <fieldset className="사진첨부하는곳">
            <legend>사진 첨부</legend>
            <div className="업로드박스그룹">
              <div className="업로드박스">
                <img src="./icon/add.png" alt="추가" />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className="업로드박스">
                <img src="./icon/add.png" alt="추가" />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className="업로드박스">
                <img src="./icon/add.png" alt="추가" />
                <div>클릭해서 사진 업로드</div>
              </div>
            </div>
          </fieldset>

          <div className="버튼있는곳">
            <button className="취소버튼">취소</button>
            <button className="등록하기버튼">등록하기</button>
          </div>
        </form>
      </main>
    </>
  );
};
