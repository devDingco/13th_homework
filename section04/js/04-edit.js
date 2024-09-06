window.onload = () => {
    const { diaryNumber, diaryList } = getDiaryData();
    
    const diaryContain = diaryList[diaryNumber];

    window.document.querySelector("#edit_diaryTitle").value = diaryContain.title;
    window.document.querySelector("#edit_diaryContent").value = diaryContain.content;
    window.document.getElementsByName("HTML_기분선택버튼").forEach((el) => {
        if (el.value === diaryContain.기분) el.cheched = true;
    });
};

const editComplte = () => {
    const { diaryNumber, diaryList } = getDiaryData();

    const editTile = window.document.querySelector("#edit_diaryTitle").value;
    const editContent = window.document.querySelector("#edit_diaryContent").value;
    let editMood;
    window.document.getElementsByName("HTML_기분선택버튼").forEach((el) => {
        if (el.checked) editMood = el.value;
    });
    
    diaryList[diaryNumber] = {
        title: editTile,
        content: editContent,
        기분: editMood,
        writing: diaryList[diaryNumber].writing,
    };

    window.localStorage.setItem("민지의일기목록", JSON.stringify(diaryList));

    window.location.replace(`/homework/section04/04-detail.html?number=${diaryNumber}`);
};

const editCancel = () => {
    const { diaryNumber } = getDiaryData();

    window.location.replace(`/homework/section04/04-detail.html?number=${diaryNumber}`);
};

// 중복 구문 분리하기
const getDiaryData = () => {
    const queryString = window.location.search;
    const subdivisonQuery = new URLSearchParams(queryString);
    const diaryNumber = subdivisonQuery.get("number");

    const storageList = window.localStorage.getItem("민지의일기목록") ?? "[]";
    const diaryList = JSON.parse(storageList);

    return { diaryNumber, diaryList };

};