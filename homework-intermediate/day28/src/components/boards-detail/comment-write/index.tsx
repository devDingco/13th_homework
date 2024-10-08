'use client';

import Image from 'next/image';
import useCommentWrite from './hook';

const IMAGE_SRC = {
  chatImage: {
    src: require('@/assets/chat.png'),
    alt: '댓글입력창아이콘',
  },
  starImage: {
    src: require('@/assets/star.png'),
    alt: '별점아이콘',
  },
  profileImage: {
    src: require('@/assets/profile.png'),
    alt: '기본프로필아이콘',
  },
} as const;

export default function CommentWrite() {
  const {
    writer,
    password,
    content,
    onChangeWriter,
    onChangePassword,
    onChangeContent,
    onClickSubmit,
  } = useCommentWrite();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-2">
        <Image src={IMAGE_SRC.chatImage.src} alt={IMAGE_SRC.chatImage.alt} />
        <div>댓글</div>
      </div>

      <div className="flex">
        {new Array(5).fill(null).map((a, idx) => (
          <Image src={IMAGE_SRC.starImage.src} alt={IMAGE_SRC.starImage.alt} />
        ))}
      </div>

      <div className="flex gap-4 max-w-screen-sm">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex">
            <div>작성자</div>
            <div className="text-red-400"> *</div>
          </div>
          <div>
            <input
              className="border-2 rounded-lg p-4 w-full"
              type="text"
              placeholder="작성자 명을 입력해 주세요"
              value={writer}
              onChange={onChangeWriter}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex">
            <div>비밀번호</div>
            <div className="text-red-400"> *</div>
          </div>
          <div>
            <input
              className="border-2 rounded-lg p-4 w-full"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </div>
      </div>
      <div>
        <textarea
          className="w-full h-36 resize-none border-2 rounded-lg p-4"
          name="comment"
          placeholder="댓글을 입력해 주세요"
          value={content}
          onChange={onChangeContent}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button className="p-4 border-2 rounded-lg" onClick={onClickSubmit}>
          댓글 등록
        </button>
      </div>
    </div>
  );
}
