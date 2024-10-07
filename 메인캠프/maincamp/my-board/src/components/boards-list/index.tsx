'use client';

import Image from 'next/image';
import { IFetchBoard } from './types';
import { useBoardsList } from './hooks';

export function BoardsList() {
  const { data, moveToDetailPage, deleteBoardFunc } = useBoardsList();
  return (
    <div className="w-full max-w-4xl mx-auto shadow-lg py-8 px-6 mt-8 bg-white rounded-2xl">
      <div className="grid grid-cols-2 font-bold text-lg mb-4 border-b pb-2">
        <div className="flex items-center">
          <span className="mr-14 ml-6 text-black">번호</span>
          <span className="text-black">제목</span>
        </div>
        <div className="flex space-x-16 justify-start pl-28">
          <span className="text-black">작성자</span>
          <span className="text-black">작성일</span>
        </div>
      </div>
      <div className="space-y-4 cursor-pointer">
        {data?.fetchBoards.map((el: IFetchBoard, index: number) => (
          <div
            key={el._id}
            onClick={() => moveToDetailPage(el._id)}
            className="flex justify-between items-center py-4 px-6 border border-solid rounded-md border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center">
              <span className="w-10 text-center text-gray-400 font-semibold">
                {index + 1}
              </span>
              <span className="ml-12 font-medium text-gray-700">
                {el.title}
              </span>
            </div>
            <div className="flex justify-start items-center space-x-12">
              <span className="text-gray-600 text-left">{el.writer}</span>
              <span className="text-gray-400">{el.createdAt.slice(0, 10)}</span>
              <button
                className="flex items-center justify-center invisible group-hover:visible transition-opacity"
                onClick={(e) => deleteBoardFunc(el._id, e)}
              >
                <Image
                  src="/images/delete.png"
                  width={20}
                  height={20}
                  alt="삭제"
                  className="cursor-pointer group-hover:opacity-75"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
