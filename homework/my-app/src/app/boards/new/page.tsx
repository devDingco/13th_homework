'use client'
import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'


const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
    _id
    writer
    title
    contents
    youtubeUrl
    likeCount
    dislikeCount
    images
    boardAddress {
      zipcode
      address
      addressDetail
    }
    user {
      _id
      name
      email
    }
    createdAt
    updatedAt
    deletedAt
  }
}

`;

const BoardsNew = () => {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAllFilled, setIsAllFilled] = useState(false);

  const [aboutUpLoadBoard] = useMutation(CREATE_BOARD);

  const router = useRouter()

  useEffect(() => {
    setIsAllFilled(!!(author && password && title && content));
  }, [author, password, title, content]);

  const hideErrorText = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = 'none';
    }
  };

  const authorOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
    hideErrorText('authorRedText');
  };
  
  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    hideErrorText('passwordRedText');
  };

  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    hideErrorText('titleRedText');
  };

  const contentOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    hideErrorText('contentRedText');
  };

  const signupButtonHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    let isValid = true;

    const validateField = (fieldValue: string, elementId: string) => {
      const element = document.getElementById(elementId);
      if (!fieldValue) {
        if (element) {
          element.style.display = 'block';
        }
        isValid = false;
      }
    };

    validateField(author, 'authorRedText');
    validateField(password, 'passwordRedText');
    validateField(title, 'titleRedText');
    validateField(content, 'contentRedText');

    if (isValid) {
      alert("게시글 등록이 가능한 상태입니다.");
      await onClickSubmit();
    }
  };

  const onClickSubmit = async () => {
   try {
    const result = await aboutUpLoadBoard({
      variables: {
        createBoardInput: {
          writer: author,
          password: password,
          title: title,
          contents: content,
          youtubeUrl: "",
          boardAddress: {
            zipcode: "",
            address: "",
            addressDetail: ""
          },
          images: []
        }
      }
    });
    console.log(result);
    router.push(`/boards/${result.data.createBoard._id}`)
    
   } catch (error) {
    console.log(error)
    alert("에러가 발생하였습니다. 다시 시도해 주세요.")
   }
  };


  return (
    <div className={styles.container}>
        <div className={styles.titleContainer}>
            <div className={styles.title}>게시글 등록</div>
        </div>
        <div className={styles.formContainer}>
            <form>
                <div className={styles.box}>
                    <div className={styles.labelContainer}>
                        <label>작성자  <span className={styles.emphasize}>*</span> </label>
                        <input className={styles.input1} type="text" onChange={authorOnChange}/>
                        <div id="authorRedText" className={styles.errorText}>필수 입력 사항입니다</div>
                    </div>
                    <div className={styles.labelContainer}>
                        <label>비밀번호 <span className={styles.emphasize}>*</span> </label>
                        <input className={styles.input1} type="password" onChange={passwordOnChange}/>
                        <div id="passwordRedText" className={styles.errorText}>필수 입력 사항입니다</div>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.labelContainer2}>
                        <label>제목 <span className={styles.emphasize}>*</span> </label>
                        <input className={styles.input2} type="text" onChange={titleOnChange}/>
                        <div id="titleRedText" className={styles.errorText}>필수 입력 사항입니다</div>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.labelContainer2}>
                        <label>내용 <span className={styles.emphasize}>*</span> </label>
                        <textarea onChange={contentOnChange}/>
                        <div id="contentRedText" className={styles.errorText}>필수 입력 사항입니다</div>
                    </div>
                </div>

                <div className={styles.columnBox}>
                    <label>주소</label>
                    <div className={styles.zipAndButtonContainer}>
                        <input className={styles.zipNum} type="text"/> <button className={styles.searchZipNum}>우편번호 검색</button>
                    </div>
                    <input className={styles.input2} type="text"/>
                    <input className={styles.input2} type="text"/>
                </div>

                <div className={styles.box}>
                    <div className={styles.labelContainer2}>
                        <label>유튜브 링크</label>
                        <input className={styles.input2} type="text"/>
                    </div>
                </div>
                
                <div className={styles.boxEnd}>
                    <div className={styles.labelContainer2}>
                        <label>사진 첨부</label>
                        <div className={styles.photoBoxContainer}>
                            <div className={styles.flexbox2}>
                                <div className={styles.photoBox}>
                                    <Image src="/image/add.png" className={styles.addImageIcon} alt="사진추가" width={0} height={0} sizes='100vw' />
                                    <div className={styles.photoBoxText}>클릭해서 사진 업로드</div>
                                </div>    
                            </div>
                            <div className={styles.flexbox2}>
                                <div className={styles.photoBox}>
                                     <Image src="/image/add.png" className={styles.addImageIcon} alt="사진추가" width={0} height={0} sizes='100vw' />
                                    <div className={styles.photoBoxText}>클릭해서 사진 업로드</div>
                                </div>    
                            </div>
                            <div className={styles.flexbox2}>
                                <div className={styles.photoBox}>
                                    <Image src="/image/add.png" className={styles.addImageIcon} alt="사진추가" width={0} height={0} sizes='100vw' />
                                    <div className={styles.photoBoxText}>클릭해서 사진 업로드</div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton}>취소</button>
                    <button className={isAllFilled ? styles.submitButton_active  : styles.submitButton} type="submit" onClick={signupButtonHandler}>등록하기</button>
                </div>
            </form>
        </div>
    </div>
);

}

export default BoardsNew
