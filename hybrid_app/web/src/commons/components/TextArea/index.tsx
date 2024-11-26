import { LABEL, PLACE_HOLDER } from "@/commons/constants/constants";

export default function TextArea({ id }: { id: string }) {
  return (
    <div>
      <div className="flex flex-row gap-1">
        <p>{LABEL(id)}</p>
        <p className="text-red-400">*</p>
      </div>
      <textarea
        className="flex w-full h-[148px] flex-col items-start gap-1 self-stretch border border-[color:var(--Gray-Gray-200,#D4D3D3)] px-4 py-3 rounded-lg border-solid;"
        placeholder={PLACE_HOLDER(id)}
      />
    </div>
  );
}
