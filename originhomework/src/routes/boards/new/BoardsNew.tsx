import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import './BoardsNew.css';


const BoardsNew = () => {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAllFilled, setIsAllFilled] = useState(false)

  useEffect(() => {
    if (author && password && title && content) {
        setIsAllFilled(true)
    } else {
        setIsAllFilled(false)
    }
  }, [author, password, title, content])
  

  const hideErrorText = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'none';
    }
};


  const authorOnchange = (event: ChangeEvent<HTMLInputElement>) => {
      setAuthor(event.target.value);
      hideErrorText('authorRedText');
  };
  const passwordOnchange = (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      hideErrorText('passwordRedText');
  };
  const titleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
      hideErrorText('titleRedText');
  };
  const contentOnchange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
      hideErrorText('contentRedText');
  };

  const signupButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      
      let isValid = true;
  
      if (author === "") {
        const authorElement = document.getElementById('authorRedText')
        if (authorElement) {
            authorElement.style.display = 'block';
        }
          isValid = false;
      }
      if (password === "") {
        const passwordElement = document.getElementById('passwordRedText')
        if (passwordElement) {
            passwordElement.style.display = 'block'
        }
          isValid = false;
      }
      if (title === "") {
        const titleElement = document.getElementById('titleRedText')
        if (titleElement) {
            titleElement.style.display = 'block'
        }
          isValid = false;
      }
      if (content === "") {
        const contentElement = document.getElementById('contentRedText')
        if (contentElement) {
            contentElement.style.display = 'block'
        }
          isValid = false;
      }
  
      if (isValid) {
          alert("게시글 등록이 가능한 상태입니다.");
      }
  };
  
return (
    <div className="container">
        <div className="titleContainer">
            <div className="title">게시글 등록</div>
        </div>
        <div className="formContainer">
            <form>
                <div className="box">
                    <div className="labelContainer">
                        <label>작성자  <span className="emphasize">*</span> </label>
                        <input className="input1" type="text" onChange={authorOnchange}/>
                        <div id="authorRedText" className="error-text">필수 입력 사항입니다</div>
                    </div>
                    <div className="labelContainer">
                        <label>비밀번호 <span className="emphasize">*</span> </label>
                        <input className="input1" type="password" onChange={passwordOnchange}/>
                        <div id="passwordRedText" className="error-text">필수 입력 사항입니다</div>
                    </div>
                </div>

                <div className="box">
                    <div className="labelContainer2">
                        <label>제목 <span className="emphasize">*</span> </label>
                        <input className="input2" type="text" onChange={titleOnchange}/>
                        <div id="titleRedText" className="error-text">필수 입력 사항입니다</div>
                    </div>
                </div>

                <div className="box">
                    <div className="labelContainer2">
                        <label>내용 <span className="emphasize">*</span> </label>
                        <textarea onChange={contentOnchange}/>
                        <div id="contentRedText" className="error-text">필수 입력 사항입니다</div>
                    </div>
                </div>

                <div className="columnBox">
                    <label>주소</label>
                    <div className="zipAndButtonContainer">
                        <input className="zipNum" type="text"/> <button className="searchZipNum">우편번호 검색</button>
                    </div>
                    <input className="input2" type="text"/>
                    <input className="input2" type="text"/>
                </div>

                <div className="box">
                    <div className="labelContainer2">
                        <label>유튜브 링크</label>
                        <input className="input2" type="text"/>
                    </div>
                </div>
                <div className='boxEnd'>
                    <div className="labelContainer2">
                        <label>사진 첨부</label>
                        <div className="photoBoxContainer">
                            <div className='flexbox2'>
                                <div className="photoBox">
                                    <img src="/image/add.png" alt=''/>
                                    <div className="photoBoxText">클릭해서 사진 업로드</div>
                                </div>    
                            </div>
                            <div className='flexbox2'>
                                <div className="photoBox">
                                    <img src='/image/add.png' alt=''/>
                                    <div className="photoBoxText">클릭해서 사진 업로드</div>
                                </div>    
                            </div>
                            <div className='flexbox2'>
                                <div className="photoBox">
                                    <img src='/image/add.png' alt=''/>
                                    <div className="photoBoxText">클릭해서 사진 업로드</div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>


                <div className="buttonContainer">
                    <button className="cancelButton">취소</button>
                    <button className={isAllFilled ? 'submitButton_active' : 'submitButton'} type="submit" onClick={signupButtonHandler}>등록하기</button>
                </div>
            </form>
        </div>
</div>
);
}

export default BoardsNew
