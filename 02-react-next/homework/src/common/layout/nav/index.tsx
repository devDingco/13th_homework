"use client";

import Image from "next/image";
import logo from "/public/img/logo_raw.png";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation, useQuery } from "@apollo/client";
import { FetchUserLoggedInDocument } from "@/common/graphql/graphql";
import { LOGOUT_USER } from "@/common/queries/queries";

import { Menu } from "@ark-ui/react/menu";
import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { css } from "@/common/styled-system/css";
import Button from "@/components/Atoms/_Button";
import withPortOne from "@/common/library/withPortOne";

export default function LayoutNav() {
    const router = useRouter();
    const [isSelect, setIsSelect] = useState("mainPage");

    const { data: login } = useQuery(FetchUserLoggedInDocument);

    const { onClickPay } = withPortOne(login);

    const [Logout] = useMutation(LOGOUT_USER);

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

    return (
        <>
            <nav className={CSS_Nav_Wrap}>
                <ul className={CSS_Nav_Menu}>
                    <li
                        onClick={() => {
                            router.push(`/`);
                            setIsSelect("");
                        }}
                    >
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
                    <Menu.Root>
                        <Menu.Trigger className={css_menuOpen}>
                            <p className={css({ width: "100%", textWrap: "nowrap" })}>
                                <span className={css({ color: "#981b1e", fontWeight: "700" })}>
                                    {login.fetchUserLoggedIn.name}
                                </span>{" "}
                                님! 안녕하세요.
                            </p>
                        </Menu.Trigger>
                        <Menu.Positioner className={css_menuWrap} style={{ position: "absolute", zIndex: "2" }}>
                            <Menu.Content>
                                <Menu.ItemGroup>
                                    <Menu.ItemGroupLabel className={css_menuItem}>
                                        <span className={css({ color: "#981b1e", fontWeight: "700" })}>
                                            {login.fetchUserLoggedIn.name}
                                        </span>
                                    </Menu.ItemGroupLabel>
                                    <Menu.Separator />
                                    <Menu.Item
                                        value="profile"
                                        className={css_menuItem}
                                        onClick={() => router.push(`/mypage`)}
                                    >
                                        <UserIcon size={16} /> 내 정보
                                    </Menu.Item>
                                    <Menu.Item value="billing" className={css_menuItem} onClick={onClickPay}>
                                        <CreditCardIcon size={16} /> 포인트 충전
                                    </Menu.Item>
                                    <Menu.Item
                                        value="settings"
                                        className={css_menuItem}
                                        onClick={() => router.push(`/mypage`)}
                                    >
                                        <SettingsIcon size={16} /> 설정
                                    </Menu.Item>
                                    <Menu.Separator />
                                    <Menu.Item
                                        value="logout"
                                        className={css_menuItem}
                                        onClick={() => {
                                            Logout();
                                            router.push("/boards");
                                            location.href = location.href;
                                        }}
                                    >
                                        <LogOutIcon size={16} />
                                        로그아웃
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Menu.Root>
                ) : (
                    <Button label="로그인" onClick={() => router.push(`/auth`, {scroll:false})}></Button>
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

//////////////////////////

const css_menuOpen = css({
    backgroundColor: "#fff",
    borderRadius: "1rem",
    border: "1px solid #bbb",
    height: "4rem",
    p: "0rem 1.2rem",
});

const css_menuWrap = css({
    bg: "#fff",
    borderRadius: "1rem",
    border: "1px solid #bbb",
});

const css_menuItem = css({
    minWidth: "15rem",
    display: "flex",
    alignItems: "center",
    p: "1rem",
    gap: "1rem",
});
