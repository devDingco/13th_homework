"use client";

import Image from "next/image";
import logo from "/public/img/logo_raw.png";
import { CSSProperties, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useQuery } from "@apollo/client";
import { FetchUserLoggedInDocument } from "@/common/graphql/graphql";

import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space } from "antd";
import { LogoutOutlined, ThunderboltFilled, UserOutlined, WalletOutlined } from "@ant-design/icons";
import { css } from "@/common/styled-system/css";

export default function LayoutNav() {
    const [isSelect, setIsSelect] = useState("mainPage");
    const router = useRouter();

    const { data: login } = useQuery(FetchUserLoggedInDocument);

    function onNavClick(e: MouseEvent) {
        const target = e.target as HTMLLIElement;
        setIsSelect(target.id);

        switch (target.id) {
            case "mainPage": {
                router.push(`/boards`);
                break;
            }
            case "subPage": {
                router.push(`/product`);
                break;
            }
            case "myPage": {
                router.push(`/mypage`);
                break;
            }
        }
    }

    const handleMenuClick: MenuProps["onClick"] = (e) => {
        switch (e.key) {
            case "1": {
                router.push(`/mypage`);
                break;
            }
            case "2": {
                router.push(`/mypage`);
                break;
            }
            case "3": {
                router.push(`/mypage`);
                break;
            }
            case "4": {
                sessionStorage.removeItem("@_¡¡");
                setTimeout(() => {
                    router.push(`/boards`);
                    location.href = location.href;
                }, 100);
                break;
            }
        }
    };

    const items: MenuProps["items"] = [
        {
            label: `${login?.fetchUserLoggedIn.name}`,
            key: "1",
            icon: <UserOutlined />,
        },
        {
            label: "23,000 P",
            key: "2",
            icon: <WalletOutlined />,
        },
        {
            label: "포인트 충전",
            key: "3",
            icon: <ThunderboltFilled />,
        },
        {
            label: "로그아웃",
            key: "4",
            icon: <LogoutOutlined />,
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <nav className={CSS_Nav_Wrap}>
                <ul className={CSS_Nav_Menu}>
                    <li onClick={() => router.push(`/`)}>
                        <Image src={logo} alt="logo" width={50} height={0} />
                    </li>

                    <li
                        className={isSelect === "mainPage" ? CSS_selected_Button : CSS_Nav_Button}
                        id="mainPage"
                        onClick={onNavClick}
                    >
                        메인페이지(보드)
                    </li>
                    <li
                        className={isSelect === "subPage" ? CSS_selected_Button : CSS_Nav_Button}
                        id="subPage"
                        onClick={onNavClick}
                    >
                        서브페이지(상품)
                    </li>
                    <li
                        className={isSelect === "myPage" ? CSS_selected_Button : CSS_Nav_Button}
                        id="myPage"
                        onClick={onNavClick}
                    >
                        마이페이지(유저)
                    </li>
                </ul>

                {login ? (
                    <Space wrap>
                        <Dropdown.Button
                            onClick={() => router.push(`/mypage`)}
                            menu={menuProps}
                            placement="bottom"
                            icon={<UserOutlined />}
                        >
                            {login.fetchUserLoggedIn.name}님! 안녕하세요
                        </Dropdown.Button>
                    </Space>
                ) : (
                    <Button icon={<UserOutlined />} onClick={() => router.push(`/login`)}>
                        로그인
                    </Button>
                )}
            </nav>
        </>
    );
}

const CSS_Nav_Wrap = css({
    width: "100vw",
    height: "8rem",
    borderBottom: "2px solid #eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
});

const CSS_Nav_Menu = css({
    width: "110rem",
    display: "flex",
    gap: "2rem",
});

const CSS_Nav_Button = css({
    width: "11rem",
    height: "4rem",
    borderBottom: "1px solid #bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const CSS_selected_Button = css({
    width: "11rem",
    height: "4rem",
    borderBottom: "2px solid #ffbe98",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
