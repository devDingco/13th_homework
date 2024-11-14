"use client";

import { css } from "@/common/styled-system/css";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [books, setBooks] = useState("");

    /**
     * @param TEST
     */
    const onClickButton = async () => {
        const API = await fetch(
            "https://api.odcloud.kr/api/15137478/v1/uddi:673de77b-f49c-4da4-a836-f193b3ad0049?page=1&perPage=10&returnType=JSON&serviceKey=l7fvQcPU2ahzCCx0GKvIUA35AZHdTRvJ%2BIMqj33eY9dFu47eLr6q1Th5ptAxmIgvU8AK5LnWEOPWWlNUIMYSXw%3D%3D%20",
            // "https://www.sblib.seoul.kr/gblib/menu/11564/program/30474/searchResultList.do?reQuery=&realQuery=%EC%95%88%EB%85%95&collection=book&sort=RANK%2FDESC&archiveSort=dateCreated%2FDESC&searchField=&searchArchiveField=all&searchTopikField=&resultCount=10&startCount=0&startDate=&endDate=&range=A&debug=false&resultType=imageType&categoryClassNo=ALL&categoryManageCode=MN&categoryArchiveCode=ALL&categoryEbookCatId=ALL&categoryArchiveCatId=story&archiveLNBCode=story&categoryTopikCode=MEET%2CTALK&detailTitle=&detailAuthor=&detailPublisher=&detailKeyword=&detailISBN=&detailStartYear=&detailEndYear=&f1=ALL&query=%EC%95%88%EB%85%95",
        );
        const DATA = await API.json();
        setBooks(DATA);
        console.log(DATA);
    };

    return (
        <>
            <div className={css({ fontSize: "8xl", color: "rose.500", fontWeight: "bold" })}>Hello 🐼!</div>
            <Link href="/boards" className={css({ fontSize: "4xl", _hover: { color: "rose.500" } })}>
                Getting Started!
            </Link>

            <button onClick={onClickButton}>딸깎</button>
            {books &&
                books.data.map((el, idx) => (
                    <div key={`${el}_${idx}`}>
                        <div>{el.서명}</div>
                    </div>
                ))}
        </>
    );
}
