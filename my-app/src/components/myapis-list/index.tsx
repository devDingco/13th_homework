"use client";

// 메인목록 페이지

import Image from "next/image";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/commons/libraries/miniFirebase";

export default function MakeApiList() {
  // 상태를 초기화합니다. 초기값은 빈 배열로 설정
  const [data, setData] = useState([]); // 'data'라는 상태 변수를 선언하고 초기값을 빈 배열로 설정합니다.

  useEffect(() => {
    // 비동기 함수 fetchData 정의
    const fetchData = async () => {
      // Firestore의 "board" 컬렉션에 대한 참조를 생성
      const boardCollection = collection(getFirestore(firebaseApp), "board");

      // 컬렉션의 모든 문서를 가져옴
      const querySnapshot = await getDocs(boardCollection);

      // 가져온 문서들에서 데이터를 추출하여 새로운 배열 생성
      const boardData = querySnapshot.docs.map((doc) => ({
        id: doc.id, //  문서의 ID를 가져옵니다.
        ...doc.data(), // 문서의 데이터 속성들을 새로운 객체에 복사합니다.
      }));

      // 상태를 업데이트하여 boardData를 저장
      setData(boardData);

      // 데이터 확인용으로 콘솔에 출력
      console.log(boardData);
    };

    // fetchData 함수 호출
    fetchData();
  }, []); // 빈 배열을 의존성으로 주어 컴포넌트가 처음 마운트될 때만 실행되게 함

  // 현재 상태에 저장된 데이터를 콘솔에 출력
  console.log("Fetched Data:", data); // 'data'의 현재 상태를 콘솔에 출력

  return (
    <>
      <main className={styles.main}>
        <Image
          src="/myApiImages/topGroup.png"
          alt="상단네비게이션사진으로만구현"
          className={styles.topGroup}
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className={styles.boardSection}>
          <div className={styles.boardIn}>
            <div>
              <span>번호</span>
              <span>제목</span>
              <span>작성자</span>
            </div>
            <div className={styles.boardContents}>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <div className={styles.boardItem} key={item.id}>
                    <span>{index + 1}</span>
                    <h3>제목: {item.title}</h3>
                    <p>작성자: {item.writer}</p>
                    {/* 상세페이지로 이동하는 링크 추가 가능 */}
                  </div>
                ))
              ) : (
                <p>데이터가 불러와지지 않습니다.</p> // 데이터가 없을 때
              )}
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <Image
            src="/myApiImages/bottomGroup.png"
            alt="하단네비게이션사진으로만구현"
            className={styles.bottomGroup}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </main>
    </>
  );
}
