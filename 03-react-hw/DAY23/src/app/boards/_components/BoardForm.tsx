import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, ApolloError } from "@apollo/client";
import styles from "./boardForm.module.css";
import InputField from "@/components/Input";
import TextareaField from "@/app/boards/new/_components/TextareaField";
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD } from "@/graphql/board";
import {
  BoardFormProps,
  FormData,
  CreateBoardInput,
  UpdateBoardInput,
} from "@/types/board";

export const BoardForm: React.FC<BoardFormProps> = ({ mode, boardId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [createBoard] = useMutation<
    { createBoard: { _id: string } },
    { createBoardInput: CreateBoardInput }
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    { updateBoard: { _id: string } },
    { updateBoardInput: UpdateBoardInput; password: string; boardId: string }
  >(UPDATE_BOARD);
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: { boardId },
    skip: mode === "create" || !boardId,
  });

  useEffect(() => {
    if (mode === "edit" && data?.fetchBoard) {
      setFormData({
        writer: data.fetchBoard.writer,
        password: "",
        title: data.fetchBoard.title,
        contents: data.fetchBoard.contents,
      });
    }
  }, [data, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: formData.writer,
              password: formData.password,
              title: formData.title,
              contents: formData.contents,
            },
          },
        });
        alert("게시글이 성공적으로 등록되었습니다.");
        if (result.data) {
          router.push(`/boards/${result.data.createBoard._id}`);
        }
      } else if (boardId) {
        // boardId가 존재하는지 확인
        const password = prompt("글을 수정하기 위해 비밀번호를 입력해주세요");
        if (!password) return;

        const updateBoardInput: UpdateBoardInput = {};
        if (formData.title !== data?.fetchBoard.title)
          updateBoardInput.title = formData.title;
        if (formData.contents !== data?.fetchBoard.contents)
          updateBoardInput.contents = formData.contents;

        await updateBoard({
          variables: {
            updateBoardInput,
            password,
            boardId,
          },
        });
        alert("게시글이 성공적으로 수정되었습니다.");
        router.push(`/boards/${boardId}`);
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        error.graphQLErrors.forEach((err) => {
          if (err.extensions?.code === "UNAUTHENTICATED") {
            alert("비밀번호가 틀렸습니다.");
          } else {
            alert(
              mode === "create"
                ? "게시글 등록 중 오류가 발생했습니다."
                : "게시글 수정 중 오류가 발생했습니다."
            );
          }
        });
      } else {
        alert(
          mode === "create"
            ? "게시글 등록 중 오류가 발생했습니다."
            : "게시글 수정 중 오류가 발생했습니다."
        );
      }
    }
  };

  if (mode === "edit" && loading) return <div>Loading...</div>;

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>{mode === "create" ? "게시물 등록" : "게시물 수정"}</nav>
      <form onSubmit={handleSubmit}>
        <InputField
          label="작성자"
          name="writer"
          value={formData.writer}
          onChange={handleChange}
          disabled={mode === "edit"}
          required={mode === "create"}
          className={styles.중간입력창크기}
        />
        {mode === "create" && (
          <InputField
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.중간입력창크기}
          />
        )}
        <InputField
          label="제목"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={styles.긴입력창크기}
        />
        <TextareaField
          label="내용"
          name="contents"
          value={formData.contents}
          onChange={handleChange}
          required
          className={styles.내용입력창크기}
          rows={6}
        />
        <div className={styles.취소등록버튼상자}>
          <button type="button" onClick={() => router.back()}>
            취소
          </button>
          <button type="submit" className={styles.등록하기버튼}>
            {mode === "create" ? "등록하기" : "수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
};
