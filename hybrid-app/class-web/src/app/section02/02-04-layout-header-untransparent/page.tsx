import Link from "next/link";

export default function LayoutHeaderUnTransparentPage() {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ipsum
        neque fugiat vero molestias velit suscipit itaque eaque, hic illum error
        accusamus atque explicabo iusto qui nulla excepturi eos assumenda.
      </p>
      <Link
        href="/section02/02-04-layout-header-transparent"
        className="bg-black text-white p-3 inline-block rounded-lg"
      >
        투명한 헤더 페이지 가기
      </Link>
    </div>
  );
}
