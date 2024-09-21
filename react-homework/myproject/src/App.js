import './App.css';
import UploadFile from './components/upload';
import { useState } from 'react';

function App() {

  // input state
  const [inputs, setInputs] = useState({ user: '', password: '', title: '', comment: '' })
  // error state
  const [errors, setErrors] = useState({})

  const onChangeInput = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }

  const onClickBtn = () => {
    // 에러 담을 객체
    const newErrors = {}

    Object.keys(inputs).forEach((key) => {
      // 각 input state가 빈 문자열이면 newErrors에 넣어주기
      if (!inputs[key]) {
        newErrors[key] = "필수입력 사항 입니다."
      }
    })

    // input중에 하나라도 입력 안되어있으면 error state에 newErrors 넣어주기
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({})
      alert("가입이 가능한 상태입니다!")
    }
  }

  return (
    <div className="post-page">

      <div className="header">게시물 등록</div>

      <div className="post-main">

        <div className="user-box">
          <div className="input-group">
            <label className="input-label">작성자<span className="require"> *</span></label>
            <input type="text" name="user" className="input-box" placeholder="작성자 명을 입력해 주세요." onChange={onChangeInput} value={inputs.user} />
            {errors.user && <span className='error-msg'>{errors.user}</span>}
          </div>
          <div className="input-group">
            <label className="input-label">비밀번호<span className="require"> *</span></label>
            <input type="password" name="password" className="input-box" placeholder="비밀번호를 입력해 주세요." onChange={onChangeInput} value={inputs.password} />
            {errors.password && <span className='error-msg'>{errors.password}</span>}
          </div>
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label" >제목<span className="require"> *</span></label>
          <input type="text" className="input-box" name="title" placeholder="제목을 입력해 주세요." onChange={onChangeInput} value={inputs.title} />
          {errors.title && <span className='error-msg'>{errors.title}</span>}
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label" >내용<span className="require"> *</span></label>
          <textarea type="text" className="content-input-box" name="comment" placeholder="내용을 입력해 주세요." onChange={onChangeInput} value={inputs.comment}></textarea>
          {errors.comment && <span className='error-msg'>{errors.comment}</span>}
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
          <button onClick={onClickBtn} type="submit" className="btn-register">등록하기</button>
        </div>
      </div>

    </div>
  );
}

export default App;
