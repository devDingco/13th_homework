import AddIcon from "@/icons/Add";
import Link from "next/link";

export default function NewWritePlaceButton() {
  return (
    <Link
      href={`/solplace-logs/new`}
      className="fixed right-20 z-10 bottom-106 w-48 h-48 flex bg-[#2974e5] rounded-full justify-center items-center hover:cursor-pointer"
    >
      <AddIcon color="white" width="36" height="36" />
    </Link>
  );
}
