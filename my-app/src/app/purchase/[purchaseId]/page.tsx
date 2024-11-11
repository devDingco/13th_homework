import PurchaseDetailCommentList from "@/components/purchase/purchase-detail/comment-list";
import PurchaseDetailCommentWrite from "@/components/purchase/purchase-detail/comment-wrtie";
import PurchaseDetail from "@/components/purchase/purchase-detail/detail";

export default function purchaseDetailPage() {
  return (
    <>
      <PurchaseDetail /> {/* 처음부터 문의하기 전까지 */}
      <PurchaseDetailCommentWrite /> {/* 문의하기 섹션 */}
      <PurchaseDetailCommentList /> {/* 댓글 섹션 컴포넌트 만들어서 붙이기*/}
      {/* TODO: 대댓글을 추가해줘야 하는데 나중에 미루기 */}
    </>
  );
}
