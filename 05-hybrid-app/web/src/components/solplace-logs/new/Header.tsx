import Image from "next/image";
import left_arrow from "../../../../public/images/icons/left_arrow.svg";

export default function Header() {
  return (
    <div className="flex px-20 w-screen h-48">
      <div className="py-12">
        <div className="flex gap-8 justify-start">
          <Image src={left_arrow} alt="뒤로가기" />
          <span className="text-black text-lg font-bold leading-normal">
            플레이스 등록
          </span>
        </div>
      </div>
    </div>
  );
}
