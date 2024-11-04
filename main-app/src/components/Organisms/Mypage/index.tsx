"use client";

import Button from "@/components/Atoms/_Button";
import SearchUI from "@/components/Molecules/Search";
import { RightOutlined, WalletOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import BoardsListUI from "../BoardsList";
import { css } from "@/common/styled-system/css";
import { FetchUserLoggedInDocument } from "@/common/graphql/graphql";
import { useQuery } from "@apollo/client";

export default function MyPageUI() {
    const { data: login } = useQuery(FetchUserLoggedInDocument);

    return (
        <>
            <section>
                <div className={CSS_myPage_Title}>마이 페이지</div>

                <div className={CSS_myPage_BG}>
                    <div>내 정보</div>

                    <div className={CSS_myPage_Flex}>
                        <Avatar />
                        <div className={CSS_myPage_Title}>{login?.fetchUserLoggedIn.name}</div>
                    </div>

                    <div className={CSS_myPage_Flex}>
                        <WalletOutlined />
                        <div className={CSS_myPage_Title}>23,000 P</div>
                    </div>

                    <div className={CSS_myPage_Between}>
                        <div>거래내역 & 북마크</div>
                        <RightOutlined />
                    </div>

                    <div className={CSS_myPage_Between}>
                        <div>포인트 사용내역</div>
                        <RightOutlined />
                    </div>

                    <div className={CSS_myPage_Between}>
                        <div>비밀번호 변경</div>
                        <RightOutlined />
                    </div>
                </div>

                <div>
                    <Button label="나의 상품" />
                    <Button label="북마크" />
                </div>
            </section>

            <SearchUI />
            <BoardsListUI />
        </>
    );
}

const CSS_myPage_BG = css({
    bg: "var(--mono-gray000)",
    rounded: "1.6rem",
    p: "2rem",
    m: "2rem 0rem",
});

const CSS_myPage_Title = css({
    p: "2rem 0rem",
    fontSize: "2rem",
});

const CSS_myPage_Flex = css({
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    p: "1rem 0rem",
    h: "6rem",
    borderBottom: "1px solid var(--mono-gray200)",
});

const CSS_myPage_Between = css({
    display: "flex",
    justifyContent: "space-between",
    m: "1rem",
    p: "1rem 1rem",
    rounded: "0.8rem",
    _hover: {
        bg: "var(--mono-gray200)",
    },
});
