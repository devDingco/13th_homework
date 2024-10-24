"use client";

import Link from "next/link";
import { useMyPageMenu } from "@/commons/hooks/useMyPageMenu";

export default function MyPageSubMenu() {
  const { SubMenu } = useMyPageMenu();

  if (SubMenu)
    return (
      <div className="flex flex-col gap-6">
        <ul className="flex gap-4">
          {SubMenu.map((menu) => (
            <li key={menu.url}>
              <Link
                className={`p-2 rounded-lg flex justify-between items-center ${
                  menu.isActive && "bg-black rounded-lg text-white"
                }`}
                href={menu.url}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
}
