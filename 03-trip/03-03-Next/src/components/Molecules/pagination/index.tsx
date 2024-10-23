"use client";

import { MouseEvent, useState } from "react";
import { IPagination } from "@/commons/types/types";

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
            <div style={BtnBoxStyle}>
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

const BtnBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    margin: "20px",
};

const PageBtnStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0px 4px 10px #bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
