window.onload = () => {
    const { diaryNumber, diaryList } = getDiaryData();

    const diaryContain = diaryList[diaryNumber];

    let 기분 = diaryContain.기분;
    let moodMessage;
    switch (기분) {
        case "행복":
            moodMessage = "행복해요";
            img = "/homework/assets/images/happiness-imoji.png";
            color = "#EA5757";
            break;
            case "화남":
                moodMessage = "화나요";
            img = "/homework/assets/images/angry-imoji.png";
            color = "#777";
            break;
            case "슬픔":
                moodMessage = "슬퍼요";
            img = "/homework/assets/images/sadness-imoji.png";
            color = "#28B4E1";
            break;
            case "놀람":
                moodMessage = "놀랐어요";
            img = "/homework/assets/images/surprise-imoji.png";
            color = "#D59029";
            break;
            default :
                moodMessage = "기타";
                img = "/homework/assets/images/um-imoji.png"
            color = "#A229ED";
                break;
    }

    window.document.querySelector("#diaryTitle").innerHTML = diaryContain.title;
    window.document.querySelector("#moodShowing").innerHTML = moodMessage;
    window.document.querySelector("#moodShowing").style.color = color;
    window.document.querySelector("#diaryContent_detail").innerHTML = diaryContain.content;
    window.document.querySelector("#moodImg").src = img;
    window.document.querySelector("#dateList").innerHTML = diaryContain.writing;

  
}

const editMove = () => {
    const { diaryNumber } = getDiaryData();

    // 수정하기 클릭시 페이지 이동
    window.location.href = `/homework/section04/04-edit.html?number=${diaryNumber}`;

};

const getDiaryData = () => {
    const queryString = window.location.search;
    const subdivisonQuery = new URLSearchParams(queryString);
    const diaryNumber = subdivisonQuery.get("number");

    const storageList = window.localStorage.getItem("민지의일기목록") ?? "[]";
    const diaryList = JSON.parse(storageList);

    return { diaryNumber, diaryList };

};

