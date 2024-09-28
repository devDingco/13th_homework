"use client"

import { ChangeEvent, useState } from "react";
import React from "react";

import styles from "./BoardsNew.module.css";

import Address from "@/app/components/address/page";
import Button from "@/app/components/button/page";
import HrLine from "@/app/components/hrLine/page";
import ImgUpload from "@/app/components/imageUpload/page";
import YoutubeLink from "@/app/components/youtube/page";
import { CREATE_BOARD } from "@/app/graphql/createBoard";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";


const BoardsNew = (): JSX.Element => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
    const [errorAlert, setErrorAlert] = useState('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const [createBoard] = useMutation(CREATE_BOARD)
  
  
      const handleValidation = (): boolean => {
          if (!name || !password || !title || !content) {
              setErrorAlert("필수등록 사항 입니다");
              setIsActive(false);
              return false;
          }
          setErrorAlert('');
          setIsActive(true);
          return true;
      };
  
      const handleSubmit = async ():Promise<void> => {
          if (handleValidation()) {
              try {
              
                  const result = await createBoard({
                      variables: {
                        createBoardInput: {
                              writer: name,
                            password,
                              title,
                              contents: content
                            },
                          },
                  });
                  console.log(result);
                  router.push('/pages/boards/detail');
              } catch (error) {
               console.error(error)
              };
          };
      };
  
      const handleReset = (): void => {
          setName('');
          setPassword('');
          setTitle('');
          setContent('');
          setIsActive(false);
      };
  
      const handleName = (e : ChangeEvent<HTMLInputElement>) : void=> {
          setName(e.target.value);
          handleValidation();
      };
  
      const handlePassword = (e : ChangeEvent<HTMLInputElement>): void => {
          setPassword(e.target.value)
          handleValidation();
      };
  
    const handleTitle = (e : ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.target.value);
        handleValidation();
    };
  
    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setContent(e.target.value);
        handleValidation();
    };
      
     
  
  
    return (
        <>
            <div className={styles.container}>
            <form style={{ border:'none'}}>
    <fieldset style={{ border:'none'}}>
        <legend className={styles.legend}>게시물 등록</legend>
                        <div className={styles.formControl}>
                            <div className={styles.firstLine}>
                                <label htmlFor="name">작성자</label>
                                <input type="name" id="name" className={styles.name} value={name} onChange={handleName} placeholder="작성자명을 입력해주세요" />
                                
                                </div>
                            <div className={styles.firstLine}>
                                <label htmlFor="password">비밀번호</label>
                                <input type="password" id="password" className={styles.password} value={password} onChange={handlePassword} placeholder="비밀번호를 입력해주세요" />
                                
                                </div>
                        </div>
                        <HrLine />
                        <div className={styles.formContent}>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" value={title}  className={styles.title} onChange={handleTitle} placeholder="제목을 입력해주세요" />
                        </div>
                        <HrLine />
            
                <div className={styles.formContent}>
                    <label htmlFor="content">내용</label>
                            <textarea id="content" className={styles.content} value={content} onChange={handleContent} placeholder="내용을 입력해주세요"></textarea>
                            
                </div>
                        {errorAlert && <div id="errorAlert" style={{ color: 'red' }}>{errorAlert}</div>}
                        
             </fieldset>
            </form>
                <Address />
                <HrLine  />
                <YoutubeLink />
                <HrLine />
                <ImgUpload />
                <Button
                    
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    isDisabled={!isActive} 
                    style={{ backgroundColor: isActive ? "#2974E5" : "#CCCCCC" }} />
                </div>
            </>
    )
  };
  
  export default BoardsNew ;
  