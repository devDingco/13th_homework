import { useMutation, gql } from '@apollo/client'
import React, { useState, ChangeEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Input from '../commons/Input';
import Button from '../commons/Button';
import styles from './style.module.css'
const register = gql`
mutation createBoard(
  $createBoardInput: CreateBoardInput!
) 
  {
  createBoard(
    createBoardInput: $createBoardInput
  ) {
    _id
    writer
    title
    createdAt
    updatedAt
    boardAddress { 
      zipcode
      address
      addressDetail
    }     
  }
}
`;

const UPDATE_BOARD = 
gql`
  mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
      title
      contents  
      createdAt
      updatedAt
      writer
    }
  }
`


export default function BoardWrite (props) {

    const[name, setName] = useState(props.data?.fetchBoard.writer || '')

    const[password, setPassword] = useState(props.data?.fetchBoard.password || '')
  
    const[title, setTitle] = useState(props.data?.fetchBoard.title) 
  
    const[contents, setContents] = useState(props.data?.fetchBoard.contents || '')

    // const[imgae, setImage] = useState(null)
    
    const[nameblank, setNameBlank] = useState("")
  
    const[passwordblank, setPasswordBlank] = useState("")
  
    const[titleblank, setTitleBlank] = useState("")
  
    const[contentblank, setContentBlank] = useState("")


    const[isActive, setIsActive] = useState(false)
    

    // const[addressnumber, setaddressnumber] = useState(props.data?.fetchBoard.boardAddress.zipcode || '')

    // const[address, setaddress] = useState(props.data?.fetchBoard.boardAddress.address || '')

    // const[addressdetail, setaddressdetail] = useState(props.data?.fetchBoard.boardAddress.addressDetail || '')

    // console.log(addressnumber, address, addressdetail)

    


    const onChangeName = (event:ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value)
      if(event.target.value !== ("") && title !== ("") && contents !== ("") && password !== ("")) {
        return setIsActive(true)
      } else {
        setIsActive(false)
      }
    }
  
    const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
      if(name !== ("") && title !== ("") && contents !== ("") && event.target.value !== ("")) {
        return setIsActive(true)
      } else {
        setIsActive(false)
      }
    }
  
    const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value)
      if(name !== ("") && event.target.value !== ("") && contents !== ("") && password !== ("")) {
        return setIsActive(true)
      } else {
        setIsActive(false)
      }
    }
    
    const onChangeContent = (event:ChangeEvent<HTMLInputElement>) => {
      setContents(event.target.value)
      if(name !== "" && password !== "" && title !== "" && event.target.value !== "") {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }
  
    // const onChangeAddressNumber = (event:ChangeEvent<HTMLInputElement>) => {
    //   setaddressnumber(event.target.value)
    //   if(name !== "" && password !== "" && title !== "" && content !== "" && event.target.value !== "" && address !== "" && addressdetail !== "") {
    //     setIsActive(true)
    //   } else {
    //     setIsActive(false)
    //   }
    // }

    // const onChangeAddress = (event:ChangeEvent<HTMLInputElement>) => {
    //   setaddress(event.target.value)
    //   if(name !== "" && password !== "" && title !== "" && content !== "" && event.target.value !== "" && addressnumber !== "" && addressdetail !== "") {
    //     setIsActive(true)
    //   } else {
    //     setIsActive(false)
    //   }
    // }

    // const onChangeAddressDetail = (event:ChangeEvent<HTMLInputElement>) => {
    //   setaddressdetail(event.target.value)
    //   if(name !== "" && password !== "" && title !== "" && content !== "" && event.target.value !== "" && addressnumber !== "" && address !== "") {
    //     setIsActive(true)
    //   } else {
    //     setIsActive(false)
    //   }
    // }



    const router = useRouter();
    const params = useParams();
    
    const [myfunction] = useMutation(register)
    const [updateBoard] = useMutation(UPDATE_BOARD);
    
    const checkValid = () => {
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
      if(contents === ("")) {
        setContentBlank("필수입력 사항입니다.")
      } else {
        setContentBlank("")
      }
    }
    const onClickSignup = async () => {
        await checkValid()
        try {
          if(name !== ("") && title !== ("") && contents !== ("") && password !== ("")) {
            const result = await myfunction({
              variables :{
                createBoardInput: {
                  writer: name,
                  password: password,
                  title: title,
                  contents: contents,  
                  // boardAddress: {
                  //   zipcode: addressnumber,
                  //   address: address,
                  //   addressDetail: addressdetail
                  // }
                }
              }
            })
            alert("게시글 등록 완료")
            console.log(result.data.createBoard._id)
            router.push("../../../boards")
          }
        } catch {
          alert("에러가 발생하였습니다. 다시 시도해 주세요.")
        }
      }

      const onClickUpdate = async () => {
        const password = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")        
        try {
          const result = await updateBoard({
            variables: {boardId: params.boardId,
              password: password,
              updateBoardInput: {title, contents}
            }
          });
          console.log(result);
          alert("수정완료");
          router.push(
            `../../boards/${result.data.updateBoard._id}`
          );
      }
      catch {
        alert("비밀번호 오류")
      }
    };


    return(

        <div className={styles.css_layout}> 
          <div className={styles.css_header}>게시글 등록</div>
            <div className={styles.css_input}>

            {/* 작성란 헤더 */}
            <div className={styles.css_inputtop}>
                {/* 작성자 */}
                <div className={styles.css_writer}>
                    <label htmlFor="title_id" className={styles.css_nametag}>작성자</label>
                    <Input type="text" id="name_id" placeholder="작성자 명을 입력해 주세요." name="name" value={name} onChange={onChangeName} />
                    <div className={styles.css_blankerror}>{nameblank}</div>
                </div>
                {/* 비밀번호 */}
                <div className={styles.css_password}>
                    <label htmlFor="title_id" className={styles.css_pwdtag}>비밀번호</label>
                    <Input type="password" id="pwd_id" placeholder="비밀번호를 입력해 주세요." name="pwd" value={password}onChange={onChangePassword}/>
                    <div className={styles.css_blankerror}>{passwordblank}</div>
                </div>
            </div>
            <div className={styles.css_line}></div>
  
            {/* 제목 */}
            <div className={styles.css_titletop}>
                <div className={styles.css_title}>
                    <label htmlFor="title_id" className={styles.css_titletag}>제목</label>
                    <Input type="text" id="title_id" placeholder="제목을 입력해 주세요." name="title" value={title} onChange={onChangeTitle}/>
                    <div className={styles.css_blankerror}>{titleblank}</div>
                </div>
            </div>
            <div className={styles.css_line}></div>
          
            {/* 내용 */}
            <div className={styles.css_contenttop}>
                <div className={styles.css_content}>
                    <label htmlFor="content_id" className={styles.css_contenttag}>내용</label>
                    <Input type="text" id="content_id" placeholder="내용을 입력해 주세요." name="content" value={contents} onChange={onChangeContent}/>
                    <div className={styles.css_blankerror}>{contentblank}</div>
                </div>
            </div>
  
            {/* 주소 */}
            <div className={styles.css_address}>
                <label htmlFor="addressnum_id" className={styles.css_addressnumtag}>주소</label>
                <div className={styles.css_addressnum}>
                    <Input type="text" id="addressnum_id" placeholder="01234" name="addressnum"/>
                    {/* value={addressnumber}onChange={onChangeAddressNumber} */}
                    <Button type="button" value="우편번호 검색" name="search" />
                </div>
                <Input type="text" id="address_id" placeholder="주소를 입력해 주세요." name="address" />
                <Input type="text" id="addressdetail_id" placeholder="상세주소" name="addressdetail" />
            </div>
  
            <div className={styles.css_line}></div>
  
            {/* 링크 */}
            <div className={styles.css_link}>
                <label htmlFor="link_id" className={styles.css_linktag}>링크</label>
                <Input type="text" id="link_id" placeholder="링크를 입력해 주세요." name="link"/>
            </div>
            <div className={styles.css_line}></div>
  
            {/* 사진 첨부 */}
            <div className={styles.css_picturepart}>
                <div>사진 첨부</div>
                <div className={styles.css_picture}>
                    <Image src="/assets/AddImage.png" alt='addimage' width={0} height={0} className={styles.css_image} sizes='100vw'/>
                    <Image src="/assets/AddImage.png" alt='addimage' width={0} height={0} className={styles.css_image} sizes='100vw'/>
                    <Image src="/assets/AddImage.png" alt='addimage' width={0} height={0} className={styles.css_image} sizes='100vw'/>
                </div>
            </div>
  
            {/* 하단 버튼 */}
            <div className={styles.css_button}>
                <button className={styles.css_cancelbutton}>취소</button>
                <button className={styles.css_submitbutton} onClick={props.isEdit ? onClickUpdate : onClickSignup} style={{backgroundColor: isActive === true ? "blue" : "lightgray"}}>{params.isEdit ? "수정" : "등록"}하기</button>
            </div>
        </div>
      </div>
      )
}
