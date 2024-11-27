"use client";
import React from "react";
import { firebaseApp } from "@/commons/libraries/17-01-firebase";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const FirebasePage = () => {
  const onClickSubmit = async () => {
    getFirestore(firebaseApp);

    const board = collection(getFirestore(firebaseApp), "board");
    await addDoc(board, {
      writer: "철수",
      title: "안녕하세요",
      contents: "반갑습니다",
    });
  };
  const onClickFetch = async () => {
    const board = collection(getFirestore(firebaseApp), "board");
    const result = await getDocs(board);
    const datas = result.docs.map((el) => el.data());
    console.log(datas);
  };
  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  );
};

export default FirebasePage;
