import InputField from "@/components/inputField";
import Image from "next/image";
import right_arrow from "../../../public/images/icons/right_arrow.svg";
import { useRouter } from "next/navigation";

export default function PlaceAddress() {
  const router = useRouter();
  const onClickroute = () => {
    router.push(`/solplace-logs/new/map`);
  };
  return (
    <InputField name="플레이스 주소">
      <button
        onClick={onClickroute}
        className="w-full h-44 py-8 px-12 rounded-lg border border-black flex justify-between"
      >
        <input
          value="플레이스 주소 입력"
          className="text-black text-sm font-bold leading-tight h-full"
          readOnly
        />
        <Image src={right_arrow} alt="오른쪽버튼" />
      </button>
    </InputField>
  );
}
