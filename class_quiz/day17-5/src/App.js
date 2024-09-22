import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import HrLine from './components/hrLine';
import KakaoBtn from './components/KakaoBtn';
import MyInfoFind from './components/MyInfoFind';

function App() {
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordCheck = /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;

  const handleEmailOnchange = (e) => {
    const emailIsValid = e.target.value.trim();
    setEmail(emailIsValid);

    setEmailIsValid(emailCheck.test(emailIsValid));
    
  };

  const handlePasswordOnchange = (e) => {
    const passwordIsValid = e.target.value.trim();
    setPassword(passwordIsValid);

    if (passwordIsValid < 8 || !passwordCheck.test(passwordIsValid)) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  };

  const handleLoggin = () => {
    const isEmailValid = emailCheck.test(email.trim());
    const isPasswordValid = password.length >= 8 && passwordCheck.test(password.trim());

    setEmailIsValid(isEmailValid);
    setPasswordIsValid(isPasswordValid);
    setFormSubmit(true);

    if (isEmailValid && isPasswordValid) {
      console.log("성공");
    } else {
      console.log("입력실수");
    }
  }

  return (
    <>
      <div className='container'>
        <header className='location'>
          <div className='img1'><img src='/images/mapImg.png' alt='위치'/></div>
          <div className='img2'><img src='/images/mapBase.png' alt='받침대'/></div>
        </header>
<div className='title'>잇츠로드</div>
      <div className='inputContainer'>
        <div className='inputContent'>
            <label htmlFor="email"></label>
            <input type="email" id="email" value={email} onChange={handleEmailOnchange} />
            <div className='deleteBtn'> <img src='/images/deleteBtn.png' alt='삭제'/></div> 
          </div>
          <HrLine/>
        {!emailIsValid && formSubmit ? (<div className='errorMessage'>이메일 주소를 다시 확인해주세요.</div> ) : null}
        <div className='inputContent'>
        <label htmlFor="password"></label>
            <input type="password" id="password" value={password} onChange={handlePasswordOnchange} />
            <div className='deleteBtn'> <img src='/images/deleteBtn.png' alt='삭제'/></div> 
          </div>
          <HrLine/>
        {!passwordIsValid && formSubmit ? (<div className='errorMessage'>8~16자의 영문, 숫자, 특수 문자만 사용 가능합니다.</div> ) : null}
      </div>
        <Button onClick={handleLoggin} />
        <MyInfoFind/>
       <KakaoBtn onClick={()=>console.log("카카오")}/>
        </div>
    </>
  );
}

export default App;
