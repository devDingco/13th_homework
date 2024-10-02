import React from "react";
import "./Detail.css";

import PostTitle from "../components/detail/PostTitle";
import PostInformation from "../components/detail/PostInformation";
import PostContent from "../components/detail/PostContent";
import PostLike from "../components/detail/PostLike";
import PostButton from "../components/detail/PostButton";

const post = {
  title:
    "살어리 살어리랏다 청산에 살어리랏다 멀위랑 다래랑 먹고 청산에 살어리랏다",
  author: "홍길동",
  date: "",
};

const Detail = () => {
  return (
    <div className="post-detail-page">
      <PostTitle />
      <PostInformation />
      {/* <PostContent />
      <PostLike /> */}
      <PostButton />
    </div>
  );
};

export default Detail;
