"use client";
import React, { useEffect, useState } from "react";
import { firebaseApp } from "@/commons/libraries/firebase";
import {
  addDoc,
  collection,
  DocumentData,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";

const FirebasePage = () => {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [dataList, setDataList] = useState<DocumentData[]>([]); // 상태 초기화

  // Firestore에서 실시간 데이터 가져오기
  useEffect(() => {
    const board = collection(getFirestore(firebaseApp), "board");

    // onSnapshot으로 데이터 내용이 바뀔때마다 실시간으로 유아이에 반영
    const unsubscribe = onSnapshot(board, (snapshot) => {
      const datas = snapshot.docs.map((doc) => doc.data());
      setDataList(datas); // 상태에 저장
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, []);

  const onClickSubmit = async () => {
    try {
      const board = collection(getFirestore(firebaseApp), "board");
      await addDoc(board, { writer, title, contents });
      alert("등록이 완료되었습니다!");
      setWriter("");
      setTitle("");
      setContents("");
    } catch (error) {
      console.error("등록 중 오류 발생:", error);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="작성자"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="내용"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>
      <button onClick={onClickSubmit}>등록하기</button>

      <div>게시물 리스트</div>
      <ul>
        {dataList.map((data, index) => (
          <li key={index}>
            <strong>
              {index + 1}. {data.title}
            </strong>{" "}
            - 작성자: {data.writer}
            <p>{data.contents}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FirebasePage;
