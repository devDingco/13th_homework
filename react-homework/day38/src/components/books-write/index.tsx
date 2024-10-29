import styles from "./styles.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { firebaseApp } from "@/commons/libraries/firebase";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Rate } from "antd";
import { IBooksWriteProps } from "./types";

export default function BooksWrite(props: IBooksWriteProps) {
  // 입력 값
  const [reviewData, setReviewData] = useState({
    title: "",
    author: "",
    plot: "",
    review: "",
  });
  // 별점
  const [rating, setRating] = useState(0);
  // 선택된 파일
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 이미지 미리보기
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  // props의 data가 바뀌면 렌더링
  useEffect(() => {
    if (props.data) {
      setReviewData({
        title: props.data.title ?? "",
        author: props.data.author ?? "",
        plot: props.data.plot ?? "",
        review: props.data.review ?? "",
      });
      setRating(props.data.rating ?? 0);
    }
  }, [props.data]);

  const onChangeReviewData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 등록하기
  const onClickSubmit = async () => {
    const book = collection(getFirestore(firebaseApp), "book");
    try {
      const docRef = await addDoc(book, {
        author: reviewData.author,
        title: reviewData.title,
        review: reviewData.review,
        plot: reviewData.plot,
        rating: rating,
      });
      console.log("등록된 글: ", docRef);
      setRating(0);

      router.push(`/myapis/${docRef.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // 수정하기
  const onClickEdit = async () => {
    if (!props.bookId) return;
    const book = doc(getFirestore(firebaseApp), "book", props.bookId);
    try {
      const docRef = await updateDoc(book, {
        author: reviewData.author,
        title: reviewData.title,
        review: reviewData.review,
        plot: reviewData.plot,
        rating: rating,
      });
      console.log(docRef);
      router.push(`/myapis/${props.bookId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickCancel = () => {
    if (props.isEdit) router.push(`/myapis/${props.bookId}`);
    else router.push("/myapis");
  };

  const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택된 파일 가져오기
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file); // 이미지 미리보기 URL
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className={styles.books_write_body}>
      <div className={styles.books_write_page}>
        <div className={styles.books_write_header}>나만의 책 리뷰</div>
        <div className={styles.books_write_main}>
          <div className={styles.book_info_box}>
            <input
              type="text"
              value={reviewData.title}
              name="title"
              onChange={onChangeReviewData}
              placeholder="책 제목을 입력해주세요."
            />
            <input
              type="text"
              value={reviewData.author}
              name="author"
              onChange={onChangeReviewData}
              placeholder="책 저자를 입력해주세요."
            />
            <textarea
              value={reviewData.plot}
              name="plot"
              onChange={onChangeReviewData}
              placeholder="줄거리를 입력해주세요."
            ></textarea>
          </div>
          <div className={styles.book_review_box}>
            <Rate onChange={setRating} value={rating} />
            <textarea
              value={reviewData.review}
              name="review"
              onChange={onChangeReviewData}
              className={styles.book_review_contents}
              placeholder="리뷰 내용을 입력해주세요."
            />
          </div>
          <div className={styles.button_area}>
            <div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Book Cover Preview"
                  className="preview-image"
                />
              )}
            </div>
            <div className={styles.button_box}>
              <label className={styles.upload_button}>
                {selectedFile ? "책 표지 바꾸기" : "책 표지 선택"}
                <input type="file" onChange={onChangeImage} />
              </label>
              <div className={styles.right_button_box}>
                <button
                  className={styles.cancel_button}
                  onClick={onClickCancel}
                >
                  취소
                </button>
                <button
                  className={styles.button}
                  onClick={props.isEdit ? onClickEdit : onClickSubmit}
                >
                  {props.isEdit ? "수정" : "등록"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
