// import logo from './logo.svg';
// import '../../../App.css';
import './BoardsNew.css'
import {ChangeEvent, MouseEvent, useState} from 'react'

const BoardsNew = () => {

  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState("")

  const [subject, setSubject] = useState("")
  const [subjectError, setSubjectError] = useState("")

  const [isActive, setIsActive] = useState(false)

  // 리팩토링 전
  // const onChangeName = (event) => {
  //   setName(event.target.value)

  //   if(event.target.value !== "" && password !== "" && title !== "" && subject !== ""){
  //     setIsActive(true)
  //   }
  //   else{
  //     setIsActive(false)
  //   }
  // }
  // const onChangePassword = (event) => {
  //   setPassword(event.target.value)

  //   if(name !== "" && event.target.value !== "" && title !== "" && subject !== ""){
  //     setIsActive(true)
  //   }
  //   else{
  //     setIsActive(false)
  //   }
  // }
  // const onChangeTitle = (event) => {
  //   setTitle(event.target.value)

  //   if(name !== "" && password !== "" && event.target.value !== "" && subject !== ""){
  //     setIsActive(true)
  //   }
  //   else{
  //     setIsActive(false)
  //   }
  // }
  // const onChangeSubject = (event) => {
  //   setSubject(event.target.value)

  //   if(name !== "" && password !== "" && title !== "" && event.target.value !== ""){
  //     setIsActive(true)
  //   }
  //   else{
  //     setIsActive(false)
  //   }
  // }

  // 리팩토링 후 early-exit 패턴
  const onChangeName = (event:ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)

    if(event.target.value !== "" && password !== "" && title !== "" && subject !== "") return setIsActive(true)
    setIsActive(false)
  }
  const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)

    if(name !== "" && event.target.value !== "" && title !== "" && subject !== "") return setIsActive(true)
    setIsActive(false)
  }
  const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)

    if(name !== "" && password !== "" && event.target.value !== "" && subject !== "") return setIsActive(true)
    setIsActive(false)
  }
  const onChangeSubject = (event:ChangeEvent<HTMLTextAreaElement>) => {
    setSubject(event.target.value)

    if(name !== "" && password !== "" && title !== "" && event.target.value !== "") return setIsActive(true)
    setIsActive(false)
  }

  let registerError = false;

  const register = (event:MouseEvent<HTMLButtonElement>) => {
    if(name.trim() === ""){
      setNameError("필수입력 사항 입니다.")
      registerError = true;
    }
    else{
      setNameError("")
    }

    if(password.trim() === ""){
      setPasswordError("필수입력 사항 입니다.")
      registerError = true;
    }
    else{
      setPasswordError("")
    }

    if(title.trim() === ""){
      setTitleError("필수입력 사항 입니다.")
      registerError = true;
    }
    else{
      setTitleError("")
    }

    if(subject.trim() === ""){
      setSubjectError("필수입력 사항 입니다.")
      registerError = true;
    }
    else{
      setSubjectError("")
    }

    if(!registerError){
      alert("게시글 등록이 가능한 상태입니다.")
    }
  }

  const registerColor = {
    backgroundColor:"#c3c3c3",
    color:"#E4E4E4;"
  }
  const registerActive = {
    backgroundColor:"#2974E5",
    color:"#fff;"
  }

  return (
      <div className="content">
          <h1>게시글등록</h1>
          <div className="name_pw_bg flex-bw">
              <div>
                  <span>작성자</span><span className="red">*</span>
                  <input type="text" placeholder="작성자 명을 입력하세요." onChange={onChangeName}></input>
                  <div className="error">{nameError}</div>
              </div>
              <div>
                  <span>비밀번호</span><span className="red">*</span>
                  <input type="password" placeholder="비밀번호를 입력해 주세요." onChange={onChangePassword}></input>
                  <div className="error">{passwordError}</div>
              </div>
          </div>
          <div className="title">
              <span>제목</span><span className="red">*</span>
              <input className="d-block" type="text" placeholder="제목을 입력해 주세요." onChange={onChangeTitle}></input>
              <div className="error">{titleError}</div>
          </div>
          <div className="subject">
              <span>내용</span><span className="red">*</span>
              <textarea className="d-block" placeholder="내용을 입력해 주세요." onChange={onChangeSubject}></textarea>
              <div className="error">{subjectError}</div>
          </div>
          <div className="address">
              <p>주소</p>
              <div className="address_top">
                  <input type="text" placeholder="01234"></input>
                  <button>우편번호 검색</button>
              </div>
              <input className="d-block" type="text" placeholder="주소를 입력해 주세요."></input>
              <input type="text" placeholder="상세주소"></input>
          </div>
          <div className="link">
              <p>유튜브 링크</p>
              <input type="text" placeholder="링크를 입력해 주세요."></input>
          </div>
          <div className="picture">
              <p>사진 첨부</p>
              <div>
                  <button></button>
                  <button></button>
                  <button></button>
              </div>
          </div>
          <div className="bt_button">
              <button>취소</button>
              <button onClick={register} style={isActive === true ? registerActive : registerColor}>등록하기</button>
          </div>
      </div>
  )
}

export default BoardsNew;
