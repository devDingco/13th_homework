import './BoardsNew.css';
import React, { ChangeEvent, useState } from 'react';
import ErrorMsg from '../../../components/error.js'
import UploadFile from '../../../components/upload.js'

const BoardsNew = () => {

  // input state
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // error state
  const [errorUser, setErrorUser] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorTitle, setErrorTitle] = useState('')
  const [errorContent, setErrorContent] = useState('')

  // 등록하기버튼 비활성화
  const [isDisabled, setIsDisabled] = useState(true)

  const onChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value)

    if (event.target.value && password && title && content) return setIsDisabled(false)
    setIsDisabled(true)
  }

  const onChangePW = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    if (user && event.target.value && title && content) return setIsDisabled(false)
    setIsDisabled(true)
  }

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    if (user && password && event.target.value && content) return setIsDisabled(false)
    setIsDisabled(true)
  }

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    if (user && password && title && event.target.value) return setIsDisabled(false)
    setIsDisabled(true)
  }

  const onClickBtn = () => {
    if (user && password && title && content) alert("등록이 가능한 상태입니다.")

    if (!user) setErrorUser("필수입력 사항 입니다.")
    else setErrorUser("")

    if (!password) setErrorPassword("필수입력 사항 입니다.")
    else setErrorPassword("")


    if (!title) setErrorTitle("필수입력 사항 입니다.")
    else setErrorTitle("")

    if (!content) setErrorContent("필수입력 사항 입니다.")
    else setErrorContent("")
  }

  return (
    <div className="post-page">

      <div className="header">게시물 등록</div>

      <div className="post-main">

        <div className="user-box">
          <div className="input-group">
            <label className="input-label">작성자<span className="require"> *</span></label>
            <input type="text" name="user" className="input-box" placeholder="비밀번호를 입력해 주세요." onChange={onChangeUser} value={user} />
            <ErrorMsg errorMessage={errorUser} />
          </div>
          <div className="input-group">
            <label className="input-label">비밀번호<span className="require"> *</span></label>
            <input type="password" name="password" className="input-box" placeholder="비밀번호를 입력해 주세요." onChange={onChangePW} value={password} />
            <ErrorMsg errorMessage={errorPassword} />
          </div>
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label" >제목<span className="require"> *</span></label>
          <input type="text" className="input-box" name="title" placeholder="제목을 입력해 주세요." onChange={onChangeTitle} value={title} />
          <ErrorMsg errorMessage={errorTitle} />
        </div>

        <hr />

        <div className="input-group">
          <label className="input-label" >내용<span className="require"> *</span></label>
          <textarea className="content-input-box" name="content" placeholder="내용을 입력해 주세요." onChange={onChangeContent} value={content}></textarea>
          <ErrorMsg errorMessage={errorContent} />
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
          <label className="input-label" >유튜브 링크</label>
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
