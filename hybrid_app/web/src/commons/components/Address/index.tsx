import { BUTTON } from "@/commons/constants/constants";

export default function Address () {
  return (
    <div>
      <div>플레이스 주소</div>
    <button className="flex h-11 w-full justify-between items-center self-stretch border border-[color:var(--gray-B,#000)] px-3 py-2 rounded-lg border-solid">{BUTTON.ADDRESS}</button>
    </div>
  )
}