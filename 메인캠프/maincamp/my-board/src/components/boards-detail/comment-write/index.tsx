'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { useCommentWrite } from './hooks';
import { Rate } from 'antd';

export default function CommentWrite() {
  const {
    rating,
    setRating,
    registerComment,
    onChangeWriter,
    onChangeCommentPw,
    onChangeCommentContents,
    isActive,
  } = useCommentWrite();

  return (
    <form
      className={`container ${styles.container}`}
      onSubmit={registerComment}
    >
      <div className="flex mb-1">
        <Image width={20} height={20} src="/images/chat.png" alt="댓글아이콘" />
        <span className="ml-2 prose-sb_16_24">댓글</span>
      </div>

      <Rate onChange={setRating} value={rating} />

      <div className="flex gap-10 w-2/3 items-center mt-1">
        <div className="flex flex-col gap-2 flex-1">
          <p className="prose-me_16_24">
            작성자<span className="text-red-500"> *</span>
          </p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="text"
              onChange={onChangeWriter}
              placeholder="작성자 명을 입력해 주세요."
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="prose-me_16_24">
            비밀번호<span className="text-red-500"> *</span>
          </p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="password"
              onChange={onChangeCommentPw}
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
        </div>
      </div>
      <div className="w-full items-center ">
        <textarea
          className={styles.textareaCSS}
          onChange={onChangeCommentContents}
          placeholder="댓글을 입력해주세요."
          rows={5}
        ></textarea>
      </div>
      <div className="flex justify-end w-full">
        <button
          disabled={!isActive}
          style={{
            border: isActive ? '#2974e5' : '#959292',
            background: isActive ? '#2974e5' : '#959292',
            color: 'white',
          }}
          className="border-none rounded-md px-3 py-2 "
        >
          댓글 등록
        </button>
      </div>
    </form>
  );
}
