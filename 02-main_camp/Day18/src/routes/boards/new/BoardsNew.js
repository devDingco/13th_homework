import React from 'react';
import { Link } from 'react-router-dom'
import './BoardsNew.css';

const BoardsNew = () => {
  const writerDescription = "작성자명을 입력해 주세요."
  const passwordDescription = "비밀번호를 입력해 주세요."
  const titleDescription = "제목을 입력해 주세요."
  const contentsDescription = "내용을 입력해 주세요."
  const youtubeLinkDescription = "링크를 입력해 주세요."

  const [writer, setWriter] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")

  const errorMessage = "필수 입력 사항입니다."
  const [writerErrorMessage, setWriterErrorMessage] = React.useState(errorMessage)
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState(errorMessage)
  const [titleErrorMessage, setTitleErrorMessage] = React.useState(errorMessage)
  const [contentErrorMessage, setContentErrorMessage] = React.useState(errorMessage)

  const [isActive, setIsActive] = React.useState(false)

  function onChangeWriter(event) {
    const value = event.target.value
    setWriter(event.target.value)

    if (value && !checkSpace(value)) {
        setWriterErrorMessage("")
    } else {
        setWriterErrorMessage(errorMessage)
    }

    if (value && password && title && content) return setIsActive(true)
    return setIsActive(false)
  }
  
  function onChangePassword(event) {
    const value = event.target.value
    setPassword(event.target.value)

    if (value && !checkSpace(value)) {
        setPasswordErrorMessage("")
    } else {
        setPasswordErrorMessage(errorMessage)
    }

    if (writer && value && title && content) return setIsActive(true)
    return setIsActive(false)
  }
  
  function onChangeTitle(event) {
    const value = event.target.value
    setTitle(event.target.value)

    if (value && !checkSpace(value)) {
        setTitleErrorMessage("")
    } else {
        setTitleErrorMessage(errorMessage)
    }

    if (writer && password && value && content) return setIsActive(true)
    return setIsActive(false)
  }
  
  function onChangeContent(event) {
    const value = event.target.value
    setContent(event.target.value)

    if (value && !checkSpace(value)) {
        setContentErrorMessage("")
    } else {
        setContentErrorMessage(errorMessage)
    }

    if (writer && password &&  title && value) return setIsActive(true)
    return setIsActive(false)
  }

  function checkSpace(str) {
    if (str.search(/\s/) != -1) return true
    return false
  }

  const RegisterForm = () => {
    const disabledSubmitButtonStyle = {
        backgroundColor: "#C7C7C7",
        color: "#E4E4E4",
        disabled: "true"
    }

    const submitButtonStyle = {
        backgroundColor: "#2974E5",
        color: "#FFFFFF",
        disabled: "false"
    }

    return (
        <>
            <button className="cancelButton">취소</button>
            <button className="submitButton" style={isActive ? submitButtonStyle : disabledSubmitButtonStyle}>등록하기</button>
        </>
    );
  }

  return (
      <div className="rootContainer">
          <header>게시물 등록</header>
          <main>
              <div className="UserInputForm">
                  <BasicInputForm isRequired={true} title="작성자" placeholder={writerDescription} onChangeHandler={onChangeWriter} errorMessage={writerErrorMessage}/>
                  <BasicInputForm isRequired={true} title="비밀번호" placeholder={passwordDescription} onChangeHandler={onChangePassword} errorMessage={passwordErrorMessage}/>
              </div>
              <Divider />
              <BasicInputForm isRequired={true} title="제목" placeholder={titleDescription} onChangeHandler={onChangeTitle} errorMessage={titleErrorMessage}/>
              <Divider />
              <ContentsInputForm title="내용" placeholder={contentsDescription} onChangeHandler={onChangeContent} errorMessage={contentErrorMessage}/>
              <AddressInputForm />
              <Divider />
              <BasicInputForm isRequired={false} title="유튜브 링크" placeholder={youtubeLinkDescription}/>
              <Divider /> 
              <PhotoUploadForm />
          </main>
          <footer>
              <RegisterForm />
          </footer>
      </div>
  );
}

export default BoardsNew;

const BasicInputForm = (props) => {
  if (props.isRequired) {
      return (
          <div id="PostInputForm" className="inputForm">
              <div className="inputTitle">{props.title}<span className="requiredMark">*</span></div>
              <TextInput placeholder={props.placeholder} onChangeHandler={props.onChangeHandler} />
              <p className="inputError">{props.errorMessage}</p>
          </div>
      );        
  } else {
      return (
          <div id="PostInputForm" className="inputForm">
              <div className="inputTitle">{props.title}</div>
              <TextInput placeholder={props.placeholder} />
          </div>
      );
  }
}

const ContentsInputForm = (props) => {
  return (
      <div className="inputForm">
          <div className="inputTitle">{props.title}<span className="requiredMark">*</span></div>
          <textarea className="inputTextArea" placeholder={props.placeholder} onChange={props.onChangeHandler}></textarea>
          <p className="inputError">{props.errorMessage}</p>
      </div>
  );
}

const AddressInputForm = () => {
  const zipCodeDescription = "01234"
  const addressDescription = "주소를 입력해주세요."
  const detailAddressDescription = "상세 주소"

  return (
      <div className="inputForm">
          주소
          <div className="ZipCodeContainer">
              <TextInput placeholder={zipCodeDescription} />
              <ZipCodeSearchButton />
          </div>
          <TextInput placeholder={addressDescription} />
          <TextInput placeholder={detailAddressDescription} />
      </div>
  );
}

const PhotoUploadForm = () => {
  return (
      <div className="inputForm">
          사진 첨부
          <div className="uploadButtonContainer">
              <UploadButton />
              <UploadButton />
              <UploadButton />
          </div>
      </div>
  );
}

const TextInput = (props) => {
  return <input className="inputText" type="text" placeholder={props.placeholder} onChange={props.onChangeHandler} />;
}

const Divider = () => {
  return <div className="divider"></div>;
}

const ZipCodeSearchButton = () => {
  return (
      <button className="zipCodeSearchButton">
          우편번호 검색
      </button>
  );
}

const UploadButton = () => {
  return (
      <div className="uploadImageContainer">
          <input type="file" id="uploadImage" />
          <div className="uploadDescription">
              <label htmlFor="uploadImage" id="uploadLabel">
                  <img src="../public/add.png" />
                  클릭해서 사진 업로드
              </label>
          </div>
          
      </div>
  );
}

