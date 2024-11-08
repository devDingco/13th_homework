"use client";

import "react-quill/dist/quill.snow.css";
import { Modal } from "antd";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function WebEditorPage() {
  const router = useRouter();
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const onChangeContents = (value) => {
    setValue("contents", value); // React Hook Form에 값 설정
    trigger("contents"); // 검증 트리거
  };

  const onSubmit = async (data) => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          ...data,
          // writer: data.writer,
          // password: data.password,
          // title: data.title,
          // contents: data.contents,
        },
      },
    });
    console.log(result);

    Modal.success({ content: "게시글 등록에 성공하였습니다" });
    const boardId = result.data.createBoard._id;
    router.push(`/section30/30-02-web-editor-hook-form/${boardId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      작성자:
      <input type="text" {...register("writer")} />
      <br />
      비밀번호:
      <input type="password" {...register("password")} />
      <br />
      제목:
      <input type="text" {...register("title")} />
      <br />
      내용:
      <ReactQuill onChange={onChangeContents} defaultValue="" />
      <button type="submit">등록하기</button>
    </form>
  );
}
