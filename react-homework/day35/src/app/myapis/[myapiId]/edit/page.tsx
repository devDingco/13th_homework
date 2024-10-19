"use client";

import { firebaseApp } from "@/commons/libraries/firebase";
import BooksWrite from "@/components/bookLog/books-write";
import { doc, DocumentData, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BooksEditPage = () => {
  const params = useParams();
  const bookId = params.myapiId as string;
  const [data, setData] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // bookId 없으면 리턴
      if (!bookId) return;
      // id로 조회
      const bookRef = doc(getFirestore(firebaseApp), "book", bookId);
      try {
        const data = await getDoc(bookRef);
        // data가 실제 firestore에 존재하면
        if (data.exists()) {
          const fetchedData = data.data();
          setData(fetchedData);
          console.log(fetchedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [bookId]);

  return <BooksWrite isEdit={true} data={data} bookId={bookId} />;
};
export default BooksEditPage;
