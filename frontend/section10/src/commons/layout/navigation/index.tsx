import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MdArrowDropDown } from "react-icons/md";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const IMAGE_SRC = {
  tripImage: {
    src: require("@/assets/logo.png"),
    alt: "로고이미지",
  },
};
const NAVIGATION_OPTIONS = [
  {
    path: "/boards/list",
    name: "트립토크",
  },
  {
    path: "/boards/new",
    name: "새글임시임시",
  },
  {
    path: "",
    name: "마이페이지",
  },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(pathname);
  // console.log("dddd", pathname);

  return (
    <div className="h-[80px] w-full max-w-[1280px] flex justify-between">
      <div className="flex items-center gap-8">
        <Image src={IMAGE_SRC.tripImage.src} alt={IMAGE_SRC.tripImage.alt} />
        {NAVIGATION_OPTIONS.map((option, index) => (
          <Link
            href={option.path}
            key={option.name}
            onClick={() => {
              setActiveMenu(option.path);
            }}
            className={`${
              activeMenu === option.path && "border-b-2 border-black"
            } whitespace-nowrap prose-b_16_24 p-2`}
          >
            {option.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
        <MdArrowDropDown />
      </div>
    </div>
  );
}
