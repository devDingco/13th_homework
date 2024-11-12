"use client";
import React, { useEffect, useRef, useState } from "react";

import NewFormText from "@/app/boards/new/_components/NewFormText";
import { Button } from "@/components/ui/button";
import Ratings from "@/components/ui/ratings";
import "@/app/boards/new/styles.css";
import { MdOutlineComment } from "react-icons/md";
import { CREATE_COMMENT, FETCH_COMMENTS } from "@/app/queries/comments-queries";
import { useMutation } from "@apollo/client";

export default function DetailCommentWrite({ boardId }: IDeteailCommentProps) {
  const [createComment] = useMutation(CREATE_COMMENT);

  const [input, setInput] = useState<ICommentInput>({
    author: "",
    password: "",
    comment: "",
    rating: 0,
  });
  const handleRatingChange = (newRating: number) => {
    setInput((prev) => ({ ...prev, rating: newRating }));
  };

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const onClickSubmit = async () => {
    try {
      console.log("댓글 등록 쿼리 실행");
      const result = await createComment({
        variables: {
          boardId: boardId,
          createBoardCommentInput: {
            writer: input.author,
            password: input.password,
            contents: input.comment,
            rating: input.rating,
          },
        },
        refetchQueries: [
          { query: FETCH_COMMENTS, variables: { page: 1, boardId: boardId } },
        ],
      });
      console.log("댓글 등록 성공", result);
      setInput({ author: "", password: "", comment: "", rating: 0 });
    } catch (error) {
      console.log("댓글 등록 오류", error);
    }
  };

  const isDisabled = !(input.author && input.password);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 prose-sb_18_24">
        <MdOutlineComment />
        댓글
      </div>
      <div>
        <Ratings rating={input.rating} onRatingChange={handleRatingChange} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 w-full max-w-[640px]">
          <NewFormText
            title={"author"}
            onChange={onChangeInput}
            value={input.author}
          />
          <NewFormText
            title={"password"}
            onChange={onChangeInput}
            value={input.password}
          />
        </div>
        <NewFormText
          title={"comment"}
          onChange={onChangeInput}
          value={input.comment}
        />
      </div>
      <div className="flex justify-end prose-sb_16_24">
        <Button
          className=""
          variant={"blue"}
          disabled={isDisabled}
          onClick={onClickSubmit}
        >
          댓글 등록
        </Button>
      </div>
    </div>
  );
}
