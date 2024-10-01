"use client";

import Icon from "@/components/iconFactory";
import LikeCountBtn from "@/components/likeCountBtn";
import CommentBox from "@/components/commentBox";
import CommentItemBox from "@/components/commentItemBox";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      # likeCount
      # dislikeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      user {
        picture
        deletedAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export default function BoardDetail() {
  const params = useParams();
  // 주소에서 값을 가져온 params.id는 문자이므로 Number로 변환해주고
  // FETCH_BOARD 쿼리에 넣어준다.
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });
  console.log(params.boardId, data?.fetchBoard);
  const detailData = data?.fetchBoard;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl">{detailData?.title}</h3>
        <div>
          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1 text-gray-700">
              <span className="bg-gray-300 rounded-full w-6 h-6">
                <Icon icon="mypage" className="fill-gray-500 w-fit" />
              </span>
              {detailData?.writer}
            </div>
            <div>
              {detailData?.createdAt.split("T")[0].replaceAll("-", ".")}
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex gap-2 justify-end">
            <span className="w-6 h-6">
              <Icon icon="link" className="fill-gray-800 w-fit" />
            </span>
            <span className="w-6 h-6">
              <Icon icon="location" className="fill-gray-800 w-fit" />
            </span>
          </div>
        </div>
        {detailData?.youtubeUrl && (
          <div className="flex gap-4">
            {detailData?.images.length > 0 &&
              detailData?.images.map((url: string, index: number) => (
                <Image
                  key={index}
                  src={url}
                  alt="content"
                  className=""
                  width="100"
                  height="100"
                />
              ))}
          </div>
        )}

        <div
          className="min-h-[500px]"
          dangerouslySetInnerHTML={{ __html: detailData?.contents }}
        ></div>
        {detailData?.youtubeUrl && (
          <div className="bg-gray-200 py-6">
            <div className="videoContainer max-w-4xl mx-auto">
              <iframe
                title="YouTube video player"
                src={
                  detailData?.youtubeUrl.includes(".be/")
                    ? `https://www.youtube.com/embed/${
                        detailData?.youtubeUrl.split(".be/")[1]
                      }`
                    : detailData?.youtubeUrl
                }
              ></iframe>
            </div>
          </div>
        )}

        <div className="flex gap-6 justify-center">
          <LikeCountBtn type="dislike" />
          <LikeCountBtn type="like" />
        </div>

        <div className="flex gap-6 justify-center">
          <Link className="btn btn-outline" href={`/board/list`}>
            <div className="w-6 h-6">
              <Icon icon="menu" className="fill-current w-fit" />
            </div>
            목록으로
          </Link>
          <Link
            className="btn btn-outline"
            href={`/board/edit/${params.boardId}`}
          >
            <div className="w-6 h-6">
              <Icon icon="edit" className="fill-current w-fit" />
            </div>
            수정하기
          </Link>
        </div>
      </div>

      <CommentBox
        title="댓글"
        id="tripTalkComment"
        placeholder="댓글을 입력해 주세요."
        textMaxCount={100}
        type="commentWrite"
      />

      <CommentItemBox
        starCountBox={true}
        reply={false}
        user={{ img: "/images/user.png", name: "김개똥" }}
        content="너무 좋아요 여기에 내용이 들어간다구요~~~~~~~~~~~~~~~~~~~
        ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ너무 좋아요 여기에 내용이 들어간다구요~~~~~~~~~~~~~~~~~~~
        ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ너무 좋아요 여기에 내용이 들어간다구요~~~~~~~~~~~~~~~~~~~
        ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ"
        date="2021.08.01"
        starCount={5}
      />
    </div>
  );
}
