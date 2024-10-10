import React from "react";
import NewForm from "./_components/NewForm";
import "./styles.css";

const BoardsNew = () => {
  return (
    <div className="boards-new-page">
      <div className="editor-header">게시물 등록</div>
      <NewForm />
    </div>
  );
};

export default BoardsNew;
