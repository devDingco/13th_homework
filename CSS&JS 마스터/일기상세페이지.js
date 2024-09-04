const queryString = location.search;
const params = new URLSearchParams(queryString);
const diaryCardNumber = Number(params.get("diaryCardIndex"));
const diaryCardList = JSON.parse(localStorage.getItem("다이어리카드배열"));
const diaryCard = diaryCardList[diaryCardNumber];

window.onload = () => {
    document.getElementById("main_header_text").innerText = diaryCard.title;
    document.getElementById("emotionImage").src = diaryCard.image;
    document.getElementById("emotion_text").innerText = diaryCard.emotionText;
    document.getElementById("detail_date").innerText = diaryCard.date + " 작성";
    document.getElementById("body_content").innerText = diaryCard.textarea;
    rendering(diaryCard.remembrance);
} 

const modify = () => {
    window.location.href = `수정.html?diaryCardIndex=${diaryCardNumber}`;
}

const deleteButton = () => {
    console.log(diaryCardNumber, "다이어리넘버");
    console.log("다이어리카드리스트", diaryCardList);
    diaryCardList.splice(diaryCardNumber, 1);
    const updatedDiaryCardJson = JSON.stringify(diaryCardList);
    localStorage.setItem("다이어리카드배열", updatedDiaryCardJson);
    window.location.href = "일기보관함.html";
    alert("삭제 되었습니다.");
}

const createDate = () => {
    const date = new Date();
    const getYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const getDate = date.getDate();
    const writeDate = '['+getYear+'. '+getMonth+'. '+getDate+']';

    return writeDate;
}

const addText = () => {
    const remembranceObject = {};
    // 1. 객체 값 채우기
    const remembranceText = document.getElementById("inputText").value;
    remembranceObject.text = remembranceText;
    remembranceObject.date = createDate();
    remembranceObject.diaryNumber = diaryCardNumber;
    // 2. 다이어리카드 {remembrance:[]}에 객체 집어넣기
    diaryCard.remembrance.push(remembranceObject);
    // 3. 배열 JSON으로 바꾸기
    const diaryCardJson = JSON.stringify(diaryCardList);
    // 4. 로컬스토리지에 만든JSON 집어넣기
    localStorage.setItem("다이어리카드배열", diaryCardJson);
    rendering(diaryCard.remembrance);
}

const rendering = (diaryCardRemembrance) => {
    const remembranceArr = diaryCardRemembrance.map((el) =>`
        <div class="remembranceText">${el.text} ${el.date}</div>
    `);

    const remembranceHtml = remembranceArr.join('');
    const remembranceContainer = document.getElementById("remembranceTextBox");

    remembranceContainer.innerHTML = remembranceHtml;
}
