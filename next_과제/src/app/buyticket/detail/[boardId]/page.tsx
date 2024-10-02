import CommentBox from "@/components/commentBox";
import CommentItemBox from "@/components/commentItemBox";

export default function BuyTicket() {
  return (
    <div>
      <h1>숙박권구매 페이지 노출</h1>
      <CommentBox
        title="문의하기"
        textMaxCount={100}
        placeholder="댓글을 입력해 주세요."
        id="comment"
        type="comment"
        starCountBox={false}
      />
      <CommentItemBox
        user={{ img: "/images/user.png", name: "user" }}
        content="댓글 내용"
        date="2021-09-01"
        starCountBox={false}
      />
    </div>
  );
}
