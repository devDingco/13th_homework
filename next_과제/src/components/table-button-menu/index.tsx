"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Button {
  name: string;
  link: string;
}

interface TableButtonMenuProps {
  menuList: Button[];
}

export default function TableButtonMenu(props: TableButtonMenuProps) {
  const pathname = usePathname();

  const { menuList } = props;
  return (
    <div className="flex flex-col gap-6">
      <ul className="flex gap-4">
        {menuList.map((button) => (
          <li key={button.name}>
            <Link
              className={`px-4 py-2 ${
                pathname === button.link && "bg-black rounded-lg text-white"
              }`}
              href={button.link}
            >
              {button.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
