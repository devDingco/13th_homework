import React from 'react';
import addimage from '../assets/addimage.png'
import Input from './commons/Input';
import Button from './commons/Button';


function WriteBoard () {
    const[name, setName] = React.useState("")

    const[password, setPassword] = React.useState("")
  
    const[title, setTitle] = React.useState("")
  
    const[content, setContent] = React.useState("")
    
    const[nameblank, setNameBlank] = React.useState("")
  
    const[passwordblank, setPasswordBlank] = React.useState("")
  
    const[titleblank, setTitleBlank] = React.useState("")
  
    const[contentblank, setContentBlank] = React.useState("")
  
    const[isActive, setIsActive] = React.useState(false)

    const[addressnumber, setaddressnumber] = React.useState("")

    const[address, setaddress] = React.useState("")

    const[addressdetail, setaddressdetail] = React.useState("")

    



  
    const onChangeName = (event) => {
      setName(event.target.value)
      if(event.target.value !== ("") && title !== ("") && content !== ("") && password !== ("") && addressnumber !== "" && address !== "" && addressdetail !== "") {
        return setIsActive(true)
      } else {
        setIsActive(false)
      }
    }
  
    const onChangePassword = (event) => {
      setPassword(event.target.value)
      if(name !== ("") && title !== ("") && content !== ("") && event.target.value !== ("") && addressnumber !== "" && address !== "" && addressdetail !== "") {
        return setIsActive(true)
      } else {
        setIsActive(false)
      }
    }
  
    const onChangeTitle = (event) => {
      setTitle(event.target.value)
      if(name !== ("") && event.target.value !== ("") && content !== ("") && password !== ("") && addressnumber !== "" && address !== "" && addressdetail !== "") {
        return setIsActive(true)
      } else {
        setIsActive(false)
      }
    }
    
    const onChangeContent = (event) => {
      setContent(event.target.value)
      if(name !== "" && password !== "" && title !== "" && event.target.value !== "" && addressnumber !== "" && address !== "" && addressdetail !== "") {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }
  
    const onChangeAddressNumber = (event) => {
      setaddressnumber(event.target.value)
      if(name !== "" && password !== "" && title !== "" && content !== "" && event.target.value !== "" && address !== "" && addressdetail !== "") {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }

    const onChangeAddress = (event) => {
      setaddress(event.target.value)
      if(name !== "" && password !== "" && title !== "" && content !== "" && event.target.value !== "" && addressnumber !== "" && addressdetail !== "") {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }

    const onChangeAddressDetail = (event) => {
      setaddressdetail(event.target.value)
      if(name !== "" && password !== "" && title !== "" && content !== "" && event.target.value !== "" && addressnumber !== "" && address !== "") {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }



  
    const onClickSignup = (event) => {
  
        if(name === ("")) {
          setNameBlank("필수입력 사항입니다.")
        } else {
          setNameBlank("")
        }
        if(password === ("")) {
          setPasswordBlank("필수입력 사항입니다.")
        } else {
          setPasswordBlank("")
        }
        if(title === ("")) {
          setTitleBlank("필수입력 사항입니다.")
        } else {
          setTitleBlank("")
        }
        if(content === ("")){
          setContentBlank("필수입력 사항입니다.")
        } else {
          setContentBlank("")
        }
        if(name !== ("") && title !== ("") && content !== ("") && password !== ("") && addressdetail !== "" && addressnumber !== "" && address !== "") {
          alert("게시글 등록 완료")
        }
    }

    return(
      <div className="css_layout"> 
        <div className="css_header">게시글 등록</div>
          <div className="css_input">

          {/* 작성란 헤더 */}
          <div className="css_inputtop">
              {/* 작성자 */}
              <div className="css_writer">
                  <Input label="작성자" type="text" id="name_id" placeholder="작성자 명을 입력해 주세요." name="name" onChange={onChangeName}/>
                  <div className='css_blankerror'>{nameblank}</div>
              </div>
              {/* 비밀번호 */}
              <div className="css_password">
                  <Input label="비밀번호" type="password" id="pwd_id" placeholder="비밀번호를 입력해 주세요." name="pwd" onChange={onChangePassword}/>
                  <div className='css_blankerror'>{passwordblank}</div>
              </div>
          </div>
          <hr></hr>
        

          {/* 제목 */}
          <div className="css_titletop">
              <div className="css_title">
                  <label htmlFor="title_id" className="css_titletag">제목</label>
                  <Input type="text" id="title_id" placeholder="제목을 입력해 주세요." name="title" onChange={onChangeTitle}/>
                  <div className='css_blankerror'>{titleblank}</div>
              </div>
          </div>
          <hr></hr>
        
          {/* 내용 */}
          <div className="css_contenttop">
              <div className="css_content">
                  <label htmlFor="content_id" className="css_contenttag">내용</label>
                  <Input type="text" id="content_id" placeholder="내용을 입력해 주세요." name="content" onChange={onChangeContent}/>
                  <div className='css_blankerror'>{contentblank}</div>
              </div>
          </div>

          {/* 주소 */}
          <div className="css_address">
              <label htmlFor="addressnum_id" className="css_addressnumtag">주소</label>
              <div className="css_addressnum">
                  <Input type="text" id="addressnum_id" placeholder="01234" name="addressnum" onChange={onChangeAddressNumber}/>
                  <Button type="button" value="우편번호 검색" name="search" />
              </div>
              <Input type="text" id="address_id" placeholder="주소를 입력해 주세요." name="address" onChange={onChangeAddress}/>
              <Input type="text" id="addressdetail_id" placeholder="상세주소" name="addressdetail" onChange={onChangeAddressDetail}/>
          </div>

          <hr></hr>

          {/* 링크 */}
          <div className="css_link">
              <label htmlFor="link_id" className="css_linktag">링크</label>
              <Input type="text" id="link_id" placeholder="링크를 입력해 주세요." name="link"/>
          </div>
          <hr></hr>


          {/* 사진 첨부 */}
          <div className="css_picturepart">
              <div>사진 첨부</div>
              <div className="css_picture">
                  <img src={addimage} alt='addimage'/>
                  <img src={addimage} alt='addimage'/>
                  <img src={addimage} alt='addimage'/>
              </div>
          </div>

          {/* 하단 버튼 */}
          <div className="css_button">
              <button className="css_cancelbutton">취소</button>
              <button className="css_submitbutton" onClick={onClickSignup} style={{backgroundColor: isActive === true ? "blue" : "lightgray"}}>등록하기</button>
          </div>
      </div>
    </div>
    )
}

export default WriteBoard;
