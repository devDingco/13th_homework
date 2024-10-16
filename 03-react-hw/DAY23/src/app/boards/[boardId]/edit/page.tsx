"use client";

import React from "react";
import { useParams } from "next/navigation";
import BoardForm from "@/components/BoardForm";

const EditBoardPage: React.FC = () => {
  const params = useParams();
  const boardId = params.boardId as string;

  return <BoardForm mode="edit" boardId={boardId} />;
};

export default EditBoardPage;
