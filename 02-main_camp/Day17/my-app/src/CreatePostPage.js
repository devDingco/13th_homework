import React from 'react';
import './CreatePostPage.css';

const CreatePostPage = () => {
  const writerDescription = "작성자명을 입력해 주세요."
  const passwordDescription = "비밀번호를 입력해 주세요."
  const titleDescription = "제목을 입력해 주세요."
  const contentsDescription = "내용을 입력해 주세요."
  const youtubeLinkDescription = "링크를 입력해 주세요."

  const [writer, setWriter] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [contents, setContents] = React.useState("")

  const errorMessage = "필수 입력 사항입니다."
  const [writerErrorMessage, setWriterErrorMessage] = React.useState(errorMessage)
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState(errorMessage)
  const [titleErrorMessage, setTitleErrorMessage] = React.useState(errorMessage)
  const [contentsErrorMessage, setContentsErrorMessage] = React.useState(errorMessage)

  function onChangeWriter(event) {
    console.log(event.target.value)
    setWriter(event.target.value)
    checkInputText()
  }
  
  function onChangePassword(event) {
    setPassword(event.target.value)
    const result = event.target.value
    checkInputText(result)
    console.log(password === "")
    console.log(password.length)
  }
  
  function onChangeTitle(event) {
    checkInputText()
    setTitle(event.target.value)
    // console.log(event.target.value)
    
  }
  
  function onChangeContents(event) {
    checkInputText()
    setContents(event.target.value)
    // console.log(event.target.value)
  }

  function checkInputText() {
    if (writer === "") {
        setWriterErrorMessage(errorMessage)
    }  else {
        setWriterErrorMessage("")
    }

    if (password === "") {
        setPasswordErrorMessage(errorMessage)
    } else {
        setPasswordErrorMessage("")
    }

    if (title === "") {
        setTitleErrorMessage(errorMessage)
    } else {
        setTitleErrorMessage("")
    }

    if (contents === "") {
        setContentsErrorMessage(errorMessage)
    } else {
        setContentsErrorMessage("")
    }

    if (writer !== "" && password !== "" && title !== "" && contents !== "") {
      alert("모든 항목의 입력이 완료되어, 게시글 등록이 가능합니다.")
    } 
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
              <ContentsInputForm title="내용" placeholder={contentsDescription} onChangeHandler={onChangeContents} errorMessage={contentsErrorMessage}/>
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

export default CreatePostPage;

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


const RegisterForm = () => {
    return (
        <>
            <button className="cancelButton">취소</button>
            <button className="submitButton">등록하기</button>
        </>
    );
  }