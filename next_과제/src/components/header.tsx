"use client";

import Link from "next/link";
import DarkModeButton from "@/components/darkModeButton";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Icon from "./iconFactory";

const Header = () => {
  const pathName = usePathname();

  const mainMenu = [
    { name: "트립토크", link: "/" },
    { name: "숙박권구매", link: "/buyticket" },
    { name: "마이페이지", link: "/mypage" },
    {
      name: "board",
      link: "/board",
      subnav: [
        { name: "게시글리스트", link: "/board/list" },
        // { name: "게시글상세", link: "/board/detail" },
        { name: "게시글등록", link: "/board/write" },
        // { name: "게시글수정", link: "/board/edit" },
      ],
    },
  ];

  return (
    <header className="max-w-7xl flex justify-between items-center m-auto p-4 navbar">
      <nav className="flex-1 items-center gap-6">
        <h1>
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              alt="트립트립"
              width={52}
              height={32}
            />
          </Link>
        </h1>
        <ul className="font-medium menu lg:menu-horizontal gap-4 text-base z-10 max-sm:hidden">
          {mainMenu.map((key, idx) => {
            return key.subnav ? (
              <li key={idx}>
                <details>
                  <summary className="rounded-none">{key.name}</summary>
                  <ul className="rounded-none">
                    {key.subnav.map((subkey, subidx) => {
                      return (
                        <li key={subidx}>
                          <Link
                            className={
                              "text-nowrap rounded-none p-2" +
                              (pathName === subkey.link ? " font-bold" : "")
                            }
                            href={subkey.link}
                          >
                            {subkey.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </li>
            ) : (
              <li key={idx}>
                <Link
                  className={
                    "rounded-none p-2" +
                    (pathName === key.link
                      ? " border-b-2 border-current font-bold"
                      : "")
                  }
                  href={key.link}
                >
                  {key.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex gap-6">
        <DarkModeButton />
        <Link href="/login" className="rounded-full btn btn-accent-content">
          로그인
          <span className="w-6 h-6 fill-base-100">
            <Icon icon="rightArrow" />
          </span>
        </Link>
      </div>
    </header>
  );
};
export default Header;
