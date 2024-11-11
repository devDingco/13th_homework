import Link from "next/link";

export default function PerchaseMain() {
  return (
    <>
      <div>구매하기 메인 페이지 입니다.</div>
      <br />
      <br />
      <button>
        <Link href="/purchase/purchaseId">상품 & 일정 상세보기 버튼</Link>
      </button>
      <br />
      <br />
      <button>
        <Link href="/purchase/purchaseWrite">상품 & 일정 등록하기 버튼</Link>
      </button>
      <br />
      <br />
      <button>
        <Link href="/purchase/purchaseId/edit">상품 & 일정 수정하기 버튼</Link>
      </button>
    </>
  );
}
