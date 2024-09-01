const queryString = location.search;
const params = new URLSearchParams(queryString);
const diaryCardNumber = Number(params.get("diaryCardIndex"));
const diaryCardList = JSON.parse(localStorage.getItem("다이어리카드배열"));
const diaryCard = diaryCardList[diaryCardNumber];

window.onload = () => {
    document.getElementById("titleBox").value = diaryCard.title;
    document.getElementById("contentBox").innerText= diaryCard.textarea;
    const emotion = diaryCard.emotionText;

    switch (emotion) {
        case "행복해요":
            document.getElementById("happpy").checked = true;
            break;
        case "슬퍼요":
            document.getElementById("sad").checked = true;
            break;
        case "놀랐어요":
            document.getElementById("surprised").checked = true;
            break;
        case "화나요":
            document.getElementById("angry").checked = true;
            break;
        case "기타":
            document.getElementById("etc").checked = true;
            break;
    }
}

const modify = () => {
    diaryCard.title = document.getElementById("titleBox").value 
    diaryCard.textarea = document.getElementById("contentBox").value;
    const radioArr = document.getElementsByName("emotion");
    
    radioArr.forEach((el) => {
        if(el.checked) {
            diaryCard.emotionText = el.value;
            
            switch(diaryCard.emotionText) {
                case "행복해요":
                    diaryCard.image = "./assets/행복해요 (m).png";
                    break;
                case "슬퍼요":
                    diaryCard.image = "./assets/슬퍼요 (m).png";
                    break;
                case "화나요":
                    diaryCard.image = "./assets/화나요 (m).png";
                    break;
                case "놀랐어요":
                    diaryCard.image = "./assets/놀랐어요 (m).png";
                    break;
                case "기타":
                    diaryCard.image = "./assets/기타 (m).png";
                    break;
            }
        }
    });
    
    localStorage.setItem("다이어리카드배열", JSON.stringify(diaryCardList));
    window.location.href = `일기상세페이지.html?diaryCardIndex=${diaryCardNumber}`;
}

const cancel = () => {
    window.location.href = `일기상세페이지.html?diaryCardIndex=${diaryCardNumber}`;
}