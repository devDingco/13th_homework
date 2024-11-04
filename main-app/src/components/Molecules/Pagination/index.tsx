"use client";

import { MouseEvent, useState } from "react";
import { IPagination } from "@/common/types/types";
import { css } from "@/common/styled-system/css";

export default function PaginationUI(props: IPagination) {
    const { refetch, lastPage, current, setCurrent } = props;

    const [startPage, setStartPage] = useState(1);

    const onClick = (event: MouseEvent<HTMLSpanElement>) => {
        setCurrent(Number(event.currentTarget.id));
        refetch({ page: Number(event.currentTarget.id) });

        switch (event.currentTarget.id) {
            case "-xx": {
                setStartPage(1);
                refetch({ page: 1 });
                setCurrent(1);
                break;
            }
            case "-x": {
                if (startPage <= 1) {
                    alert("불러올 데이터가 없습니다!!");
                    setCurrent(current);
                    refetch({ page: current });
                    return;
                }
                if (current === lastPage) {
                    setStartPage(lastPage - ((lastPage % 10) + 9));
                    refetch({ page: lastPage - ((lastPage % 10) + 9) });
                    setCurrent(lastPage - ((lastPage % 10) + 9));
                    return;
                }
                setStartPage(startPage - 10);
                refetch({ page: startPage - 10 });
                setCurrent(startPage - 10);
                break;
            }
            case "+x": {
                if (startPage + 10 >= lastPage) {
                    alert("마지막 페이지 입니다!");
                    setCurrent(current);
                    refetch({ page: current });
                    return;
                }
                setStartPage(startPage + 10);
                refetch({ page: startPage + 10 });
                setCurrent(startPage + 10);
                break;
            }
            case "+xx": {
                setStartPage(lastPage);
                refetch({ page: lastPage });
                setCurrent(lastPage);
                break;
            }
        }
    };

    return (
        <>
            <div className={CSS_ButtonBox}>
                <span id="-xx" onClick={onClick}>{`<<`}</span>
                <span id="-x" onClick={onClick}>{`<`}</span>

                {new Array(10).fill("btn").map(
                    (_, idx) =>
                        idx + startPage <= lastPage && (
                            <span
                                id={String(idx + startPage)}
                                key={idx + startPage}
                                onClick={onClick}
                                className={
                                    current === idx + startPage
                                        ? css({ ...CSS_PageButton, backgroundColor: "#ffdfcc" })
                                        : css(CSS_PageButton)
                                }
                            >
                                {idx + startPage}
                            </span>
                        ),
                )}

                <span id="+x" onClick={onClick}>{`>`}</span>
                <span id="+xx" onClick={onClick}>{`>>`}</span>
            </div>
        </>
    );
}

const CSS_ButtonBox = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    margin: "20px",
    cursor: "pointer",
});

const CSS_PageButton = css.raw({
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0px 4px 10px #bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
