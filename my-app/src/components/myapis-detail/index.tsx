"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useParams } from "next/navigation"; // 라우터에서 ID 가져오기
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/commons/libraries/miniFirebase";

// 게시판 데이터의 구조를 정의하는 인터페이스
interface BoardData {
  title: string; // 게시물 제목
  writer: string; // 작성자 이름
  contents: string; // 게시물 내용
}

export default function MakeApiDetail() {
  // URL에서 문서 ID를 받아오는 부분
  const { myapiId } = useParams(); // URL의 파라미터에서 'myapiId'를 추출

  // 상태 훅을 사용해 데이터를 저장할 state와 로딩 상태를 관리
  const [data, setData] = useState<BoardData | null>(null); // 데이터의 초기값은 null. BoardData 타입 또는 null을 가질 수 있음
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태를 관리하는 상태. 초기값은 true로 설정

  // 컴포넌트가 마운트되거나 myapiId가 변경될 때마다 실행되는 useEffect 훅
  useEffect(() => {
    console.log("Fetched ID:", myapiId); // 현재 ID를 콘솔에 출력하여 확인

    // 비동기 함수 fetchData 정의
    const fetchData = async () => {
      // 파이어스토어에서 특정 문서의 참조를 가져옴
      const docRef = doc(getFirestore(firebaseApp), "board", myapiId);
      // 문서의 스냅샷을 가져옴
      const docSnap = await getDoc(docRef);

      // 문서가 존재하는지 확인
      if (docSnap) {
        // 데이터가 존재하면 state에 데이터를 저장
        setData(docSnap.data() as BoardData); // 데이터의 타입을 BoardData로 지정
      } else {
        // 문서가 존재하지 않으면 경고 로그 출력
        console.log("문서가 존재하지 않음..");
      }
      // 데이터 fetching 완료 후 로딩 상태를 false로 변경
      setLoading(false);
    };

    // myapiId가 존재할 경우에만 fetchData 함수 실행
    if (myapiId) fetchData();
  }, [myapiId]); // myapiId가 변경될 때마다 useEffect가 실행됨

  console.log(data); // 현재 state에 저장된 data를 콘솔에 출력

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
        <div className={styles.topbar}>
          <span>뒤로가기</span>
          <span>로그인하기</span>
        </div>

        {/* 데이터가 로딩 중일 때 */}
        {loading ? (
          <div>로딩 중...</div>
        ) : // data가 존재할 때만 렌더링
        data ? (
          <>
            <div>제목: {data.title}</div>
            <div>
              <div>작성자: {data.writer}</div>
              <div>날짜~~</div>
            </div>
            <div>내용: {data.contents}</div>
          </>
        ) : (
          <div>해당 데이터를 찾을 수 없습니다.</div> // 데이터가 없을 때 메시지
        )}
      </main>
    </>
  );
}
