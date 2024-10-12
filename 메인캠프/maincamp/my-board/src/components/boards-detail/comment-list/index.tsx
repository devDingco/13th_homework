import Image from 'next/image';
import { useCommentList } from './hooks';
import styles from './styles.module.css';
import { Rate } from 'antd';

export default function CommentList() {
  const { data } = useCommentList();
  // console.log('data', data);
  return (
    <div className={`container ${styles.container}`}>
      {data?.fetchBoardComments && data?.fetchBoardComments.length > 0 ? (
        <div className="w-full">
          {data?.fetchBoardComments?.map((el, index) => (
            <div
              key={el._id}
              className="border-b border-solid border-gray-200 flex flex-col gap-2 w-full mb-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Image
                    src="/images/profile.png"
                    width={24}
                    height={24}
                    sizes="100vw"
                    alt="프로필"
                  />
                  <span>{el.writer}</span>
                  <span>
                    <Rate value={el.rating} />
                  </span>
                </div>
                <div className="flex gap-1">
                  <Image
                    width={20}
                    height={20}
                    alt="수정"
                    src="/images/edit.png"
                    className="cursor-pointer"
                  />
                  <Image
                    width={20}
                    height={20}
                    alt="삭제"
                    src="/images/close.png"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div className="prose-r_16_24">{el.contents}</div>
              <div className="mb-2 text-gray-400 prose-r_14_20">
                {el.createdAt.slice(0, 10)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center prose-r_14_20 mb-20 text-gray-600">
          등록된 댓글이 없습니다.
        </div>
      )}
    </div>
  );
}
