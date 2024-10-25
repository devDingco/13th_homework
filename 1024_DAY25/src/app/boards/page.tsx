"use client";
import { useMutation, useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import deleteButton from "@assets/delete.png";
import { FETCH_BOARDS } from "src/components/boardQueries";
import { DELETE_BOARD } from "src/components/boardMutation";

// 1. 게시물 목록 가져오기
// 1-1 GraphQL 쿼리 작성 (FETCH_BOARDS)
// 여기서는 서버에서 게시물 목록을 가져오기 위한 "요청"을 만듬
// fetchBoards 라는 쿼리를 작성해서 서버에 보낼 때,
// 어떤 정보를 가져올지 지정합니다. 예를 들어, 게시물의 ID, 작성자, 제목 등
// 1-2 useQuery로 서버에 데이터요청
// useQuery 함수는 서버에 FETCH_BOARDS 쿼리를 보내는 역할을 함
// 서버에서 받은 결과는 data 라는 변수에 저장함
// 1-3 데이터를 화면에 표시
// 서버에서 받아온 데이터를 fetchBoards 리스트로 받아와, 하나하나 반복해서 화면에 표시
// el 은 각 게시물을 나타내며, index 는 몇 번째 게시물인지 알려줌

////////////
// 2. 게시물 클릭 시 상세보기
// 2-1 클릭 이벤트 핸들러 만들기
// 게시물을 클릭했을 때 실행되는 함수만들기
// 클릭한 게시물의 ID를 가져오기
// 2-2 router.push()로 페이지 이동
// 사용자가 클릭한 게시물의 ID에 따라, 상세 페이지로 이동
// /boards/${id} 는 해당 게시물의 자세한 내용을 볼 수 있는 URL
// 2-3 게시물 클릭 시 상세 페이지로 이동

///////////
// 3. 게시물 삭제
// 3-1 GraphQL 뮤테이션 작성 (DELETE_BOARD)
// 특정 게시물을 삭제하기 위한 요청을 만듬
// deleteBoard 라는 기능을 호출할 때, boardId 라는 특정 게시물의 ID를 같이 보내줌
// 3-2 useMutation으로 삭제 함수 생성
// useMutation 으로 서버에 게시물 삭제 요청을 보내는 함수를 만들어줌
// deleteBoard 라는 함수를 사용해서 삭제 작업을 함
// 3-3 삭제 버튼 클릭 시 삭제 요청
// 사용자가 삭제 버튼을 클릭했을 때 실행되는 함수를 만들어줌
// 클릭된 게시물의 ID를 확인하고 삭제 요청을 보냄
// 3-4 삭제 후 화면 갱신
// 삭제가 완료된 후, 다시 FETCH_BOARDS 쿼리를 실행해서 화면을 갱신합니다. (게시물 목록을 새로 불러옴)

// 1-1. GraphQL 쿼리 작성
// 게시물 1페이지 조회
// const FETCH_BOARDS 서버에 요청을 보내는 명령어/ 이름을 FETCH_BOARDS라고 지음
// const FETCH_BOARD = gql`
//   # query { fetchBoards {...} }: 서버에게 게시물 목록을 보내달라고 하는 명령
//   query fetchBoards {
//     # { _id, writer, title, createdAt }: 서버가 보내줄 정보들로 게시물의 ID, 작성자, 제목, 내용, 작성 날짜를 요청
//     fetchBoards {
//       _id
//       title
//       writer
//       createdAt
//     }
//   }
// `;

// 3-1. GraphQL 뮤테이션 작성

// const DELETE_BOARD = gql`
//   # mutation deleteBoard($boardId: ID!): 서버에게 "이 ID를 가진 게시물을 삭제하라"라고 요청하는 명령
//   #   // 뮤테이션 변수 이름 (타입지정)
//   # $boardId: 삭제할 게시물의 ID를 넘겨주기 위해서 변수를 사용
//   mutation deleteBoard($boardId: ID!) {
//     # // 백엔드에서 정해진 함수 이름 규칙
//     deleteBoard(boardId: $boardId)
//   }
// `;

export default function BoardsPage() {
  //페이지 이동을 위해 유즈라우터 사용
  const router = useRouter();

  // 1-2. useQuery를 사용하여 서버에서 데이터 요청
  // const { data }: 서버에서 받은 데이터를 저장할 곳을 만들기
  // 데이터는 data라는 이름으로 불러올 수 있음
  // useQuery(FETCH_BOARDS): 서버에 요청(쿼리 보내기), 서버가 응답해주면 그 내용을 받아옴
  // FETCH_BOARDS는 gql문법으로 요청을 보내는 함수명(우리가 서버에 보내는 요청)
  const { data } = useQuery(FETCH_BOARDS);
  console.log(data?.fetchBoards);

  // [hoveredId, setHoveredId] hovereId는 마우스를 올렸을때 그 게시물ID를 저장하려고 씀
  // setHoveredId는 hoveredId에 새로운 값을 넣고 싶을 때 사용하는 함수
  // hoveredId가 언제 바뀔지를 관리,
  //<string | null> 제네릭 타입으로 작성 - hoveredId가 어떤 종류의 값을 가질 수 있는지 설명하는 부분
  //값이 문자열이지만 처음에 마우스호버하지 않으면 값이 없을 것이기 때문에 null일 수 있다
  //useState(null)초기값은 null로 시작한다는 걸 의미
  // const [hoveredId, setHoveredId] = useState<string | null>(null);

  //제네릭쓰지않고 작성
  const [hoveredId, setHoveredId] = useState("");

  // --------3-2. useMutation을 사용해 서버에 요청-------------
  //gql에 쓰인 DELETE_BOARD를 useMutation에 쓰기 위해서 적용
  const [deleteBoard] = useMutation(DELETE_BOARD);

  // 삭제된 파일 조회해보기
  console.log("boards 페이지에서 data.fetchBoards::::", data?.fetchBoards);

  //   --------2-1 게시물 클릭 이벤트 핸들러 만들기------------
  //게시글 클릭했을 때 id를 가져와서 디테일페이지로 이동
  const onClickDetail = async (
    // MouseEvent<HTMLButtonElement>는 이 이벤트가 HTML의 <button> 태그에서 발생한 마우스 클릭 이벤트임을 나타냄
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    event.stopPropagation();
    router.push(`/boards/${id}`);
  };

  //  3-3 삭제 버튼 클릭 시 삭제 요청 보내기
  //   게시물 삭제를 처리하는 함수 만들기
  // async: 비동기 함수 => 함수 내에서 api호출
  const onClickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    //event.stopPropagation(): 이 함수는 이벤트가 부모 요소로 전파되는 것을 막음
    // 즉, 버튼을 클릭했을 때, 다른 상위 요소들에게 클릭 이벤트가 전달되지 않게 함
    event.stopPropagation();
    // try: 블록 안에서 발생할 수 있는 오류를 감지하기 위해 사용하는 키워드
    // 오류가 발생하면 catch로 반환
    try {
      //await: 비동기 작업 deleteBoard(...)이 완료될 때까지 기다림
      const deleteResult = await deleteBoard({
        //$와 같은 의미를 가진 gql 쿼리나 뮤테이션에서 사용할 변수를 설정하는 객체
        // variables: { boardId 뮤테이션에서 요구하는 매개변수 이름 : 상태변수}
        variables: { boardId: hoveredId },
        // 2-4. 삭제 후 화면 갱신
        // refetchQueries 게시물 삭제 후 특정 쿼리를 다시 가져오는 데 사용
        // [{ query: FETCH_BOARDS }]: 다시 가져올 쿼리를 배열로 지정
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
      console.log("삭제 성공:", deleteResult.data.deleteBoard);
      //   catch (err): try 블록에서 오류가 발생했을 때 실행되는 코드 블록
      // err는 발생한 오류를 담고 있음
    } catch (err) {
      // "삭제실패:" 라는 문자열과 오류의 내용을 출력
      console.error("삭제 실패:", err);
    }
  };

  // 보여지는 화면
  return (
    <div className={styles.board_list}>
      <div className={styles.header_box}>
        <div>번호</div>
        <div>제목</div>
        <div>작성자</div>
        <div>날짜</div>
      </div>
      <div className={styles.list_box}>
        {/* 데이터 안에 fetchBoards안에 있는 객체들을 하나씩 순회해서 데이터 뽑아오기 */}

        {/* 1-3. 데이터를 화면에 표시하기 */}
        {/* `{data?.fetchBoards.map(...)}: 
                서버에서 받은 게시물 목록을 하나씩 반복하면서 화면에 그림 
                data? 옵셔널체이닝 : data가 undefined이거나 null이 아닐 때만 
                fetchBoards를 가져오게 하는 안전 장치 
                만약 data가 없다면 오류가 발생하지 않고 undefined를 반환
                fetchBoards는 게시물 목록을 가져오는 쿼리의 결과로, 여러 개의 게시물 정보가 담긴 배열
                .map: 배열을 순회하면서 각 요소에 대해 특정 작업을 수행하는 메서드 */}
        {/* el은 순회중인 게시물을 뜻함, 각 게시물의 정보가 이 변수에 저장됨 */}
        {data?.fetchBoards.map((el, index) => (
          <div
            // id={el._id}
            // id: HTML요소의 속성이며, 웹 페이지 내에서 특정 요소를 식별하거나 스타일을 적용할 때 사용
            //id는 React의 렌더링 성능에는 영향을 미치지 않음
            // key: React에서 리스트의 각 요소를 고유하게 식별하기 위해 사용
            // React는 이를 내부적으로 사용하여 요소를 추적하고 리렌더링 최적화를 수행
            // key는 React 렌더링 프로세스에 필수적이며, 어떤 요소가 추가되거나 삭제됐는지 추적 가능
            key={el._id}
            className={styles.board_box}
            //마우스를 올렸을때
            // 마우스가 게시물에 올라가면 해당 게시물의 ID를 저장
            onMouseEnter={() => setHoveredId(el._id)}
            //마우스를 땠을때
            //마우스 동작 함수 연결해주기
            // 마우스가 벗어나면 ID를 ""로 설정
            onMouseLeave={() => setHoveredId("")}
            onClick={(event) => onClickDetail(event, el._id)}
          >
            {/* 인덱스가 0부터 시작하니까 게시물의 번호를 1부터 보여주기 위해서 index + 1 함 */}
            <div>{index + 1}</div>
            {/* {el.title}, {el.writer}, {el.createdAt}: 
                        각각 게시물의 제목, 작성자, 작성 날짜를 화면에 보여줌*/}
            <div>{el.title}</div>
            <div>{el.writer}</div>
            {/* createdAt: 게시물의 생성 날짜와 시간 정보를 가져옴.
split("T"): 날짜와 시간을 "T"로 나누어 배열로 만듦.
[0]: 배열의 첫 번째 값(날짜)만 선택함.
replace(/-/g, "."): 날짜의 "-"을 "."으로 바꿈.
<div>: 변환된 날짜를 HTML로 출력함. */}
            <div>{el.createdAt.split("T")[0].replace(/-/g, ".")}</div>

            {/* //// */}
            {/* hoveredId와 el._id 의 내용이 같을 때만 버튼을 보여줘. 
            hoveredId: 마우스를 올린 게시물의 ID
            el._id: 현재 게시물의 ID
            &&이 조건이 참일 때만 뒤에 있는 코드를 실행하라 
            */}

            {hoveredId === el._id && (
              <button
                onClick={onClickDelete}
                className={
                  //마우스가 그 게시물에 올라와 있으면 styles.delete_btn_box_hover 스타일을 적용
                  //그렇지 않으면 styles.delete_btn_box 스타일을 적용
                  hoveredId
                    ? styles.delete_btn_box_hover
                    : styles.delete_btn_box
                }
              >
                <Image
                  className={styles.delete_btn}
                  width={24}
                  height={24}
                  src={deleteButton}
                  alt="삭제버튼"
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
