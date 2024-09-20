import './App.css';
import React from 'react';

function App() {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [error, setError] = React.useState('');

  const openUploadImg = (id) => {
    document.getElementById(id).click();
  };

  //작성자 핸들러 함수
  const handleChangeUser = (e) => {
    setUser(e.target.value);
    if (user)
      return (document.getElementsByClassName('errorMsg')[0].style.display =
        'none');
  };

  //비밀번호 핸들러 함수

  const handleChangePw = (e) => {
    setPassword(e.target.value);
    if (password)
      return (document.getElementsByClassName('errorMsg')[1].style.display =
        'none');
  };

  //제목 핸들러 함수
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    if (title)
      return (document.getElementsByClassName('errorMsg')[2].style.display =
        'none');
  };

  //내용 핸들러 함수
  const handleChangeContent = (e) => {
    setContent(e.target.value);
    if (content)
      return (document.getElementsByClassName('errorMsg')[3].style.display =
        'none');
  };

  //등록하기 함수
  const registerFunc = (e) => {
    e.preventDefault();

    if (user && password && content && title) {
      alert('게시글 등록이 가능한 상태입니다!');
      return;
    } else {
      alert('필수 입력 사항을 확인해주세요.');
      window.scrollTo({ top: 0 });
    }

    const errors = [];

    if (!user) errors.push('user');
    if (!password) errors.push('password');
    if (!title) errors.push('title');
    if (!content) errors.push('content');

    //에러있을경우
    if (errors.length > 0) {
      setError('필수 입력 사항입니다.');
    }

    document.querySelectorAll('.errorMsg').forEach((el) => {
      if (errors.includes(el.getAttribute('data-field'))) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  };
  return (
    <form id="contentContainer" onSubmit={registerFunc}>
      <h3>게시물 등록</h3>

      <div className="block">
        <div className="semi_block">
          <p>
            작성자<span> *</span>
          </p>
          <div>
            <input
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={handleChangeUser}
            />
            <div className="errorMsg" data-field="user">
              {error}
            </div>
          </div>
        </div>
        <div className="semi_block">
          <p>
            비밀번호<span> *</span>
          </p>
          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={handleChangePw}
            />
            <div className="errorMsg" data-field="password">
              {error}
            </div>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="semi_block">
          <p>
            제목<span> *</span>
          </p>
          <div>
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={handleChangeTitle}
            />
            <div className="errorMsg" data-field="title">
              {error}
            </div>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="semi_block">
          <p>
            내용<span> *</span>
          </p>
          <div>
            <textarea
              placeholder="내용을 입력해주세요."
              rows="8"
              onChange={handleChangeContent}
            ></textarea>
            <div className="errorMsg" data-field="content">
              {error}
            </div>
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
            <div
              className="photoDiv"
              onClick={() => openUploadImg('fileInput1')}
            >
              <p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/add.svg`}
                  alt="추가버튼"
                />
              </p>
              <span>클릭해서 사진 업로드</span>
              <input type="file" id="fileInput1" style={{ display: 'none' }} />
            </div>
            <div
              className="photoDiv"
              onClick={() => openUploadImg('fileInput2')}
            >
              <p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/add.svg`}
                  alt="추가버튼"
                />
              </p>
              <span>클릭해서 사진 업로드</span>
              <input type="file" id="fileInput2" style={{ display: 'none' }} />
            </div>
            <div
              className="photoDiv"
              onClick={() => openUploadImg('fileInput3')}
            >
              <p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/add.svg`}
                  alt="추가버튼"
                />
              </p>
              <span>클릭해서 사진 업로드</span>
              <input type="file" id="fileInput3" style={{ display: 'none' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="btns">
        <button className="cancelBtn">취소</button>
        <button className="registerBtn">등록하기</button>
      </div>
    </form>
  );
}

export default App;
