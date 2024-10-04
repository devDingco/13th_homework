'use client';
import { gql, useQuery } from '@apollo/client';
import styles from './styles.module.css';
import { useParams, useRouter } from 'next/navigation';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      likeCount
      dislikeCount
    }
  }
`;

const BoardsDetail = () => {
  const router = useRouter();
  const params = useParams();
  // 만약 구조분해할당 할거면 , const {boardId} = useParams 하고, variables에도 boardId:boardId하면 됌
  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);

  return (
    <div id="detailContainer" className="container">
      <div className="flex flex-col w-full justify-between">
        <div id="boardTitle" className=" mb-4 prose-b_28_36">
          {data?.fetchBoard.title || ''}
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <img className="mr-2" src="/images/profile.png" alt="profile" />
            <p id="writer" className="prose-l_14_20">
              {data?.fetchBoard.writer || ''}
            </p>
          </div>
          <div className="boardDate">
            <p id="date" className="prose-r_14_20">
              {data?.fetchBoard.createdAt.split('T')[0] || ''}
            </p>
          </div>
        </div>
        <div
          className={`flex justify-end w-full gap-2 pt-2 border-t border-gray-200`}
        >
          <img src="/images/link.png" alt="공유" className="w-4" />
          <img src="/images/location.png" alt="위치" className="w-4" />
        </div>
      </div>

      <div className="boardContent">
        <img
          className="w-80 h-96"
          src="/images/exampleImg.png"
          alt="예시 그림"
        />
        <div id="detailContent">
          <p className="text-black prose-r_16_24">
            {data?.fetchBoard.contents || ''}
          </p>
        </div>
        <img
          className="w-full h-auto"
          src="/images/videoEx.png"
          alt="예시 동영상"
        />
      </div>
      <div className="flex w-full justify-center text-center gap-4">
        {/* 추후 각각의 div을 만지면 count */}
        <div className="flex flex-col">
          <img src="/images/bad.png" alt="싫어요" className="w-6 h-auto" />
          <p id="badCount" style={{ color: 'black' }} className="prose-r_14_20">
            {data?.fetchBoard.dislikeCount || 0}
          </p>
        </div>
        <div className="flex flex-col">
          <img src="/images/good.png" alt="좋아요" className="w-6 h-auto" />
          <p id="goodCount" style={{ color: 'red' }} className="prose-r_14_20">
            {data?.fetchBoard.likeCount || 0}
          </p>
        </div>
      </div>
      <div className="flex text-center justify-center w-full gap-4">
        <button
          onClick={() => router.push('/boards')}
          className="flex justify-center items-center h-8 p-4 gap-1 rounded-lg border-solid border border-black text-center bg-none font-bold text-black prose-sb_14_20"
        >
          <img className="w-4 h-auto" src="/images/list_icon.png" alt="목록" />
          목록으로
        </button>
        <button
          onClick={() => router.push(`/boards/${data?.fetchBoard._id}/edit`)}
          className="flex justify-center items-center h-8 p-4 gap-1 rounded-lg border-solid border border-black text-center bg-none font-bold text-black prose-sb_14_20"
        >
          <img className="w-4 h-auto" src="/images/edit_icon.png" alt="수정" />
          수정하기
        </button>
      </div>
    </div>
  );
};
export default BoardsDetail;
