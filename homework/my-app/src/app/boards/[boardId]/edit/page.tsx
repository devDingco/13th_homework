"use client";

import BoardsWrite from "@/components/boards-write";
import { useParams } from "next/navigation";

export default function BoardsEdit() {
  return <BoardsWrite isEdit={true} />;
}
