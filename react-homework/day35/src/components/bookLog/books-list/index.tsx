"use client";

import { Rate } from "antd";
import styles from "./styles.module.css";
import { firebaseApp } from "@/commons/libraries/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const db = getFirestore(firebaseApp);
  const router = useRouter();

  const fetchDatas = async () => {
    try {
      const booksSnapshot = await getDocs(collection(db, "book"));
      const datas = booksSnapshot.docs.map((el) => ({
        id: el.id,
        title: el.data().title,
        author: el.data().author,
        rating: el.data().rating,
      }));
      setBooks(datas);
      console.log(datas);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = async (event, id) => {
    event.stopPropagation();
    try {
      const bookRef = doc(db, "book", id);
      await deleteDoc(bookRef);
      fetchDatas(); // 삭제 후 데이터 다시 불러오기
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBook = (id) => {
    console.log(id);

    router.push(`/myapis/${id}`);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <div className={styles.books_list_body}>
      <ul className={styles.books_list_page}>
        <div className={styles.header}>나의 책 리뷰 리스트</div>
        {books.map((book) => (
          <li
            className={styles.books_list}
            key={book.id}
            onClick={() => onClickBook(book.id)}
          >
            <div>{book.title}</div>
            <div>{book.author}</div>
            <Rate value={book.rating} />
            <button onClick={(event) => onClickDelete(event, book.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
