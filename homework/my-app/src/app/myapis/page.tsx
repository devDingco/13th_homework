"use client";

import { firebaseApp } from "@/commons/libraries/firebase";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

export default function FirebasePage() {
  const onClickSubmit = async () => {
    const createBoard = collection(getFirestore(firebaseApp), "createBoard");
    // 문자열로 가져오나봄
    await addDoc(createBoard, {
      wirter: "정아영",
      title: "firebase 실습하기",
      contents: "지금 게시물이 생성되었습니까?",
    });
  };

  const onClickFetch = async () => {
    const createBoard = collection(getFirestore(firebaseApp), "createBoard");
    // onClickSubmit의 형태와 같다 컬렉션가져오기
    const createResult = await getDocs(createBoard);
    // 컬렉션 + 내부 만들어진 Docs까지 객체로 다 가져오는거같음
    const datas = createResult.docs.map((el) => el.data());
    console.log(datas);
  };

  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  );
}
