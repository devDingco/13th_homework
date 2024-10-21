"use client";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import React, { ChangeEvent, useState } from "react";
import { firebaseApp } from "./firebase";

export default function FireBase() {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event?.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event?.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event?.target.value);
  };

  const onClickSubmit = () => {
    const board = collection(getFirestore(firebaseApp), "board");

    addDoc(board, {
      writer: writer,
      title: title,
      contents: contents,
    });
  };

  const onClickFetch = async () => {
    const board = collection(getFirestore(firebaseApp), "board");
    const result = await getDocs(board);
    const data = result.docs.map((el) => el.data());
    console.log(data);
  };

  return (
    <>
      작성자: <input type="text" onChange={onChangeWriter} /> <br />
      제목: <input type="text" onChange={onChangeTitle} /> <br />
      내용: <input type="text" onChange={onChangeContents} /> <br />
      <button onClick={onClickSubmit}>등록하기</button>
      <br />
      <button onClick={onClickFetch}>조회하기</button>
      <br />
    </>
  );
}
