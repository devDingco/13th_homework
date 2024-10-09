import CardBox from "@/components/cardBox";
import MainSlide from "@/components/mainSlide";
import SearchBox from "@/components/searchBox";
import Icon from "@/components/iconFactory";
import BoardsPage from "@/app/boards/page";
import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
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
    </div>
  );
}

// 더미 데이터 나중에 삭제
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
