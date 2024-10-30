"use client";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export default function BoardsDetail() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  return (
    <div className="flex flex-col w-[1280px] gap-4 mx-auto my-0 py-10">
      <div className="font-bold text-[28px] leading-9">
        {data?.fetchBoard.title}
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <Image
              src="/img/profile.svg"
              alt="profileImg"
              width={24}
              height={24}
            />
            <div className="font-light text-[14px] leading-5 text-[#5f5f5f]">
              {data?.fetchBoard.writer}
            </div>
          </div>
          <div className="font-normal text-[14px] leading-5 text-[#818181]">
            {data?.fetchBoard.createdAt.split("T")[0].replace(/-/g, ".")}
          </div>
        </div>
        <hr className="h-px border-0 bg-[#e4e4e4]" />
        <div className="flex justify-end w-full">
          <div className="flex gap-2">
            <Image
              // sizes="100vw"
              width={0}
              height={0}
              src="/img/link.svg"
              alt="linkImg"
              className="w-6 h-6"
            />
            <Image
              src="/img/location.svg"
              alt="locationImg"
              width={24}
              height={24}
            />
            {/* 이미지 자체에 style을 주는건 권장이아니다. 부모에 스타일을주고 fill 과 objectfit속성을 사용해서 이미지 크기를 조절 */}
          </div>
        </div>
      </div>
      <div className="w-16 h-16">이미지 넣을 자리</div>
      <div className="font-normal text-[16px] leading-6">
        {data?.fetchBoard.contents}
      </div>
      <div className="flex justify-center items-center bg-[#f2f2f2] py-6">
        <div className="w-[822px] h-[464px]">유튜브넣을자리</div>
      </div>
      <div className="flex justify-center gap-6">
        <div className="flex flex-col gap-1">
          <Image src="/img/bad.svg" alt="badImg" width={24} height={24} />
          <div>24</div>
        </div>
        <div className="flex flex-col gap-1">
          <Image src="/img/good.svg" alt="goodImg" width={24} height={24} />
          <div>24</div>
        </div>
      </div>
      <div className="flex justify-center w-full gap-6">
        <button className="flex h-10 py-2 px-3 gap-2 border rounded-lg border-solid border-[#000000]">
          <Image src="/img/list.svg" alt="listImg" width={24} height={24} />
          <div className="font-semibold text-[14px] text-center leading-5 ">
            목록으로
          </div>
        </button>
        <button className="flex h-10 py-2 px-3 gap-2 border rounded-lg border-solid border-[#000000]">
          <Image src="/img/edit.svg" alt="editImg" width={24} height={24} />
          <div className="font-semibold text-[14px] text-center leading-5 ">
            수정하기
          </div>
        </button>
      </div>
    </div>
  );
}
