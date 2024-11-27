import { BUTTON } from "@/commons/constants/constants";

type ActionKey = keyof typeof BUTTON;

export default function Button({ id }: { id: ActionKey }) {
  return (
    <button
      disabled={true}
      className="bg-gray w-full flex h-12 justify-center items-center gap-2 self-stretch px-4 py-3 rounded-lg text-lightGray"
    >
      {BUTTON[id]}
    </button>
  );
}
