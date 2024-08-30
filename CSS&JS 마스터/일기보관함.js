const clickButton = () => {
    const radioEmotion = document.querySelector("input[name='emotion']:checked").value;
    const inputTitle = document.getElementById("titleBox_input").value;
    const textareaText = document.getElementById("contentBox_textarea").value;
    const emotionImage = getImage(radioEmotion);

    const newCard = createDiaryCard(radioEmotion, createDate(), inputTitle, textareaText, emotionImage);
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

const getImage = (emotion) => {
    let imageSrc;

    switch(emotion) {
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