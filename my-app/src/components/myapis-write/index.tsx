"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { CloseOutlined } from "@ant-design/icons";

import { firebaseApp } from "@/commons/libraries/miniFirebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MakeApiWrite() {
  // Next.js의 useRouter 훅을 사용하여 라우터 객체를 생성
  const router = useRouter();

  // 각각의 상태 변수를 선언합니다.
  const [writer, setWriter] = useState(""); // 작성자 이름을 저장하는 상태 변수
  const [title, setTitle] = useState(""); // 게시글 제목을 저장하는 상태 변수
  const [contents, setContents] = useState(""); // 게시글 내용을 저장하는 상태 변수

  // 작성자 입력값이 변경될 때 호출되는 함수
  const onChangeWriter = (event) => {
    setWriter(event.target.value); // 작성자 입력값을 상태에 저장
  };

  // 제목 입력값이 변경될 때 호출되는 함수
  const onChangeTitle = (event) => {
    setTitle(event.target.value); // 제목 입력값을 상태에 저장
  };

  // 내용 입력값이 변경될 때 호출되는 함수
  const onChangeContents = (event) => {
    setContents(event.target.value); // 내용 입력값을 상태에 저장
  };

  // "등록하기" 버튼 클릭 시 호출되는 함수
  const onClickSubmit = async () => {
    // Firestore에 접속하여 "board"라는 컬렉션에 데이터 추가
    const board = collection(getFirestore(firebaseApp), "board");

    // 정보 추가 - Firestore에 새로운 문서를 추가하고 그 문서의 참조를 반환받음
    const docRef = await addDoc(board, {
      writer: writer, // 작성자
      title: title, // 제목
      contents: contents, // 내용
    });

    // 만들어진 문서 ID를 콘솔에 출력
    console.log(`Document ID: ${docRef.id}`);

    // 추가한 게시물이 생성된 후, 해당 게시물의 상세 페이지로 라우팅
    router.push(`/myapis/${docRef.id}`);
  };

  // 가져오는 시간동안 기다리기 위해 async, await 추가
  // const onClickFetch = async () => {
  //   const board = collection(getFirestore(firebaseApp), "board");

  //   // 데이터 가져오기
  //   const result = await getDocs(board);

  //   // 가져온 데이터 저장하기
  //   const datas = result.docs.map((el) => el.data());

  //   console.log(datas);
  // };
  // ---------------------------

  return (
    <>
      <main className={styles.main}>
        <Image
          src="/myApiImages/topStatusbar.png"
          alt="상단네비게이션사진으로만구현"
          className={styles.topStatusbar}
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className={styles.writeHeader}>
          게시물 등록하기
          <CloseOutlined className={styles.xIcon} />
        </div>
        <form className={styles.inputForm}>
          <fieldset className={styles.writerInputSection}>
            <legend>작성자</legend>
            <label>
              작성자 <span className={styles.redStar}>*</span>
            </label>
            <input
              className={styles.writerInput}
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              value={writer} // 추가
              onChange={onChangeWriter} // 추가
            />
          </fieldset>

          <div className={styles.underLine}></div>

          <fieldset className={styles.writerInputSection}>
            <legend>제목</legend>
            <label>
              제목 <span className={styles.redStar}>*</span>
            </label>
            <input
              className={styles.writerInput}
              type="text"
              placeholder="제목을 입력해 주세요."
              value={title} // 추가
              onChange={onChangeTitle} // 추가
            />
          </fieldset>

          <div className={styles.underLine}></div>

          <fieldset className={styles.writerInputSection}>
            <legend>내용</legend>
            <label>
              내용 <span className={styles.redStar}>*</span>
            </label>
            <textarea
              className={styles.contentsTextarea}
              rows={5}
              placeholder="내용을 입력해 주세요."
              value={contents} // 추가
              onChange={onChangeContents} // 추가
            ></textarea>
          </fieldset>
        </form>
        <div className={styles.btnSection}>
          <button className={styles.cancle}>취소</button>
          <button className={styles.submit} onClick={onClickSubmit}>
            등록하기
          </button>
        </div>
      </main>
    </>
  );
}

// 등록하기 마저 만들어주고 그거랑 파베랑 연결하기 만들어서 이동하기 누르면 값 전달되게끔
// 그러고 나서 상세페이지 대충 꾸며서 만들고
// 메인페이지 꾸민다음에 값 받게끔 만들면 완성 될듯함.
