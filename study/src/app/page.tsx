"use client";

import CardBox from "@/components/cardBox";
import MainSlide from "@/components/mainSlide";
import SearchBox from "@/components/searchBox";
import Icon from "@/components/iconFactory";
import BoardsPage from "@/app/boards/page";
import Headers from "@/components/header";
import Link from "next/link";

export default function Home() {
  const cardData = [
    {
      img: "/images/img-0.png",
      title: "제목입니다.",
      writer: "작성자이름",
      writerimg: "/images/img-0.png",
      goodcount: 0,
      writedate: "2024.02.20",
    },
    {
      img: "/images/img-0.png",
      title: "제목입니다.",
      writer: "작성자이름",
      writerimg: "/images/img-0.png",
      goodcount: 0,
      writedate: "2024.02.20",
    },
    {
      img: "/images/img-0.png",
      title: "제목입니다.",
      writer: "작성자이름",
      writerimg: "/images/img-0.png",
      goodcount: 0,
      writedate: "2024.02.20",
    },
    {
      img: "/images/img-0.png",
      title: "제목입니다.",
      writer: "작성자이름",
      writerimg: "/images/img-0.png",
      goodcount: 0,
      writedate: "2024.02.20",
    },
  ];

  return (
    <div>
      <Headers />
      <MainSlide />

      <div className="max-xl:mx-5 max-w-7xl m-auto py-10 max-sm:pl-6 max-sm:pt-6">
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-xl">오늘 핫한 트립토크</h3>
          <div className="grid grid-cols-4 gap-8 max-sm:flex max-sm:gap-4 max-sm:overflow-x-auto overflow-hidden max-sm:mr-[-100px]">
            {cardData.map((data, idx) => {
              return <CardBox key={idx} data={data} />;
            })}
          </div>
        </div>
      </div>

      <div className="mainContent">
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-xl">트립토크 게시판</h3>
          <div className="flex gap-4 justify-between flex-wrap">
            <SearchBox />
            <Link
              href="/boards/new"
              className="btn btn-primary text-white max-sm:fixedBtn"
            >
              <Icon icon="rwite" className="w-6 h-6 fill-white" />
              트립토크 등록
            </Link>
          </div>
          {/* !!!!!!!!!! 검색시 보이는 내용 바뀌도록 처리 필요 */}
          <BoardsPage />
        </div>
      </div>
      {/* {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img
              src={data.sprites.front_shiny}
              alt={data.species.name}
              width={100}
              height={100}
            />
          </>
        ) : null} */}

      {/* <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center mb-12">Count is {counter}</div>

        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              dispatch(increment());
            }}
          >
            Increment
          </button>
          <button
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              dispatch(decrement());
            }}
          >
            Decrement
          </button>

          <button
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              dispatch(incrementByAmount(10));
            }}
          >
            Incement By 10
          </button>
        </div>
      </main> */}
    </div>
  );
}
