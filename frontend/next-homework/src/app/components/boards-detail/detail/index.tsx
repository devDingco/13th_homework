"use client";

import Image from "next/image";
import useBoardsDetail from "./hook";
import Link from "next/link";

const BoardsDetailComponent = () => {
  const { params, data } = useBoardsDetail();

  return (
    <div className="detailPostPage">
      {/* 제목 */}
      <div>
        <div>
          <pre>{data?.fetchBoard.title}</pre>
        </div>
        <div>
          <div>
            <Image src={"/images/profile_img.png"} alt="profile img" width={0} height={0} />
            <p>{data?.fetchBoard.writer}</p>
          </div>
          <p>{data?.fetchBoard.createdAt.split("T")[0]}</p>
        </div>
        <div>
          <button className="backNone">
            <Image src={"/icons/link.svg"} alt="link icon" width={0} height={0} />
          </button>
          <button className="backNone">
            <Image src={"/icons/location.svg"} alt="location icon" width={0} height={0} />
          </button>
        </div>
      </div>

      {/* 내용 */}
      <pre>{data?.fetchBoard.contents}</pre>

      {/* 버튼 */}
      <div>
        <div>
          <div>
            <button className="backNone">
              <Image src={"/icons/bad.svg"} alt="unlike icon" width={0} height={0} />
            </button>
            <p>{data?.fetchBoard.dislikeCount}</p>
          </div>
          <div>
            <button className="backNone">
              <Image src={"/icons/good.svg"} alt="ike icon" width={0} height={0} />
            </button>
            <p>{data?.fetchBoard.likeCount}</p>
          </div>
        </div>
        <div>
          <Link href={`/boards`}>
            <button className="backNone">
              <Image src={"/icons/menu.svg"} alt="menu icon" width={0} height={0} />
              목록으로
            </button>
          </Link>
          <Link href={`/boards/${params.boardId}/edit`}>
            <button className="backNone">
              <Image src={"/icons/edit.svg"} alt="edit icon" width={0} height={0} />
              수정하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetailComponent;
