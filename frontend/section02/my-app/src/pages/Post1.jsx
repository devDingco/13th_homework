import React from "react";
import PostForm from "../components/post/PostForm";
import "./Post.css";

const Post = () => {
  return (
    <div className="editor-page">
      <div className="editor-header">게시물 등록</div>
      <PostForm />
    </div>
  );
};

export default Post;
