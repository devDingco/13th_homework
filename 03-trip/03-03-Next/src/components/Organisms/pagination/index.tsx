"use client";

import { useState } from "react";

const PageBtnStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: "#F2F3f7",
    boxShadow: "0px 4px 10px #bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export default function LayoutPagination({
    refetch,
    lastPage,
    current,
    setCurrent,
}) {
    const [startPage, setStartPage] = useState(1);

    const onClick = (event) => {
        refetch({ page: Number(event.currentTarget.id) });
        setCurrent(Number(event.target.id));

        switch (event.target.id) {
            case "-xx": {
                setStartPage(1);
                break;
            }
            case "-x": {
                if (startPage <= 1) return alert("첫 페이지 입니다!");
                setStartPage(startPage - 10);
                refetch({ page: startPage - 10 });
                break;
            }
            case "+x": {
                if (startPage + 10 >= lastPage)
                    return alert("마지막 페이지 입니다!");
                setStartPage(startPage + 10);
                refetch({ page: startPage + 10 });
                break;
            }
            case "+xx": {
                setStartPage(lastPage);
                break;
            }
        }
    };

    return (
        <>
            <div style={{ display: "flex", gap: "16px", margin: "20px" }}>
                <span id="-xx" onClick={onClick}>{`<<`}</span>
                <span id="-x" onClick={onClick}>{`<`}</span>

                {new Array(10).fill("btn").map(
                    (_, idx) =>
                        idx + startPage <= lastPage && (
                            <span
                                id={String(idx + startPage)}
                                key={idx + startPage}
                                onClick={onClick}
                                style={
                                    current === idx + startPage
                                        ? {
                                              ...PageBtnStyle,
                                              backgroundColor: "#ffdfcc",
                                          }
                                        : PageBtnStyle
                                }
                            >
                                {idx + startPage}
                            </span>
                        )
                )}

                <span id="+x" onClick={onClick}>{`>`}</span>
                <span id="+xx" onClick={onClick}>{`>>`}</span>
            </div>
        </>
    );
}
