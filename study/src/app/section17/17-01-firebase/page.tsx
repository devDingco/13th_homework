"use client";
import { firebaseApp } from "@/commons/lib/17-01-firebase";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";

export default function FireBasePage() {
  const submitEvent = async () => {
    // board 라는 컬렉션을 만들거나 가져옵니다.
    const board = collection(getFirestore(firebaseApp), "board");
    // board 컬렉션에 데이터를 추가합니다. addDoc: 데이터를 추가해주는 함수
    await addDoc(board, {
      writer: "철수",
      title: "안녕하세요",
      contents: "반갑습니다!!",
    });
  };
  const fetchEvent = async () => {
    const board = collection(getFirestore(firebaseApp), "board");
    const result = await getDocs(board); // getDocs: 데이터를 가져오는 함수
    const datas = result.docs.map((el) => el.data()); // 가져온 것을 배열에 담음
    console.log(datas);
  };

  return (
    <>
      <h1 className="font-bold text-3xl">firebase firestore database 실습</h1>
      <div className="flex gap-3">
        <button className="btn" onClick={() => submitEvent()}>
          등록하기
        </button>
        <button
          className="btn btn-primary text-white"
          onClick={() => fetchEvent()}
        >
          조회하기
        </button>
      </div>
    </>
  );
}
