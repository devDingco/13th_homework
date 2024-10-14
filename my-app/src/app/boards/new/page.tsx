"use client";
import { useRef, useState } from "react";
import styles from "./styles.module.css";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import Add from "@/../public/add.png";

const 짱구의인적사항 = gql`
  # mutation createBoard(
  #   # $jgwriter: String
  #   # $jgpassword: String
  #   # $jgtitle: String!
  #   # $jgcontents: String!
  #   $createBoardInput: CreatedBoardInput!
  # ) {
  #   createBoard(createBoardInput: $createBoardInput) # writer: $jgwriter
  #   # password: $jgpassword
  #   # title: $jgtitle
  #   # contents: $jgcontents

  #   {
  #     writer
  #     title
  #     contents
  #     _id
  #   }
  # }
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function New() {
  const [짱구회원] = useMutation(짱구의인적사항);

  const onClickSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("test");

    try {
      if (writer && password && title && contents) {
        // event.preventDefault();
        const result = await 짱구회원({
          variables: {
            createBoardInput: {
              writer: writer,
              password: password,
              title: title,
              contents: contents,
            },
          },
        });
        console.log(result);
      }
    } catch (error) {
      alert("값 필요");
    }
    // if (writer && password && title && contents) {
    //   // event.preventDefault();
    //   const result = await 짱구회원({
    //     variables: {
    //       jgwriter: "짱구",
    //       jgpassword: "12345",
    //       jgtitle: "짱구의외출",
    //       jgcontents: "불꽃놀이보러간짱구와친구들",
    //       jgimages: ["인증샷"],
    //     },
    //   });
    // } else {
    //   console.log("값 필요");
    // }
  };

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [isActive, setIsActive] = useState(false);

  // const [errorMessage, setErrorMessage] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWriter(value);
    if (value === "") {
      setWriterError("필수입력 사항입니다");
      setIsActive(true);
    } else {
      setWriterError("");
      setIsActive(false);
    }
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    if (value === "") {
      setPasswordError("필수입력 사항입니다");
      setIsActive(true);
    } else {
      setPasswordError("");
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
    if (value === "") {
      setTitleError("필수입력 사항입니다");
      setIsActive(true);
    } else {
      setTitleError("");
      setIsActive(false);
    }
  };

  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    event.target.value;

    setContents(value);
    if (value === "") {
      setContentsError("필수입력 사항입니다");
      setIsActive(true);
    } else {
      setContentsError("");
      setIsActive(false);
    }
  };

  // let message = false;
  // const message = useRef(false);
  // if (writer === "") {
  //   setWriterError("필수입력 사항입니다");
  //   message.current = true;
  // }
  // if (password === "") {
  //   setPasswordError("필수입력 사항입니다");
  //   message.current = true;
  // }
  // if (title === "") {
  //   setTitleError("필수입력 사항입니다");
  //   message.current = true;
  // }
  // if (contents === "") {
  //   setContentsError("필수입력 사항입니다");
  //   message.current = true;
  // }
  // if (!message) {
  //   alert("게시글 등록이 가능합니다");
  // }

  return (
    <div className="전체창">
      <header className={styles.header}>게시물 등록</header>
      <div className={styles.main}>
        <div className={styles.메인첫번째박스}>
          <div className={styles.작성자박스}>
            <label htmlFor="작성자인풋" className={styles.label}>
              작성자<span className={styles.span}>*</span>
            </label>
            <input
              type="text"
              onChange={onChangeWriter}
              id="작성자인풋"
              className={styles.작성자인풋}
              placeholder="작성자 명을 입력해 주세요."
            />
            <div className={styles.에러메시지}>{writerError}</div>
          </div>
          <div className={styles.비밀번호박스}>
            <label htmlFor="비밀번호인풋">
              비밀번호<span className={styles.span}>*</span>
            </label>
            <input
              type="password"
              onChange={onChangePassword}
              id="비밀번호인풋"
              className={styles.비밀번호인풋}
              placeholder="비밀번호를 입력해 주세요."
            />
            <div className={styles.에러메시지}>{passwordError}</div>
          </div>
        </div>
        <div className={styles.제목박스}>
          <label htmlFor="제목인풋">
            제목<span className={styles.span}>*</span>
          </label>
          <input
            type="text"
            onChange={onChangeTitle}
            id="제목인풋"
            className={styles.제목인풋}
            placeholder="제목을 입력해 주세요."
          />
          <div className={styles.에러메시지}>{titleError}</div>
        </div>
        <div className={styles.내용박스}>
          <label htmlFor="내용인풋">
            내용<span className={styles.span}>*</span>
          </label>
          <textarea
            onChange={onChangeContents}
            id="내용인풋"
            className={styles.내용인풋}
            placeholder="내용을 입력해 주세요."
          ></textarea>
          <div className={styles.에러메시지}>{contentsError}</div>
        </div>
        <div className={styles.주소박스}>
          <div className={styles.우편번호전체박스}>
            <label htmlFor="우편번호인풋" className={styles.label}>
              주소
            </label>

            <div className={styles.우편번호창}>
              <input
                type="text"
                id="우편번호인풋"
                className={styles.우편번호인풋}
                placeholder="01234"
              />
              <div className={styles.우편번호검색}>우편번호 검색</div>
            </div>
          </div>
          <input
            className={styles.주소입력인풋}
            type="text"
            placeholder="주소를 입력해 주세요."
          ></input>
          <input
            className={styles.상세주소입력인풋}
            type="text"
            placeholder="상세주소"
          ></input>
        </div>
        <div className={styles.유튜브링크박스}>
          <label htmlFor="유튜브링크인풋" className={styles.유튜브링크인풋}>
            유튜브링크
          </label>
          <input
            type="text"
            id="유튜브링크인풋"
            className={styles.유튜브링크인풋}
            placeholder="링크를 입력해 주세요."
          />
        </div>
        <div className={styles.사진첨부여섯번째박스}>
          <label htmlFor="">사진 첨부</label>
          <div className={styles.사진업로드전체박스}>
            <div className={styles.사진박스}>
              <Image src={Add} width={0} height={0} alt="" />
              <div>클릭해서 사진 업로드</div>
            </div>
            <div className={styles.사진박스}>
              <Image src={Add} width={0} height={0} alt="" />
              <div>클릭해서 사진 업로드</div>
            </div>
            <div className={styles.사진박스}>
              <Image src={Add} width={0} height={0} alt="" />
              <div>클릭해서 사진 업로드</div>
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.푸터전체박스1}>
        <div className={styles.푸터취소}>취소</div>
        <button
          className={styles.푸터등록하기}
          onClick={onClickSubmit}
          // disabled={!isActive}
        >
          {isActive ? true : false}
          등록하기
        </button>
      </footer>
    </div>
  );
}

// export default New;
