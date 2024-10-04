'use client'
import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useParams, useRouter } from 'next/navigation'


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

const UPDATE_BOARD = gql`
  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId:ID!){
    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId){
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        _id
        zipcode
        address
      }
      user {
        _id
        email
        name
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
  
`










const BoardsWrite = (props) => {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAllFilled, setIsAllFilled] = useState(false);

  const [aboutUpLoadBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD)
  const router = useRouter()
  const params = useParams(); // useParams() 호출

  useEffect(() => {
    // 수정 모드가 아닌 경우에만 필수 입력사항을 체크하여 버튼 활성화
    if (!props.isEdit) {
      setIsAllFilled(!!(author && password && title && content));
    } else {
      setIsAllFilled(true);  // 수정 모드에서는 항상 true로 설정하여 버튼 활성화
    }
  }, [author, password, title, content, props.isEdit]);

  const authorOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };
  
  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const contentOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const signupButtonHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (props.isEdit) {
      await onClickUpdate();  // 수정하기
    } else {
      await onClickSubmit();  // 새 게시글 등록
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

  const onClickUpdate = async () => {
    const enteredPassword = window.prompt("비밀번호를 입력하세요");
  
    if (!enteredPassword) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }
  
    try {
      const result = await updateBoard({
        variables: {
          updateBoardInput: {
            title: title || "",   // 제목 수정 여부 체크
            contents: content || "", // 내용 수정 여부 체크
            youtubeUrl: "", 
            boardAddress: {
              zipcode: "",
              address: "",
              addressDetail: "",
            },
            images: [],
          },
          password: enteredPassword,
          boardId: params.boardId, // URL 파라미터에서 가져온 boardId
        },
      });
  
      console.log(result);
      alert("수정이 완료되었습니다.");
      router.push(`/boards/${result.data.updateBoard._id}`);
  
    } catch (error: any) {
      console.log(error.message);
      alert("비밀번호가 틀렸습니다. 다시 시도해 주세요.");
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          {props.isEdit ? "게시글 수정" : "게시글 등록"}
        </div>
      </div>
      <div className={styles.formContainer}>
        <form>
          <div className={styles.box}>
            <div className={styles.labelContainer}>
              <label>
                작성자 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <input
                className={styles.input1}
                type="text"
                onChange={authorOnChange}
                disabled={props.isEdit}
                defaultValue={props.data?.fetchBoard.writer}
              />
              <div id="authorRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
            <div className={styles.labelContainer}>
              <label>
                비밀번호 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <input
              className={styles.input1}
                type="password"
                onChange={passwordOnChange}
                disabled={props.isEdit}
              />
              <div id="passwordRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
          </div>
  
          <div className={styles.box}>
            <div className={styles.labelContainer2}>
              <label>
                제목 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <input className={styles.input2} type="text" onChange={titleOnChange} />
              <div id="titleRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
          </div>
  
          <div className={styles.box}>
            <div className={styles.labelContainer2}>
              <label>
                내용 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <textarea onChange={contentOnChange} />
              <div id="contentRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
          </div>
  
          <div className={styles.columnBox}>
            <label>주소</label>
            <div className={styles.zipAndButtonContainer}>
              <input className={styles.zipNum} type="text" />{" "}
              <button className={styles.searchZipNum}>우편번호 검색</button>
            </div>
            <input className={styles.input2} type="text" />
            <input className={styles.input2} type="text" />
          </div>
  
          <div className={styles.box}>
            <div className={styles.labelContainer2}>
              <label>유튜브 링크</label>
              <input className={styles.input2} type="text" />
            </div>
          </div>
  
          <div className={styles.boxEnd}>
            <div className={styles.labelContainer2}>
              <label>사진 첨부</label>
              <div className={styles.photoBoxContainer}>
                <div className={styles.flexbox2}>
                  <div className={styles.photoBox}>
                    <Image
                      src="/image/add.png"
                      className={styles.addImageIcon}
                      alt="사진추가"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <div className={styles.photoBoxText}>
                      클릭해서 사진 업로드
                    </div>
                  </div>
                </div>
                {/* 다른 사진 업로드 칸들 */}
              </div>
            </div>
          </div>
  
          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>취소</button>
            <button
              className={isAllFilled ? styles.submitButton_active : styles.submitButton}
              type="submit"
              onClick={signupButtonHandler}
            >
              {props.isEdit ? "수정하기" : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}


export default BoardsWrite