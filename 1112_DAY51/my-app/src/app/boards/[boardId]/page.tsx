"use client";

import { FETCH_BOARD, FETCH_BOARDS } from "@/components/boardQueries";
import { DELETE_BOARD } from "@/components/boardMutation";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ImageUploadInput from "@/components/imageUploadInput";
import Image from "next/image";

export default function BoardDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [deleteBoard] = useMutation(DELETE_BOARD);

  console.log(params.boardId);
  // 게시물 이미지를 저장할 상태
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [files, setFiles] = useState<File[]>([]);

  const { data, loading, error, refetch } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  if (loading) return <div>로딩 중...</div>; // 로딩 중일 때 처리
  if (error) return <div>에러 발생: {error.message}</div>; // 에러 처리

  // 게시물 이미지 URL 배열
  const imageUrls = data?.fetchBoard?.images || [];

  // 이미지를 포함한 게시물 데이터를 출력
  console.log(":::::이미지주소", data?.fetchBoard.images); // images 배열 확인

  console.log(data);
  // useEffect(() => {
  //   console.log("data:::::::::::", data); // data가 제대로 로드되었는지 확인
  //   // 게시물의 이미지 URL을 `imageUrls` 상태에 반영
  //   if (data?.fetchBoard.images) {
  //     setImageUrls(data.fetchBoard.images);
  //   }
  // }, [data]);
  // useEffect(() => {
  //   if (data?.fetchBoard.images) {
  //     const updatedImages = data.fetchBoard.images.map(
  //       (image) => (image.startsWith("/") ? image : "/" + image)
  //     );
  //     // setImageUrls(updatedImages);
  //   }
  // }, [data]);

  const onClickSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      await refetch(); // 목록 새로고침
      router.replace(`/boards`); // 페이지 이동
    } catch (error) {
      console.error("Error navigating to boards:", error);
    }
  };

  const goToEditPage = () => {
    router.push(`/boards/${params.boardId}/edit`);
  };

  const onClickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      await deleteBoard({
        variables: { boardId: params.boardId },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });

      router.push(`/`);
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };
  return (
    <div>
      <div>
        <div>
          {/* 글제목 */}
          <div>{data?.fetchBoard.title}</div>
          <div>라인</div>
        </div>
        <div>
          {/* 이미지를 ImageUploadInput 컴포넌트로 변경 */}
          <div>
            {imageUrls.map((imageUrls, index) => (
              <div key={index}>
                {/* Image 컴포넌트를 사용하여 lazy loading 자동 처리 */}
                <Image
                  src={`https://storage.googleapis.com/${imageUrls}`}
                  alt={`게시물 이미지 ${index + 1}`}
                  width={80}
                  height={80}
                  objectFit="cover"
                  loading="lazy" // 지연 로딩을 명시적으로 추가
                  // priority={index === 0} // 첫 번째 이미지는 우선적으로 로드
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div>
            <div>프로필이미지</div>
            <div>{data?.fetchBoard.writer}</div>
          </div>
          <div>{data?.fetchBoard.contents}</div>
        </div>
      </div>
      <div>
        <button onClick={(event) => onClickSignup(event)}>목록</button>
        <button onClick={goToEditPage}>수정</button>
        <button onClick={onClickDelete}>삭제</button>
      </div>
    </div>
  );
}
