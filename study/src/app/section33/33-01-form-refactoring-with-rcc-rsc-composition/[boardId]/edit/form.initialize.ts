"use client";

import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { ISchema } from "./form.schema";
import { UseFormReturn } from "react-hook-form";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      title
      contents
    }
  }
`;

interface IUseInitialize {
  methods: UseFormReturn<ISchema>;
}

export const useInitialize = (methods) => {
  const { boardId } = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId },
  });

  // ! 수정하기 초기값 세팅
  useEffect(() => {
    if (!data) return;
    const { title, contents } = data?.fetchBoard;
    methods.setValue("title", title);
    methods.setValue("contents", contents);
    methods.trigger();
  }, [data]);

  // ! 수정완료 기능
  const onSubmit = async (data: ISchema) => {
    console.log(data);
  };

  return { onSubmit };
};
