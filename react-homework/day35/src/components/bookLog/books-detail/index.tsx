import Image from "next/image";
import styles from "./styles.module.css";
import { useParams } from "next/navigation";
import { doc, DocumentData, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/commons/libraries/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Rate } from "antd";

export default function BooksDetail() {
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

  return (
    <div className={styles.books_detail_body}>
      <div className={styles.books_detail_page}>
        <div className={styles.up_box}>
          <Image
            src="/images/책표지.jpg"
            width={200}
            height={300}
            alt="책표지"
          />
          <div className={styles.right_area}>
            <div className={styles.info_box}>
              <div>{data?.title}</div>
              <div>{data?.author}</div>
              <div className={styles.rating_plot_box}>
                <Rate value={data?.rating} />
                <div>{data?.plot}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom_box}>
          <div className={styles.review_contents}>{data?.review}</div>
        </div>
        <div className={styles.button_box}>
          <Link className={styles.button} href="/myapis">
            목록
          </Link>
          <Link className={styles.button} href={`/myapis/${bookId}/edit`}>
            수정
          </Link>
        </div>
      </div>
    </div>
  );
}
