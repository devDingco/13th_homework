import Image from "next/image";
import Link from "next/link";

export default function LayoutHeaderTransparentPage() {
  return (
    <div>
      <Image
        src="/images/sample.jpg"
        width={300}
        height={188}
        alt=""
        className="w-full"
      />
      <Link
        href="/section02/02-04-layout-header-untransparent"
        className="bg-black text-white p-3 inline-block rounded-lg"
      >
        투명하지 않은 헤더 페이지 가기
      </Link>
    </div>
  );
}
