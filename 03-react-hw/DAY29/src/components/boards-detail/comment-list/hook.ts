import {
  DeleteBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "./../../../commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useCommentList() {
  const params = useParams(); // 현재 게시글의 ID 가져오기
  const boardId = params.boardId as string;

  // 댓글 데이터 가져오기
  const { data, fetchMore, refetch } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId,
      page: 1,
    },
  });

  // 무한스크롤시 페이지
  const [page, setPage] = useState(1);

  // 무한스크롤 데이터
  const [hasMore, setHasMore] = useState(true);

  // 댓글 수정 상태 관리
  const [isEdit, setIsEdit] = useState(false);

  // 댓글 수정
  const onEdit = () => {
    setIsEdit((prev) => !prev);
  };

  // 목록 초기화 함수
  const resetList = async () => {
    setPage(1);
    setHasMore(true);
    await refetch({ page: 1 }); // 첫 페이지부터 다시 로드
  };

  // 추가 데이터 불러오기
  const loadMore = async () => {
    if (!hasMore) return;

    try {
      // 다음 페이지 데이터 요청
      const result = await fetchMore({
        variables: {
          boardId,
          page: page + 1,
        },
        // 데이터 불러오기
        updateQuery: (prev, { fetchMoreResult }) => {
          // 새로운 데이터가 없으면 기존 데이터만
          if (!fetchMoreResult?.fetchBoardComments) return prev;

          // 서버에서 받은 데이터가 3개 미만이면 마지막 페이지
          if (fetchMoreResult.fetchBoardComments.length < 3) {
            setHasMore(false); // 더 이상 불러올 데이터 없음
          }

          // 이전 데이터+ 새로운 데이터
          return {
            fetchBoardComments: [
              ...prev.fetchBoardComments,
              ...fetchMoreResult.fetchBoardComments,
            ],
          };
        },
      });

      //  페이지 번호 증가
      setPage((prev) => prev + 1);

      // 새로 받은 데이터가 없으면 더 이상 데이터가 없다고 표시
      if (!result.data.fetchBoardComments.length) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("댓글 추가 로딩 실패:", error);
    }
  };

  // 댓글 삭제 mutation 설정
  const [deleteBoardComment] = useMutation(DeleteBoardCommentDocument, {
    // 삭제 후 목록 새로고침과 상태 초기화
    onCompleted: () => {
      resetList();
    },
  });

  // 댓글 삭제 기능
  const handleDelete = async (commentId: string) => {
    try {
      const password = prompt("댓글을 삭제하려면 비밀번호를 입력하세요.");
      if (!password) return;

      await deleteBoardComment({
        variables: {
          password,
          boardCommentId: commentId,
        },
      });
      alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.log("댓글 삭제 실패: ", error);
    }
  };

  return {
    data,
    handleDelete,
    onEdit,
    isEdit,
    loadMore,
    hasMore,
    resetList,
  };
}
