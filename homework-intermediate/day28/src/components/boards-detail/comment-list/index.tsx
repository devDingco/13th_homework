import { FetchBoardCommentsQuery } from '@/commons/graphql/graphql';
import Image from 'next/image';

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

interface ICommentListProps {
  data: FetchBoardCommentsQuery;
}

export default function CommentList({ data }: ICommentListProps) {
  return (
    <div className="flex flex-col items-center gap-10 w-full">
      {data?.fetchBoardComments.length ? (
        data?.fetchBoardComments.map((el) => (
          <div key={el._id} className="flex flex-col gap-2 w-full">
            <div className="flex">
              <Image
                src={IMAGE_SRC.profileImage.src}
                alt={IMAGE_SRC.profileImage.alt}
              ></Image>
              <div>{el.writer}</div>
              <div className="flex">
                {new Array(5).fill(null).map((a, idx) => (
                  <Image
                    src={IMAGE_SRC.starImage.src}
                    alt={IMAGE_SRC.starImage.alt}
                  />
                ))}
              </div>
            </div>
            <div>{el.contents}</div>
            <div>
              {new Date(el.createdAt).toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
              })}
            </div>
            <hr className="my-10" />
          </div>
        ))
      ) : (
        <div>등록된 댓글이 없습니다.</div>
      )}
    </div>
  );
}
