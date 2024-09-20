//게시물 등록
const RegisterContent = () => {
  const openUploadImg = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div id="contentContainer">
      <h3>게시물 등록</h3>

      <div className="block">
        <div className="semi_block">
          <p>
            작성자<span> *</span>
          </p>
          <div>
            <input type="text" placeholder="작성자 명을 입력해 주세요." />
          </div>
        </div>
        <div className="semi_block">
          <p>
            비밀번호<span> *</span>
          </p>
          <div>
            <input type="password" placeholder="비밀번호를 입력해 주세요." />
          </div>
        </div>
      </div>
      <div className="block">
        <div className="semi_block">
          <p>
            제목<span> *</span>
          </p>
          <div>
            <input type="text" placeholder="제목을 입력해주세요." />
          </div>
        </div>
      </div>
      <div className="block">
        <div className="semi_block">
          <p>
            내용<span> *</span>
          </p>
          <div>
            <textarea placeholder="내용을 입력해주세요." rows="8"></textarea>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="semi_block">
          <p>주소</p>
          <div className="detail_block">
            <input className="zip_code" type="text" placeholder="01234" />
            <button className="searchZipCode">우편번호 검색</button>
          </div>
          <div>
            <input type="text" placeholder="주소를 입력해주세요." />
          </div>
          <div>
            <input type="text" placeholder="상세주소" />
          </div>
        </div>
      </div>
      <div className="block">
        <div className="semi_block">
          <p>유튜브 링크</p>
          <div>
            <input type="url" placeholder="링크를 입력해주세요." />
          </div>
        </div>
      </div>
      {/* 추후 추가하기 버튼을 누르면 새 div이 생성되게 */}

      <div className="block photo">
        <div className="semi_block">
          <p>사진 첨부</p>
          <div className="addPhoto">
            <div className="photoDiv" onClick={openUploadImg}>
              <p>
                <img src="./icon/add.svg" />
              </p>
              <span>클릭해서 사진 업로드</span>
              <input type="file" id="fileInput" style={{ display: 'none' }} />
            </div>
            <div className="photoDiv" onClick={openUploadImg}>
              <p>
                <img src="./icon/add.svg" />
              </p>
              <span>클릭해서 사진 업로드</span>
              <input type="file" id="fileInput" style={{ display: 'none' }} />
            </div>
            <div className="photoDiv" onClick={openUploadImg}>
              <p>
                <img src="./icon/add.svg" />
              </p>
              <span>클릭해서 사진 업로드</span>
              <input type="file" id="fileInput" style={{ display: 'none' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="btns">
        <button className="cancelBtn">취소</button>
        <button className="registerBtn">등록하기</button>
      </div>
    </div>
  );
};
