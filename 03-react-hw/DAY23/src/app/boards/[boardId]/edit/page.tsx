"use client";

import React from "react";
import { useParams } from "next/navigation";
import { BoardForm } from "../../_components/BoardForm";

export const EditBoardPage: React.FC = () => {
  const params = useParams();
  const boardId = params.boardId as string;

  return <BoardForm mode="edit" boardId={boardId} />;
};
