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
} 

const modify = () => {
    window.location.href = `수정.html?diaryCardIndex=${diaryCardNumber}`;
}
