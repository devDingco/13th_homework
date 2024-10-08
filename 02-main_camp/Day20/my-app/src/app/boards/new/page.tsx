"use client";
import { useState, ChangeEvent } from 'react';
import styles from './styles.module.css';

const NewPage = () => {
  const writerDescription = "작성자명을 입력해 주세요."
  const passwordDescription = "비밀번호를 입력해 주세요."
  const titleDescription = "제목을 입력해 주세요."
  const contentsDescription = "내용을 입력해 주세요."
  const youtubeLinkDescription = "링크를 입력해 주세요."

  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const errorMessage = "필수 입력 사항입니다."
  const [writerErrorMessage, setWriterErrorMessage] = useState(errorMessage)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(errorMessage)
  const [titleErrorMessage, setTitleErrorMessage] = useState(errorMessage)
  const [contentErrorMessage, setContentErrorMessage] = useState(errorMessage)

  const [isActive, setIsActive] = useState(false)

  function onChangeWriter(event: ChangeEvent<HTMLInputElement>) {
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
  
  function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
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
  
  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
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
  
  function onChangeContent(event: ChangeEvent<HTMLInputElement>) {
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

  function checkSpace(str: string) {
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
            <button className={styles.cancelButton}>취소</button>
            <button className={styles.submitButton} style={isActive ? submitButtonStyle : disabledSubmitButtonStyle}>등록하기</button>
        </>
    );
  }
  
  return (
      <div className={styles.BoardsNew_rootContainer}>
          <header className={styles.BoardsNew_header}>게시물 등록</header>
            <main className={styles.BoardsNew_main}>
            <div className={styles.BoardsNew_UserInputForm}>
                  {/* <BasicInputForm IInputProps />
                  <BasicInputForm IInputProps /> */}
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
          <footer className={styles.BoardsNew_footer}>
              <RegisterForm />
          </footer>
      </div>
  );
}

export default NewPage;

const BasicInputForm = (props: any) => {
  if (props.isRequired) {
      return (
          <div id={styles.PostInputForm} className={styles.BoardsNew_inputForm}>
              <div className={styles.inputTitle}>{props.title}<span className={styles.requiredMark}>*</span></div>
              <TextInput placeholder={props.placeholder} onChangeHandler={props.onChangeHandler} />
              <p className={styles.inputError}>{props.errorMessage}</p>
          </div>
      );        
  } else {
      return (
        <div id={styles.PostInputForm} className={styles.BoardsNew_inputForm}>
              <div className={styles.inputTitle}>{props.title}</div>
              <TextInput placeholder={props.placeholder} />
        </div>
      );
  }
}

const ContentsInputForm = (props: any) => {
  return (
      <div className={styles.BoardsNew_inputForm}>
          <div className={styles.inputTitle}>{props.title}<span className={styles.requiredMark}>*</span></div>
          <textarea className={styles.inputTextArea} placeholder={props.placeholder} onChange={props.onChangeHandler}></textarea>
          <p className={styles.inputError}>{props.errorMessage}</p>
      </div>
  );
}

const AddressInputForm = () => {
  const zipCodeDescription = "01234"
  const addressDescription = "주소를 입력해주세요."
  const detailAddressDescription = "상세 주소"

  return (
      <div className={styles.BoardsNew_inputForm}>
          주소
          <div className={styles.ZipCodeContainer}>
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
      <div className={styles.BoardsNew_inputForm}>
          사진 첨부
          <div className={styles.uploadButtonContainer}>
              <UploadButton />
              <UploadButton />
              <UploadButton />
          </div>
      </div>
  );
}

const TextInput = (props: any) => {
  return <input className={styles.inputText} type="text" placeholder={props.placeholder} onChange={props.onChangeHandler} />;
}

export const Divider = () => {
  return <div className={styles.divider}></div>;
}

const ZipCodeSearchButton = () => {
  return (
      <button className={styles.zipCodeSearchButton}>
          우편번호 검색
      </button>
  );
}

const UploadButton = () => {
  return (
      <div className={styles.uploadImageContainer}>
          <input type="file" id={styles.uploadImage} />
          <div className={styles.uploadDescription}>
              <label htmlFor="uploadImage" id={styles.uploadLabel}>
                  <img src="/assets/add.png" />
                  클릭해서 사진 업로드
              </label>
          </div>
      </div>
  );
}

interface IInputProps {
    isRequired: boolean;
    title: string;
    content: string;
    placeholder: string;
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}
