import { LABEL, PLACE_HOLDER } from "@/commons/constants/constants";
import { ChangeEventHandler } from "react";

export default function TextArea({
  id,
  onChange,
}: {
  id: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <p>{LABEL(id)}</p>
        <p className="text-red-400">*</p>
      </div>
      <textarea
        id={id}
        onChange={onChange}
        className="flex w-full h-[148px] flex-col items-start gap-1 self-stretch border border-[color:var(--Gray-Gray-200,#D4D3D3)] px-4 py-3 rounded-lg border-solid;"
        placeholder={PLACE_HOLDER(id)}
      />
    </div>
  );
}
