const diaryCardArr = localStorage.getItem("다이어리카드배열") === null ? [] : JSON.parse(localStorage.getItem("다이어리카드배열"));
//나중에 함수만들고, 함수실행후 리턴값으로 깔끔하게 만들기.

window.onload = () => {
    if (diaryCardArr.length > 0) {
        diaryCardRendering(diaryCardArr);
        console.log("onload가 작동했습니다.");
    }
}

const clickButton = () => {
    const diaryCardObject = {};
    let emotionText;

    const radioArr = document.getElementsByName("emotion");
    
    radioArr.forEach((el) => {
        if(el.checked) {
           emotionText = el.value;
        }
    });

    diaryCardObject.emotionText = emotionText;
    diaryCardObject.title = document.getElementById("titleBox_input").value;
    diaryCardObject.textarea = document.getElementById("contentBox_textarea").value;
    diaryCardObject.image = getImage(diaryCardObject.emotionText);
    diaryCardObject.date = createDate();
    
    diaryCardArr.push(diaryCardObject);
    const dairyCardJson = JSON.stringify(diaryCardArr);
    localStorage.setItem("다이어리카드배열", dairyCardJson);
    
    const newDiary = diaryCardArr[diaryCardArr.length - 1];
    const newCard = createDiaryCard(newDiary.emotionText, newDiary.date, newDiary.title, diaryCardObject.image);
    
    const diaryContainer = document.getElementById("storage_leftBody");
    diaryContainer.appendChild(newCard);
}

const createDate = () => {
    const date = new Date();
    const getYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const getDate = date.getDate();
    const writeDate = getYear+'. '+getMonth+'. '+getDate;

    return writeDate;
}

const getImage = (emotionText) => {
    let imageSrc;

    switch(emotionText) {
        case "행복해요":
            imageSrc = "./assets/행복해요 (m).png";
            break;
        case "슬퍼요":
            imageSrc = "./assets/슬퍼요 (m).png";
            break;
        case "화나요":
            imageSrc = "./assets/화나요 (m).png";
            break;
        case "놀랐어요":
            imageSrc = "./assets/놀랐어요 (m).png";
            break;
        case "기타":
            imageSrc = "./assets/기타 (m).png";
            break;
    }
    return imageSrc;
}

const createDiaryCard = (emotion, date, title, image) => {
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

const diaryCardRendering = (diaryCardList) => {
    const diaryCardHtmlArr = diaryCardList.map((el, index) => ` 
        <div class="diaryCard">
            <a href="./일기상세페이지.html?diaryCardIndex=${index}">
                <img src="${el.image}" alt="" id="diaryCard_image">
            </a>
            <div class="diaryCard_content">
                <div class="diaryCard_content_header">
                    <div id="content_header_emotion">${el.emotionText}</div>
                    <div id="content_header_date">${el.date}</div>
                </div>
                <div id="diaryCard_content_title">
                    ${el.title}
                </div>
            </div>
        </div>
    `);  //map메서드를 통한 새로운 배열객체 리턴

    const diaryCardHtml = diaryCardHtmlArr.join('');  // join메서드를 통해서 ','구분기호를 없애소 string값으로 리턴 
    
    const diaryContainer = document.getElementById("storage_leftBody");
    diaryContainer.innerHTML = diaryCardHtml;
}

const filtering = (event) => {
    const selection = event.target.value;
    let filterArr = [];

    switch(selection) {
        case "selectAll": {
            filterArr = diaryCardArr;
            break;
        }
        case "selectHappy": {
            filterArr = diaryCardArr.filter(el => el.emotionText === "happy");
            break;
        }
        case "selectSad": {
            filterArr = diaryCardArr.filter(el => el.emotionText === "sad");
            break;
        }
        case "selectSurprised": {
            filterArr = diaryCardArr.filter(el => el.emotionText === "surprised");
            break;
        }
        case "selectAngry": {
            filterArr = diaryCardArr.filter(el => el.emotionText === "angry");
            break;
        }
        case "selectEtc": {
            filterArr = diaryCardArr.filter(el => el.emotionText === "etc");
            break;
        }
        
    }
    diaryCardRendering(filterArr);
}