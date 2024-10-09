"use client";

import Link from "next/link";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Image from "next/image";
import { Button } from "antd";
import Icon from "@/components/iconFactory";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import { useState } from "react";

const Header = () => {
  const router = useRouter();

  const menuItems: MenuProps["items"] = [
    {
      label: <Link href="/">트립토크</Link>,
      key: "home",
    },
    {
      label: <Link href="/buyticket">숙박권구매</Link>,
      key: "buyticket",
    },
    {
      label: <Link href="/mypage">마이페이지</Link>,
      key: "mypage",
    },
    {
      label: "게시판 임시",
      key: "[boards]",
      children: [
        {
          label: <Link href="/boards">게시글리스트</Link>,
          key: "boards",
        },
        {
          label: <Link href="/boards/new">게시글등록</Link>,
          key: "boards/new",
        },
      ],
    },
  ];

  const [current, setCurrent] = useState("home");
  const onMenu: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <header className="max-w-7xl flex justify-between items-center m-auto p-4 navbar">
      <nav className="flex items-center gap-6">
        <h1>
          <Link href={"/"}>
            <Image
              className="dark:invert"
              src="/images/logo.png"
              alt="트립트립"
              width={52}
              height={32}
            />
          </Link>
        </h1>
        <Menu
          id={styles.menu}
          onClick={onMenu}
          selectedKeys={[current]}
          items={menuItems}
          mode="horizontal" // "vertical"
        />
      </nav>
      <div className="flex gap-6">
        <Button
          style={{ paddingRight: "15px" }}
          color="default"
          variant="solid"
          type="default"
          shape="round"
          size="large"
          onClick={() => router.push("/login")}
          icon={
            <Icon
              icon="rightArrow"
              className="w-5 h-5 dark:fill-black fill-white flex"
              viewBox="-3 0 24 24"
            />
          }
          iconPosition="end"
        >
          로그인
        </Button>
      </div>
    </header>
  );
};
export default Header;

{
  /* <ul className="font-medium menu lg:menu-horizontal gap-4 text-base z-10 max-sm:hidden">
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
        </ul> */
}
