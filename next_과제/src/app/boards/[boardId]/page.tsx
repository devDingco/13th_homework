"use client";

import BoardDetail from "@/components/board-detail";
import CommentBox from "@/components/commentBox";
import CommentItemBox from "@/components/commentItemBox";

export default function BoardsDetailPage() {
  return (
    <>
      <BoardDetail />
      <CommentBox
        title="댓글"
        id="tripTalkComment"
        placeholder="댓글을 입력해 주세요."
        textMaxCount={100}
        type="commentWrite"
      />

      <CommentItemBox
        starCountBox={true}
        reply={false}
        user={{ img: "/images/user.png", name: "김개똥" }}
        content="너무 좋아요 여기에 내용이 들어간다구요~~~~~~~~~~~~~~~~~~~
ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ너무 좋아요 여기에 내용이 들어간다구요~~~~~~~~~~~~~~~~~~~
ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ너무 좋아요 여기에 내용이 들어간다구요~~~~~~~~~~~~~~~~~~~
ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ"
        date="2021.08.01"
        starCount={5}
      />
    </>
  );
}
