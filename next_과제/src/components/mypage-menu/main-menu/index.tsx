"use client";

import Link from "next/link";
import Icon from "@/components/icon-factory";
import { useMyPageMenu } from "@/commons/hooks/useMyPageMenu";

export default function MyPageInfoMenu() {
  const { MainMenu } = useMyPageMenu();

  return (
    <ul className="flex flex-col gap-2">
      {MainMenu.map((menu) => {
        return (
          <li key={menu.url}>
            <Link
              className={`p-2 rounded-lg flex justify-between items-center${
                menu.isActive && " bg-gray-100 font-bold"
              }`}
              href={menu.url}
            >
              {menu.name}
              <Icon icon="rightArrow" className="w-4" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
