import InputField from "@/components/inputField";
import Image from "next/image";
import right_arrow from "../../../../public/images/icons/right_arrow.svg";

export default function PlaceAddress() {
  return (
    <InputField name="플레이스 주소">
      <button className="w-full h-44 py-8 px-12 rounded-lg border border-black flex justify-between">
        <span>플레이스 주소 입력</span>
        <Image src={right_arrow} alt="오른쪽버튼" />
      </button>
    </InputField>
  );
}
