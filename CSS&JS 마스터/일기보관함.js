const diaryCardObject = {};
let diaryCardArr = [];



const clickButton = () => {
    diaryCardObject.emotionText = document.querySelector("input[name='emotion']:checked").value;
    diaryCardObject.title = document.getElementById("titleBox_input").value;
    diaryCardObject.textarea = document.getElementById("contentBox_textarea").value;
    diaryCardObject.image = getImage(diaryCardObject.emotionText);
    diaryCardObject.date = createDate();
    console.log("다이어리오브젝트", diaryCardObject);
    diaryCardArr.push(diaryCardObject);
    console.log("다이어리배열", diaryCardArr);
    const newDiary = diaryCardArr[diaryCardArr.length - 1];
    const newCard = createDiaryCard(newDiary.emotionText, newDiary.Date, newDiary.title, newDiary.textarea, diaryCardObject.image);
    const diaryContainer = document.getElementById("storage_leftBody");
    diaryContainer.appendChild(newCard);
}

const createDate = () => {
    const date = new Date();
    const getYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const getDate = date.getDate();
    const writeDate = `${getYear}. ${getMonth}. ${getDate}`;

    return writeDate;
}

const getImage = (emotionText) => {
    let imageSrc;

    switch(emotionText) {
        case "happy":
            imageSrc = "./assets/행복해요 (m).png";
            break;
        case "sad":
            imageSrc = "./assets/슬퍼요 (m).png";
            break;
        case "angry":
            imageSrc = "./assets/화나요 (m).png";
            break;
        case "surprised":
            imageSrc = "./assets/놀랐어요 (m).png";
            break;
        case "etc":
            imageSrc = "./assets/기타 (m).png";
            break;
    }
    return imageSrc;
}

const createDiaryCard = (emotion, date, title, content, image) => {
    const card = document.createElement("div");
    card.className = "diaryCard";

    card.innerHTML = `
        <img src="${image}" alt="" id="diaryCard_image">
        <div class="diaryCard_content">
            <div class="diaryCard_content_header">
                <div id="content_header_emotion">${emotion}</div>
                <div id="content_header_date">${date}</div>
            </div>
            <div id="diaryCard_content_title">
                ${title}
            </div>
        </div>
    `;

    return card;
}