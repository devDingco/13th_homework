"use client";
import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const NEW_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $number: Int
    $writer: String
    $title: String
    $contents: String
  ) {
    updateBoard(
      number: $number
      writer: $writer
      title: $title
      contents: $contents
    ) {
      _id
      number
      message
    }
  }
`;

interface FetchBoardData {
  fetchBoard: {
    number: number;
    writer: string;
    title: string;
    contents: string;
  };
}

interface BoardsWriteProps {
  isEdit?: boolean;
  data?: {
    fetchBoard: {
      writer: string;
      title: string;
      contents: string;
    };
  };
  query?: { query: FetchBoardData; variables: { id: number } };
}

export default function BoardsWrite(props: BoardsWriteProps) {
  const router = useRouter();
  const params = useParams();
  const {
    isEdit = false, // isEdit 등록, 수정 여부를 판단하는 변수, 기본값은 false(등록)
    data = null, // data 수정 시 기존 데이터를 불러오는 변수, 기본값은 null
    query = null, // query 수정 시 기존 데이터를 불러오는 쿼리, 기본값은 null
  } = props;

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [newBoard] = useMutation(NEW_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const onChangeValue = (
    event: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = event.target.value;
    const typeSet: {
      [key: string]: () => void;
    } = {
      writer: () => setWriter(value),
      title: () => setTitle(value),
      contents: () => setContents(value),
    };

    typeSet[type]();
  };

  const onClickNewBoard = async () => {
    // useMutation Hook을 이용해 graphql mutation을 요청하는 코드
    const result = await newBoard({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
    alert("등록이 완료되었습니다.");
    router.push(`/boards/${result.data.createBoard.number}`);
  };

  interface IupdateVariables {
    number: number;
    writer?: string;
    title?: string;
    contents?: string;
  }

  const onClickUpdateBoard = async () => {
    // 변경된 값이 있는 경우에만 variables에 추가 (number값은 필수)
    const updateVariables: IupdateVariables = {
      number: Number(params.boardId),
    };
    if (writer !== "") updateVariables["writer"] = writer;
    if (title !== "") updateVariables["title"] = title;
    if (contents !== "") updateVariables["contents"] = contents;

    // 수정 버튼을 눌렀을 때 실행되는 함수
    const result = await updateBoard({
      variables: updateVariables,
      refetchQueries: [
        { query: query, variables: { id: Number(params.boardId) } },
      ],
    });
    console.log(result);
    alert("수정이 완료되었습니다.");
    router.push(`/boards/${result.data.updateBoard.number}`);
  };

  return (
    <>
      <div className="flex flex-col gap-1 items-start">
        작성자:{" "}
        <input
          className="border"
          type="text"
          onChange={(e) => onChangeValue(e, "writer")}
          defaultValue={isEdit ? data?.fetchBoard.writer : ""}
        />
        <br />
        제목:{" "}
        <input
          className="border"
          type="text"
          onChange={(e) => onChangeValue(e, "title")}
          defaultValue={isEdit ? data?.fetchBoard.title : ""}
        />
        <br />
        내용:{" "}
        <input
          className="border"
          type="text"
          onChange={(e) => onChangeValue(e, "contents")}
          defaultValue={isEdit ? data?.fetchBoard.contents : ""}
        />
        <br />
        <button
          className="btn btn-primary text-base-100"
          onClick={isEdit ? onClickUpdateBoard : onClickNewBoard}
        >
          {isEdit ? "수정" : "등록"} 하기
        </button>
      </div>
    </>
  );
}
