'use client';
import { gql, useQuery } from '@apollo/client';
import styles from './styles.module.css';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// const IMAGE_SRC = {
//   profileImage: {
//     src: require('@assets/profile_image.png'),
//     alt: '프로필이미지',
//   },
//   linkImage: {
//     src: require('@assets/link.png'),
//     alt: '링크아이콘',
//   },
//   locationImage: {
//     src: require('@assets/location.png'),
//     alt: '위치아이콘',
//   },
//   cheongsanImage: {
//     src: require('@assets/cheongsan.png'),
//     alt: '청산사진',
//   },
//   neotubeImage: {
//     src: require('@assets/neotube.png'),
//     alt: '너튜브사진',
//   },
//   badImage: {
//     src: require('@assets/bad.png'),
//     alt: '싫어요',
//   },
//   goodImage: {
//     src: require('@assets/good.png'),
//     alt: '좋아요',
//   },
//   hamberger: {
//     src: require('@assets/hamberger.png'),
//     alt: '목록아이콘',
//   },
//   pencil: {
//     src: require('@assets/pencil.png'),
//     alt: '수정아이콘',
//   },
// } as const;

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export default function BoardsDetailPage() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  console.log('🚀 ~ StaticRoutingMovedPage ~ data:', data);
  return (
    <div>
      <div>{data?.fetchBoard.number}번 상세페이지 이동이 완료되었습니다.</div>
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data?.fetchBoard.title}</div>
      <div>작성자: {data?.fetchBoard.contents}</div>
    </div>
  );
}
