import './BoardsNew.css';
import React, { ChangeEvent, useState } from 'react';
import ErrorMsg from '../../../components/error.js'
import UploadFile from '../../../components/upload.js'

  // input state 타입정의
  interface IInputs {
    user: string;
    password: string;
    title: string;
    content: string;
  }
  // error state 타입정의
  interface IErrors {
    user?: string;
    password?: string;
    title?: string;
    content?: string;
  }

const BoardsNew = () => {
  // input state
  const [inputs, setInputs] = useState<IInputs>({ user: '', password: '', title: '', content: '' })
  // error state
  const [errors, setErrors] = useState<IErrors>({})
  // 등록하기버튼 비활성화
  const [isDisabled, setIsDisabled] = useState(true)

  const onChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newInputs = {
      ...inputs,
      [event.target.name]: event.target.value
    }
    setInputs(newInputs)

    // input state들의 값이 모두 빈 문자열이 아니면
    const allInputFilled = Object.values(newInputs).every(input => input !== '');
    setIsDisabled(!allInputFilled);
  }

  const onClickBtn = () => {
    // 에러 담을 객체
    const newErrors: IErrors = {}

    Object.keys(inputs).forEach((key) => {
      const inputKey = key as keyof IInputs
      // 각 input state가 빈 문자열이면 newErrors에 넣어주기
      if (!inputs[inputKey]) {
        newErrors[inputKey] = "필수입력 사항 입니다."
      }
    })

    // input중에 하나라도 입력 안되어있으면 error state에 newErrors 넣어주기
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({})
      alert("등록이 가능한 상태입니다!")
      setInputs({ user: '', password: '', title: '', content: '' })
    }
  }

  return (
    <div className="post-page">

      <div className="header">게시물 등록</div>

      <div className="post-main">

        <div className="user-box">
          <div className="input-group">
            <label className="input-label">작성자<span className="require"> *</span></label>
            <input type="text" name="user" className="input-box" placeholder="비밀번호를 입력해 주세요." onChange={onChangeInput} value={inputs.user} />
            <ErrorMsg errorMessage={errors.user} />
          </div>
          <div className="input-group">
            <label className="input-label">비밀번호<span className="require"> *</span></label>
            <input type="password" name="password" className="input-box" placeholder="비밀번호를 입력해 주세요." onChange={onChangeInput} value={inputs.password} />
            <ErrorMsg errorMessage={errors.password} />
          </div>
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label" >제목<span className="require"> *</span></label>
          <input type="text" className="input-box" name="title" placeholder="제목을 입력해 주세요." onChange={onChangeInput} value={inputs.title} />
          <ErrorMsg errorMessage={errors.title} />
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label" >내용<span className="require"> *</span></label>
          <textarea className="content-input-box" name="content" placeholder="내용을 입력해 주세요." onChange={onChangeInput} value={inputs.content}></textarea>
          <ErrorMsg errorMessage={errors.content} />
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
          <label className="input-label">유튜브 링크</label>
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
          <button onClick={onClickBtn} type="submit" className={isDisabled ? 'btn-register-disabled' : 'btn-register-active'} disabled={isDisabled}>등록하기</button>
        </div>
      </div>

    </div>
  );
}

export default BoardsNew;
