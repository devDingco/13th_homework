"use client";

import Image from "next/image";
import useBoardDetail from "./hook";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import YouTube from "react-youtube";

export default function BoardDetail() {
  const { data, onClickMoveEdit, onClickMoveBoards, youtubeOpts } =
    useBoardDetail();

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
            <Tooltip
              title={data?.fetchBoard.boardAddress?.address}
              placement="bottomRight"
            >
              <Image
                src="/img/location.svg"
                alt="locationImg"
                width={24}
                height={24}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {data?.fetchBoard.images.some((el) => el !== "") &&
        data?.fetchBoard.images.map((el, index) => (
          <div className="w-[500px] h-[500px] relative" key={index}>
            <Image
              src={`https://storage.googleapis.com/${el}`}
              alt=""
              fill
              objectFit="cover"
            />
          </div>
        ))}
      <div className="font-normal text-[16px] leading-6">
        {data?.fetchBoard.contents}
      </div>
      <div className="flex justify-center items-center bg-[#f2f2f2] py-6">
        <div className="w-[822px] h-[464px]">
          {" "}
          <YouTube
            videoId={data?.fetchBoard.youtubeUrl?.split("=")[1]}
            opts={youtubeOpts}
          />
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <div className="flex flex-col gap-1">
          <div className="w-6 h-6 relative">
            <DislikeOutlined />
          </div>
          <div>24</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-6 h-6 relative">
            <LikeOutlined />
          </div>
          <div>24</div>
        </div>
      </div>
      <div className="flex justify-center w-full gap-6">
        <button
          className="flex h-10 py-2 px-3 gap-2 border rounded-lg border-solid border-[#000000]"
          onClick={onClickMoveBoards}
        >
          <Image src="/img/list.svg" alt="listImg" width={24} height={24} />
          <div className="font-semibold text-[14px] text-center leading-5">
            목록으로
          </div>
        </button>
        <button
          className="flex h-10 py-2 px-3 gap-2 border rounded-lg border-solid border-[#000000]"
          onClick={onClickMoveEdit}
        >
          <Image src="/img/edit.svg" alt="editImg" width={24} height={24} />
          <div className="font-semibold text-[14px] text-center leading-5">
            수정하기
          </div>
        </button>
      </div>
    </div>
  );
}
