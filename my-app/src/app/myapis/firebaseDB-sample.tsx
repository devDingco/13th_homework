// 여긴 그냥 샘플이라 사라질 예정임

"use client";

import { firebaseApp } from "@/commons/libraries/miniFirebase";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

export default function FirebaseDB() {
  const onClickSubmit = async () => {
    // 파이어스토어에 접속해서 정보를 가지고 온다. 어떻게? 아까 연결해둔 firebaseApp파일의 도움으로
    const board = collection(getFirestore(firebaseApp), "board");
    // 정보 추가
    await addDoc(board, {
      writer: "찬우",
      title: "안녕하세요",
      contents: "잘 동작합니다.",
    });
  };

  // 가져오는 시간동안 기다리기 위해 async, await 추가
  const onClickFetch = async () => {
    const board = collection(getFirestore(firebaseApp), "board");

    // 데이터 가져오기
    const result = await getDocs(board);

    // 가져온 데이터 저장하기
    const datas = result.docs.map((el) => el.data());

    console.log(datas);
  };

  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  );
}
// 27분부터 보면 됨.
