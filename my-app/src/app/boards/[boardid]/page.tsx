"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";

const image_src = {
  profileimg: {
    src: require("@assets/img.svg"),
  },
  linkimg: {
    src: require("@assets/image2.svg"),
  },
  locationimg: {
    src: require("@assets/room.svg"),
  },
  cheongsanimg: {
    src: require("@assets/beach.png"),
  },
  neotubeimg: {
    src: require("@assets/Frame.svg"),
  },
  badImage: {
    src: require("@assets/Vector.svg"),
    alt: "싫어요",
  },
  goodImage: {
    src: require("@assets/good.svg"),
    alt: "좋아요",
  },
  hamberger: {
    src: require("@assets/footer2.svg"),
    alt: "목록아이콘",
  },
  pencil: {
    src: require("@assets/footer1.svg"),
    alt: "수정아이콘",
  },
};

const fetchboard = gql`
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

export default function Detail() {
  const params = useParams();
  console.log(params, "params 확인");

  const { data } = useQuery(fetchboard, {
    variables: {
      boardId: params.boardid,
    },
  });

  console.log(data, "data");

  // const router = useRouter()
  // const onClickSubmit = () => {
  //   router.push(/"boards")
  //   const params = useParams();
  //   const { data } = useQuery(fetchBoards, {
  //     variables: { mynumber: Number(params.Boardid) },
  //   });
  // };

  return (
    <>
      <div className={styles.전체박스}>
        <div className={styles.타이틀}>{data?.fetchBoard.title}</div>
        <div className={styles.헤더전체박스}>
          <div className={styles.윗줄전체박스}>
            <div className={styles.홍길동박스}>
              <Image src={image_src.profileimg.src} alt="" />
              <div>{data?.fetchBoard.writer}</div>
            </div>

            <div className="날짜">
              {data?.fetchBoard.createdAt.split("T")[0].replace(/-/g, ".")}
            </div>
          </div>
          <hr className={styles.hr스타일} />
          <div className={styles.아랫줄전체박스}>
            <Image src={image_src.linkimg.src} alt="" />
            <Image src={image_src.locationimg.src} alt="" />
          </div>
        </div>
        <Image src={image_src.cheongsanimg.src} alt="" />
        <div>{data?.fetchBoard.contents}</div>
        <div className={styles.영상사진박스}>
          <Image src={image_src.neotubeimg.src} alt="" />
        </div>
        <div className={styles.푸터전체박스}>
          <div className={styles.하트전체박스}>
            <Image
              className={styles.왼쪽하트}
              src={image_src.badImage.src}
              alt="싫어요"
            />
            <Image
              className="오른쪽하트"
              src={image_src.goodImage.src}
              alt="좋아요"
            />
          </div>
          <div className={styles.숫자박스}>
            <div className={styles.왼쪽24}>24</div>
            <div className={styles.오른쪽12}>12</div>
          </div>
        </div>
        <div className={styles.푸터2전체박스}>
          <button className={styles.button}>
            <Image src={image_src.hamberger.src} alt="목록아이콘" />
            <div>목록으로</div>
          </button>
          <button className={styles.button}>
            <Image src={image_src.pencil.src} alt="수정아이콘" />
            <div>수정하기</div>
          </button>
        </div>
      </div>
    </>
  );
}

// export default Detail;
