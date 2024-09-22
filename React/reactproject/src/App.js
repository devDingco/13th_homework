import png from './assets/addimage.png'
import './App.css';
import React from 'react';

const HtmlInput = ({ label, type, id, placeholder, name, onChange}) => {
  return (
  <div>
    <label htmlFor={id} className={`css_${name}tag`}>{label}</label>
    <input type={type} id={id} name={id} placeholder={placeholder} className={`css_${name}input`} onChange={onChange}/>
  </div>
  );
};    

const Button = ({type, value, name}) => {
  return (
    <div>
      <input type={type} name={name} value={value} className={`css_${name}`} />
    </div>
  )
}


const App = () => {

  const[name, setName] = React.useState("")

  const[password, setPassword] = React.useState("")

  const[title, setTitle] = React.useState("")

  const[content, setContent] = React.useState("")
  
  const[nameblank, setNameBlank] = React.useState("")

  const[passwordblank, setPasswordBlank] = React.useState("")

  const[titleblank, setTitleBlank] = React.useState("")

  const[contentblank, setContentBlank] = React.useState("")

  const onChangeName = (event) => {
    console.log(event.target.value)
    setName(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  
  const onChangeContent = (event) => {
    setContent(event.target.value)
  }


  const onClickSignup = (event) => {
      if(name === ("")) {
        setNameBlank("필수입력 사항입니다.")
      }  
      if (password === ("")) {
        setPasswordBlank("필수입력 사항입니다.")
      }  
      if(title === ("")) {
        setTitleBlank("필수입력 사항입니다.")
      }  
      if(content === ("")){
        setContentBlank("필수입력 사항입니다.")
      } 
      else {
        alert("게시글 등록 완료")
      }
  }

  return (
      <div className="css_input">

          {/* 작성란 헤더 */}
          <div className="css_inputtop">
              {/* 작성자 */}
              <div className="css_writer">
                  <HtmlInput label="작성자" type="text" id="name_id" placeholder="작성자 명을 입력해 주세요." name="name" onChange={onChangeName}/>
                  <div className='css_blankerror'>{nameblank}</div>
              </div>
              {/* 비밀번호 */}
              <div className="css_password">
                  <HtmlInput label="비밀번호" type="password" id="pwd_id" placeholder="비밀번호를 입력해 주세요." name="pwd" onChange={onChangePassword}/>
                  <div className='css_blankerror'>{passwordblank}</div>
              </div>
          </div>
          <hr></hr>
        

          {/* 제목 */}
          <div className="css_titletop">
              <div className="css_title">
                  <label htmlFor="title_id" className="css_titletag">제목</label>
                  <HtmlInput type="text" id="title_id" placeholder="제목을 입력해 주세요." name="title" onChange={onChangeTitle}/>
                  <div className='css_blankerror'>{titleblank}</div>
              </div>
          </div>
          <hr></hr>
         
          {/* 내용 */}
          <div className="css_contenttop">
              <div className="css_content">
                  <label htmlFor="content_id" className="css_contenttag">내용</label>
                  <HtmlInput type="text" id="content_id" placeholder="내용을 입력해 주세요." name="content" onChange={onChangeContent}/>
                  <div className='css_blankerror'>{contentblank}</div>
              </div>
          </div>

          {/* 주소 */}
          <div className="css_address">
              <label htmlFor="addressnum_id" className="css_addressnumtag">주소</label>
              <div className="css_addressnum">
                  <HtmlInput type="text" id="addressnum_id" placeholder="01234" name="addressnum"/>
                  <Button type="button" value="우편번호 검색" name="search" />
              </div>
              <HtmlInput type="text" id="address_id" placeholder="주소를 입력해 주세요." name="address"/>
              <HtmlInput type="text" id="addressdetail_id" placeholder="상세주소" name="addressdetail"/>
          </div>

          <hr></hr>

          {/* 링크 */}
          <div className="css_link">
              <label htmlFor="link_id" className="css_linktag">링크</label>
              <HtmlInput type="text" id="link_id" placeholder="링크를 입력해 주세요." name="link"/>
          </div>
          <hr></hr>


          {/* 사진 첨부 */}
          <div className="css_picturepart">
              <div>사진 첨부</div>
              <div className="css_picture">
                  <img src={png} alt='png'/>
                  <img src={png} alt='png'/>
                  <img src={png} alt='png'/>
              </div>
          </div>

          {/* 하단 버튼 */}
          <div className="css_button">
              <button className="css_cancelbutton">취소</button>
              <button className="css_submitbutton" onClick={onClickSignup}>등록하기</button>
          </div>
      </div>
  );
};



export default App;
