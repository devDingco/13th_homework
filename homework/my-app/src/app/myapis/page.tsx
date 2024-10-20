"use client";
import React, { useEffect, useState } from "react";
import { firebaseApp } from "@/commons/libraries/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

const FirebasePage = () => {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [dataList, setDataList] = useState<DocumentData[]>([]); // 상태 초기화

  const [editId, setEditId] = useState<string | null>(null);
  const [editWriter, setEditWriter] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContents, setEditContents] = useState("");

  // Firestore에서 실시간 데이터 가져오기
  useEffect(() => {
    const board = collection(getFirestore(firebaseApp), "board");

    // 쿼리 작성: createdAt 필드 기준 내림차순 정렬
    const q = query(board, orderBy("createdAt", "desc"));

    // onSnapshot으로 실시간 데이터 반영
    onSnapshot(q, (snapshot) => {
      const datas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataList(datas);
    });
  }, []);

  // 등록하기
  const onClickSubmit = async () => {
    try {
      const board = collection(getFirestore(firebaseApp), "board");
      await addDoc(board, {
        writer,
        title,
        contents,
        createdAt: new Date(), // 현재 시간 기록
      });
      alert("등록이 완료되었습니다!");
      setWriter("");
      setTitle("");
      setContents("");
    } catch (error) {
      console.error("등록 중 오류 발생:", error);
    }
  };

  const onClickUpdate = async () => {
    if (!editId) return;

    try {
      const boardDoc = doc(getFirestore(firebaseApp), "board", editId);
      await updateDoc(boardDoc, {
        writer: editWriter,
        title: editTitle,
        contents: editContents,
      });

      alert("수정이 완료되었습니다.");
      setEditId(null);
      setEditWriter("");
      setEditTitle("");
      setEditContents("");
    } catch (error) {
      console.log("수정 중 오류 발생", error);
    }
  };

  const onClickEdit = (data: DocumentData) => {
    setEditId(data.id);
    setEditWriter(data.writer);
    setEditTitle(data.title);
    setEditContents(data.contents);
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
          <li key={data.index}>
            {editId === data.id ? (
              <>
                <input
                  type="text"
                  value={editWriter}
                  onChange={(e) => setEditWriter(e.target.value)}
                />
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContents}
                  onChange={(e) => setEditContents(e.target.value)}
                />
                <button onClick={onClickUpdate}>수정완료</button>
              </>
            ) : (
              <>
                <p>
                  {data.title} - 작성자: {data.writer}
                </p>
                <p>{data.contents}</p>
                <button onClick={() => onClickEdit(data)}>수정하기</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default FirebasePage;
