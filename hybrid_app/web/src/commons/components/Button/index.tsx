import { BUTTON } from "@/commons/constants/constants";

type ActionKey = keyof typeof BUTTON;

export default function Button({
  id,
  disabled,
}: {
  id: ActionKey;
  disabled: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={`${
        disabled ? "bg-gray-300" : "bg-blue-400"
      } w-full flex h-12 justify-center items-center gap-2 self-stretch px-4 py-3 rounded-lg text-gray-100`}
    >
      {BUTTON[id]}
    </button>
  );
}
