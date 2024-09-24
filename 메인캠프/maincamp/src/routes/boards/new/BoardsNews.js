import { useState } from 'react';

const BoardsNews = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const [isActive, setIsActive] = useState(false);

  const openUploadImg = (id) => {
    document.getElementById(id).click();
  };

  // 처음에 모든 값을 입력하여 등록함수가 활성화된 후, 입력값을 다시 지웠을때 등록함수가 비활성화되게 하기 위한 함수(나중에 useEffect를 배우고 나면 그거로 적용해도 되지 않을까 싶습니다.)
  // 모든 필드가 입력되었는지 확인하기 위한 함수
  const checkAllField = (user, password, title, content) => {
    if (user && password && title && content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  //작성자 핸들러 함수
  const handleChangeUser = (e) => {
    const value = e.target.value;
    setUser(value); //상태 비동기 업데이트
    if (value) {
      document.getElementsByClassName('errorMsg')[0].style.display = 'none';
    }

    // 값 없으면 등록함수 비활성화
    checkAllField(value, password, title, content); //이전상태의 user로 확인, 상태 업데이트 후에 항상 호출될 수 있게
  };

  //비밀번호 핸들러 함수

  const handleChangePw = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      document.getElementsByClassName('errorMsg')[1].style.display = 'none';
    }

    checkAllField(user, value, title, content);
  };

  //제목 핸들러 함수
  const handleChangeTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (value) {
      document.getElementsByClassName('errorMsg')[2].style.display = 'none';
    }

    checkAllField(user, password, value, content);
  };

  //내용 핸들러 함수
  const handleChangeContent = (e) => {
    const value = e.target.value;
    setContent(value);
    if (value) {
      document.getElementsByClassName('errorMsg')[3].style.display = 'none';
    }

    checkAllField(user, password, title, value);
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
    <form className="container" id="contentContainer" onSubmit={registerFunc}>
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
        <button
          className="registerBtn"
          disabled={!isActive}
          style={{
            background: isActive ? '#2974e5' : 'gray',
            color: isActive ? 'white' : 'black',
          }}
        >
          등록하기
        </button>
      </div>
    </form>
  );
};
export default BoardsNews;
