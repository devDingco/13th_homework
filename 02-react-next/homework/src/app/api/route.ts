// export async function GET(req, res) {
//     const { keyword } = req.query;

//     if (!keyword) {
//         return res.status(400).json({ error: "검색어를 입력해주세요." });
//     }

//     try {
//         const searchURL = `https://www.sblib.seoul.kr/gblib/menu/11564/program/30474/searchResultList.do?reQuery=&realQuery=${keyword}&collection=book&sort=RANK%2FDESC&archiveSort=dateCreated%2FDESC&searchField=&searchArchiveField=all&searchTopikField=&resultCount=10&startCount=0&startDate=&endDate=&range=A&debug=false&resultType=imageType&categoryClassNo=ALL&categoryManageCode=ALL&categoryArchiveCode=ALL&categoryEbookCatId=ALL&categoryArchiveCatId=story&archiveLNBCode=story&categoryTopikCode=MEET%2CTALK&detailTitle=&detailAuthor=&detailPublisher=&detailKeyword=&detailISBN=&detailStartYear=&detailEndYear=&f1=ALL&query=${keyword}`;
//         const response = await fetch(searchURL);

//         if (!response.ok) {
//             return res.status(response.status).json({ error: "외부 API 호출 실패, 관리자와 상담하세요." });
//         }

//         const html = await response.text();

//         res.status(200).send(html);
//     } catch (error) {
//         console.error("서버 오류", error);
//         res.status(500).json({ error: "서버 오류 발생" });
//     }
// }

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");
    //
    const searchURL = `https://www.sblib.seoul.kr/gblib/menu/11564/program/30474/searchResultList.do?reQuery=&realQuery=${keyword}&collection=book&sort=RANK%2FDESC&archiveSort=dateCreated%2FDESC&searchField=&searchArchiveField=all&searchTopikField=&resultCount=10&startCount=0&startDate=&endDate=&range=A&debug=false&resultType=imageType&categoryClassNo=ALL&categoryManageCode=ALL&categoryArchiveCode=ALL&categoryEbookCatId=ALL&categoryArchiveCatId=story&archiveLNBCode=story&categoryTopikCode=MEET%2CTALK&detailTitle=&detailAuthor=&detailPublisher=&detailKeyword=&detailISBN=&detailStartYear=&detailEndYear=&f1=ALL&query=${keyword}`;
    const result = await fetch(searchURL);
    const html = await result.text();

    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
    });
}
