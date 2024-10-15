"use client";
import Link from "next/link";
import { Menu } from "antd";
import Image from "next/image";
import { Button } from "antd";
import Icon from "@/components/iconFactory";
import { useHeader } from "./hook";
import styles from "./index.module.scss";

const Header = () => {
  const { isHeaderHide, onMenu, menuItems, current, router } = useHeader();

  if (!isHeaderHide)
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
                style={{ cursor: "pointer", width: "52px", height: "32px" }}
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
            // type="default"
            shape="round"
            size="large"
            onClick={() => router.push("/login")}
            icon={
              <Icon
                icon="rightArrow"
                className="w-5 h-5 flex"
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
