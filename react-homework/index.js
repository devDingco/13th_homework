const 게시글등록페이지 = () => {
  return (
    <div className="post-page">

      <div className="header">게시물 등록</div>

      <div className="post-main">

        <div className="user-box">
          <div className="input-group">
            <label className="input-label" for="username">작성자<span className="require"> *</span></label>
            <input type="text" id="username" className="input-box" placeholder="작성자 명을 입력해 주세요." />
          </div>
          <div className="input-group">
            <label className="input-label" for="password">비밀번호<span className="require"> *</span></label>
            <input type="password" id="password" className="input-box" placeholder="비밀번호를 입력해 주세요." />
          </div>
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label" for="title">제목<span className="require"> *</span></label>
          <input type="text" id="title" className="input-box" placeholder="제목을 입력해 주세요." />
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label" for="content">내용<span className="require"> *</span></label>
          <textarea type="text" id="title" className="content-input-box" placeholder="내용을 입력해 주세요." ></textarea>
        </div>

        <div className="input-group">
          <label className="input-label">주소</label>
          <div className="search-group-zip_code">
            <input type="text" className="input-box-zip_code" placeholder="01234" />
            <button className="btn-search-zip_code">우편번호 검색</button>
          </div>
          <input type="text" className="input-box" placeholder="주소를 입력해 주세요." />
          <input type="text" className="input-box" placeholder="상세주소" />
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label" for="link">유튜브 링크</label>
          <input type="text" id="link" className="input-box" placeholder="링크를 입력해 주세요." />
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label">사진 첨부</label>
          <div className="upload-group">
            <UploadFile />
            <UploadFile />
            <UploadFile />
          </div>
        </div>

        <div className="btn-group">
          <button className="btn-cancel">취소</button>
          <button type="submit" className="btn-register">등록하기</button>
        </div>
      </div>

    </div>
  )
}