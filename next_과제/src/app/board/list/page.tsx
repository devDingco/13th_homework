"use client";

import Icon from "@/components/iconFactory";
import { useEffect, useState } from "react";

export default function BoardList() {
  const [postsData, SetPostsData] = useState([]);

  async function dataGet() {
    const data = await fetch("");
    const posts = await data.json();
    SetPostsData(posts.data);
  }
  // dataGet();
  console.log(postsData);

  interface postsData {
    boardId: number;
    title: string;
    author: string;
    createdAt: string;
  }

  useEffect(() => {
    dataGet();
    // document.getElementById("boardListItem");
  }, []);

  return (
    <div className="shadow-md rounded-2xl px-12 py-6">
      <div className="overflow-x-auto">
        <table className="table text-center border-separate border-spacing-x-0 border-spacing-y-3 font-medium">
          {/* head */}
          <thead className="text-neutral text-base font-medium">
            <tr className="border-none">
              <th>번호</th>
              <th className="w-4/6 text-left">제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {/* {!postsData ? (
              <div>로딩중...</div>
            ) : (
              postsData.map((post: postsData, idx: number) => {
                return (
                  <tr key={idx} id="boardListItem">
                    <td className="border-solid border-y border-l rounded-s-xl border-gray-100 font-medium text-neutral-400">
                      {post.boardId}
                    </td>
                    <td className="border-solid border-y border-gray-100 text-left text-neutral">
                      {post.title}
                    </td>
                    <td className="border-solid border-y border-gray-100 text-neutral-600 font-normal">
                      {post.author}
                    </td>
                    <td className="border-solid border-y border-gray-100 font-light text-neutral-400">
                      {post.createdAt.split("T")[0].replace(/-/g, ".")}
                    </td>
                    <td className="border-solid border-y border-gray-100 border-r rounded-e-xl pl-0">
                      <Icon
                        icon="delete"
                        className="fill-gray-500 w-fit"
                        width="16"
                        height="18"
                      />
                    </td>
                  </tr>
                );
              })
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
