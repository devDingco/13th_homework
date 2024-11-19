"use client";

import { useQuery } from "@apollo/client";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";
import { Modal } from "antd";
import { useState } from "react";

export default function SearchList() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery(FetchBoardsDocument);

  const modalOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {data?.fetchBoards.map((data) => (
        <div key={data._id} className="flex gap-4">
          <div>작성자 : {data.writer}</div>
          <div>제목 : {data.title}</div>
          <div>작성일 : {data.createdAt}</div>
        </div>
      ))}
      <br />
      <button onClick={modalOpen}>게시글 쓰기</button>

      {/* 뒤로가기 누르면 모달이 닫히지 않고, 이전페이지로 돌아감 => 하이브리드앱 개발시 문제가 됨 */}
      {isOpen && (
        <Modal open={true}>
          <div className="flex flex-col gap-3">
            <label htmlFor="">
              제목 : <input type="text" name="title" />
            </label>
            <label htmlFor="">
              내용 : <input type="text" name="contents" />
            </label>
            <button className="bg-black text-white">등록하기</button>
          </div>
        </Modal>
      )}
    </>
  );
}
