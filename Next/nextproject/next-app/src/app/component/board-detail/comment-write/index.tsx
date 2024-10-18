import React from "react";
import CommentListPage from "../comment-list";
import CommentWriteBox from "./comment-write-box";
export default function CommentPage() {
  return (
    <>
      <div>
        <CommentWriteBox />
        <CommentListPage />
      </div>
    </>
  );
}
