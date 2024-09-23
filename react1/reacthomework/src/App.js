import React, { useState } from 'react';
import './App.css';
import Address from './components/address';
import YoutubeLink from './components/youtuber';
import ImgUpload from './components/imageUpload';
import Button from './components/button';
import HrLine from './components/hrLine';
// import Toast from './components/toast';

const MainPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorAlert, setErrorAlert] = useState('');


    const handleValidation = () => {
        if (!name || !password || !title || !content) {
            setErrorAlert("필수등록 사항 입니다");
            return false;
        }
        setErrorAlert('');
        return true;
    };

    const handelSubmit = () => {
        if (handleValidation()) {
            console.log("성공");
        }
    };

    const handleReset = () => {
        setName('');
        setPassword('');
        setTitle('');
        setContent('');
    };

    const handelName = (e) => {
        setName(e.target.value);
    };

    const handelPassword = (e) => {
        setPassword(e.target.value)
    };

  const handleTitle = (e) => {
      setTitle(e.target.value);
  };

  const handleContent = (e) => {
      setContent(e.target.value);
  };
    
   


  return (
      <>
          <div className="container">
          <form style={{ border:'none'}}>
  <fieldset style={{ border:'none'}}>
      <legend>게시물 등록</legend>
                      <div className="form_control">
                          <div className="first_line">
                  <label htmlFor="name">작성자</label>
                              <input type="name" id="name" value={name} onChange={handelName} placeholder="작성자명을 입력해주세요" />
                              
                              </div>
                          <div className="first_line">
                  <label htmlFor="password">비밀번호</label>
                              <input type="password" id="password" value={password} onChange={handelPassword} placeholder="비밀번호를 입력해주세요" />
                              
                              </div>
                      </div>
                      <HrLine />
              <div className="form-content">
                  <label htmlFor="title">제목</label>
                  <input type="text" id="title" value={title} onChange={handleTitle} placeholder="제목을 입력해주세요" />
                      </div>
                      <HrLine />
          
              <div className="form-content">
                  <label htmlFor="content">내용</label>
                          <textarea id="content" value={content} onChange={handleContent} placeholder="내용을 입력해주세요"></textarea>
                          
              </div>
              {errorAlert && <div id="errorAlert" style={{ color: 'red' }}>{errorAlert}</div>}
           </fieldset>
          </form>
              <Address />
              <HrLine />
              <YoutubeLink />
              <HrLine />
              <ImgUpload />
              <Button onSubmit={handelSubmit }  onReset={handleReset}/>
              </div>
          </>
  )
};

export default MainPage;
