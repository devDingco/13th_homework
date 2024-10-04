"use client";

import "./styles.module.css";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";

// assets import
import bannerImg from "../../../../public/images/detail_banner.png";
import videoImg from "../../../../public/images/detail_video.png";
import postImg from "../../../../public/images/detail_img.png";
import profileImg from "../../../../public/images/profile_img.png";

import linkIcon from "../../../../public/icons/link.svg";
import locationIcon from "../../../../public/icons/location.svg";
import likeIcon from "../../../../public/icons/good.svg";
import unlikeIcon from "../../../../public/icons/bad.svg";
import menuIcon from "../../../../public/icons/menu.svg";
import editIcom from "../../../../public/icons/edit.svg";
import leftArrowIcon from "../../../../public/icons/left_arrow.svg";
import loginIcon from "../../../../public/icons/login.svg";

// 데이터 불러오기
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
    }
  }
`;

const BoardsDetail = () => {
  const params = useParams();

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  console.log(data?.fetchBoard);

  return (
    <div className="detailPostPage">
      {/* 모바일 헤더 */}
      <div className="detailMobileHeader">
        <Image src={leftArrowIcon} alt="back" />
        <div className="detailMobileLogin">
          <p>로그인</p>
          <Image src={loginIcon} alt="login" />
        </div>
      </div>
      <div className="detailMobileBanner">
        <Image src={bannerImg} alt="banner img" />
      </div>

      {/* 제목 */}
      <div>
        <div>
          <pre>{data?.fetchBoard.title}</pre>
        </div>
        <div>
          <div>
            <Image src={profileImg} alt="profile img" />
            <p>{data?.fetchBoard.writer}</p>
          </div>
          <p>{data?.fetchBoard.createdAt}</p>
        </div>
        <div>
          <button className="backNone">
            <Image src={linkIcon} alt="link icon" />
          </button>
          <button className="backNone">
            <Image src={locationIcon} alt="location icon" />
          </button>
        </div>
      </div>

      {/* 내용 */}
      <div>
        <div>
          <Image src={postImg} alt="post img" />
        </div>
        <pre>{data?.fetchBoard.contents}</pre>
        <div>
          <Image src={videoImg} alt="video img" />
        </div>
      </div>

      {/* 버튼 */}
      <div>
        <div>
          <div>
            <button className="backNone">
              <Image src={unlikeIcon} alt="unlike icon" />
            </button>
            <p>{data?.fetchBoard.dislikeCount}</p>
          </div>
          <div>
            <button className="backNone">
              <Image src={likeIcon} alt="ike icon" />
            </button>
            <p>{data?.fetchBoard.likeCount}</p>
          </div>
        </div>
        <div>
          <Link href={`/boards`}>
            <button className="backNone">
              <Image src={menuIcon} alt="menu icon" />
              목록으로
            </button>
          </Link>
          <Link href={`/boards/${params.boardId}/edit`}>
            <button className="backNone">
              <Image src={editIcom} alt="edit icon" />
              수정하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetail;
