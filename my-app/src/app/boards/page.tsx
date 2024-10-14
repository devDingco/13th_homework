"use client";

import BoardListBanner from "@/components/boards-list/banner";
import Board from "@/components/boards-list/list";
import styles from "@/components/boards-list/list/styles.module.css";

export default function board() {
  return (
    <div>
      {/* <BoardListBanner /> */}
      <Board styles={styles} />
    </div>
  );
}
// import styles from "./styles.module.css";
// import Image from "next/image";

// // gql 쓰는용도
// import { useMutation, useQuery } from "@apollo/client";
// // 라우터.push 보내는 용도
// import { useRouter } from "next/navigation";

// // const FETCH_BOARDS = gql`
// //   query {
// //     fetchBoards(page: 1) {
// //       title
// //       writer
// //       createdAt
// //       _id
// //     }
// //   }
// // `;

// // const DELETE_BOARD = gql`
// //   mutation deleteBoard($boardId: ID!) {
// //     deleteBoard(boardId: $boardId)
// //   }
// // `;

// export default function Board() {
//   const { data } = useQuery(FETCH_BOARDS);
//   console.log(data);

//   const router = useRouter();

//   const goingBoardDetail = (id: string) => {
//     router.push(`/boards/${id}`);
//   };

//   const [deleteBoard] = useMutation(DELETE_BOARD);

//   const onClickDelete = (event) => {
//     event.stopPropagation();
//     deleteBoard({
//       variables: {
//         boardId: event.target.id,
//       },
//       refetchQueries: [
//         { query: FETCH_BOARDS },
//         // {}
//         // ....
//       ],
//     });
//     alert("삭제되었습니다!");
//   };

//   return (
//     <>
//       <div className={styles.boardContainer}>
//         <div className={styles.boardTop}>
//           <div className={styles.boardTopLeft}>
//             <div>번호</div>
//             <div>제목</div>
//           </div>
//           <div className={styles.boardTopRight}>
//             <div className={styles.Author}>작성자</div>
//             <div>날짜</div>
//           </div>
//         </div>

//         {data?.fetchBoards.map((el, index) => (
//           <div key={el._id}>
//             <div
//               className={styles.boardContents}
//               onClick={(e) => {
//                 // 이벤트가 전파되는 것을 방지
//                 e.stopPropagation();
//                 goingBoardDetail(el._id);
//               }}
//             >
//               <div className={styles.boardSide}>
//                 <div className={styles.boardNum}>{index + 1}</div>
//                 <div className={styles.boardTitle}>{el.title}</div>
//               </div>
//               <div className={styles.boardSide}>
//                 <div className={styles.boardName}>{el.writer}</div>
//                 <div className={styles.boardDate}>{el.createdAt}</div>
//               </div>
//               <span onClick={onClickDelete}>
//                 <Image
//                   src="/images/delete.png"
//                   alt="삭제하기"
//                   className={styles.deleteIcon}
//                   width={0}
//                   height={0}
//                   sizes="100vw"
//                   id={el._id}
//                 />
//               </span>
//             </div>
//           </div>
//         ))}
//         <div className={styles.boardContents}>
//           <div className={styles.boardSide}>
//             <div className={styles.boardNum}>243</div>
//             <div className={styles.boardTitle}>
//               제주 살이 1일차 - 이건 예비용
//             </div>
//           </div>
//           <div className={styles.boardSide}>
//             <div className={styles.boardName}>홍길동</div>
//             <div className={styles.boardDate}>2024.12.16</div>
//           </div>
//           <Image
//             src="/images/delete.png"
//             alt="삭제하기"
//             className={styles.deleteIcon}
//             width={0}
//             height={0}
//             sizes="100vw"
//           />
//         </div>

//         <div className={styles.boardContents}>
//           <div className={styles.boardSide}>
//             <div className={styles.boardNum}>243</div>
//             <div className={styles.boardTitle}>
//               제주 살이 1일차 - 이건 예비용
//             </div>
//           </div>
//           <div className={styles.boardSide}>
//             <div className={styles.boardName}>홍길동</div>
//             <div className={styles.boardDate}>2024.12.16</div>
//           </div>
//           <Image
//             src="/images/delete.png"
//             alt="삭제하기"
//             className={styles.deleteIcon}
//             width={0}
//             height={0}
//             sizes="100vw"
//           />
//         </div>
//       </div>
//     </>
//   );
// }
