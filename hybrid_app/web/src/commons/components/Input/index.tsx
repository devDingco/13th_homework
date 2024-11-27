import { LABEL, PLACE_HOLDER } from "@/commons/constants/constants";

export default function Input({ id }: { id: string }) {
  return (
    <div>
      <div className="flex flex-row gap-1">
        <p>{LABEL(id)}</p>
        <p className="text-red-400">*</p>
      </div>
      <input
        className="flex flex-col w-full justify-center items-start border border-[color:var(--Gray-Gray-200,#D4D3D3)] px-4 py-3 rounded-lg border-solid"
        type="text"
        placeholder={PLACE_HOLDER(id)}
      />
    </div>
  );
}
