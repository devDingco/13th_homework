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
        );
        const DATA = await API.json();
        setBooks(DATA);
        console.log(DATA);
    };

    // const test_Search = async (form) => {
    //     event.preventDefault();

    //     const query = form.target[0].value;
    //     // console.log(query);

    //     var searchForm = document.search;
    //     const kwd = (searchForm.query.value = query);

    //     // console.log(searchForm.query.value);
    //     console.log(kwd);
    //     // searchForm.submit();
    //     try {
    //         const API = await fetch(
    //             `https://www.sblib.seoul.kr/gblib/menu/11564/program/30474/searchResultList.do?reQuery=&realQuery=${kwd}&collection=book&sort=RANK%2FDESC&archiveSort=dateCreated%2FDESC&searchField=&searchArchiveField=all&searchTopikField=&resultCount=10&startCount=0&startDate=&endDate=&range=A&debug=false&resultType=imageType&categoryClassNo=ALL&categoryManageCode=MN&categoryArchiveCode=ALL&categoryEbookCatId=ALL&categoryArchiveCatId=story&archiveLNBCode=story&categoryTopikCode=MEET%2CTALK&detailTitle=&detailAuthor=&detailPublisher=&detailKeyword=&detailISBN=&detailStartYear=&detailEndYear=&f1=ALL&query=${kwd}`,
    //         );
    //         console.log(API);
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     console.log(API);
    // };

    async function test_Search(form) {
        event?.preventDefault();
        const query = form.target[0].value;

        try {
            const response = await fetch(`http://localhost:3000/api?keyword=${query}`);
            const data = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");

            const forms = doc.querySelector("#basketForm");
            const items = forms.querySelectorAll(".resultList li");

            const results = Array.from(items).map((item) => {
                const imageTag = item.querySelector(".thumb .img img");
                const titleTag = item.querySelector(".bookDataWrap .tit a");
                const authorTag = item.querySelector(".bookDataWrap .author");
                const dataTag = item.querySelector(".bookDataWrap .data");
                const siteTag = item.querySelector(".bookDataWrap .site");
                const statusTag = item.querySelector(".bookStateBar .stateArea");

                return {
                    image: imageTag ? imageTag.src : null, // 이미지 URL
                    title: titleTag ? titleTag.textContent.trim() : null, // 책 제목
                    author: authorTag ? authorTag.textContent.trim() : null, // 저자 정보
                    data: dataTag ? dataTag.textContent.trim() : null, // 데이터
                    site: siteTag ? siteTag.textContent.trim() : null, // 사이트 정보
                    status: statusTag ? statusTag.textContent.trim() : null, // 상태 정보
                };
            });

            function cleanText(item) {
                return item
                    .replace(/\n/g, " ") // Replace newlines with a single space
                    .replace(/\t/g, " ") // Replace tabs with a single space
                    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
                    .trim(); // Trim leading and trailing whitespace
            }

            const cleanedResults = results.map((item) => ({
                image: item.image, // Image URL doesn't need cleaning
                title: cleanText(item.title),
                author: cleanText(item.author),
                data: cleanText(item.data),
                site: cleanText(item.site),
                status: cleanText(item.status),
            }));

            console.log(cleanedResults);
        } catch (error) {
            console.log("검색 중 오류가 발생하였습니다.", error);
        }
    }

    return (
        <>
            <div className={css({ fontSize: "8xl", color: "rose.500", fontWeight: "bold" })}>Hello 🐼!</div>

            <br />
            <div>this is test and playground.</div>
            <div>to continue this app, please click the button down below.</div>

            <Link href="/boards" className={css({ fontSize: "4xl", _hover: { color: "rose.500" } })}>
                Getting Started!
            </Link>

            <br />
            <button onClick={onClickButton}>[ 딸깎 ]</button>
            {books &&
                books.data.map((el, idx) => (
                    <div key={`${el}_${idx}`}>
                        <div>{el.서명}</div>
                    </div>
                ))}

            <form name="search" onSubmit={test_Search}>
                <input name="query" className={css_TEST} />
                <button>[ 테스트 ]</button>
            </form>
        </>
    );
}

const css_TEST = css({
    bg: "#111",
    color: "#ffdfcc",
    p: "0.4rem 0.8rem",
    rounded: "0.8rem",
    m: "1rem",
});
