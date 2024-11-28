import { LABEL, PLACE_HOLDER } from "@/commons/constants/constants";
import { ChangeEventHandler } from "react";

export default function Input({
  id,
  onChange,
}: {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <p>{LABEL(id)}</p>
        <p className="text-red-400">*</p>
      </div>
      <input
        id={id}
        onChange={onChange}
        className="flex flex-col w-full justify-center items-start border border-[color:var(--Gray-Gray-200,#D4D3D3)] px-4 py-3 rounded-lg border-solid"
        type="text"
        placeholder={PLACE_HOLDER(id)}
      />
    </div>
  );
}
