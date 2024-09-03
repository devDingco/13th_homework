const idList = ["angry", "etc", "happy", "sad", "surprise"];

// 금일 날짜
const date = new Date();
const year = date.getFullYear();
const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const today = `${year}.${month}.${day}`;

const postObject = idList.map((id) => ({
    id: 0,

    moodEng: id, // 기분 영어
    mood: "", // 기분 한글
    date: today, // 금일 날짜
    title: "", // post title
    content: "", // post content
    img: `./img/${id}.png`, // post img url
}));

function onUpdatePost() {
    const titleElement = document.getElementById("titleId");
    const contentElement = document.getElementById("contentId");
    const selectedRadioElement = document.querySelector(
        'input[name="radio"]:checked'
    );
    const selectedRadioSiblingElement = selectedRadioElement.nextElementSibling;

    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));

    const queryString = location.search;
    const queryId = new URLSearchParams(queryString).get("id");

    const resultObject = postObject.find(
        (post) => post.moodEng == selectedRadioElement.id
    );

    resultObject.id = Number(queryId);
    resultObject.content = contentElement.value;
    resultObject.title = titleElement.value;
    resultObject.mood = selectedRadioSiblingElement.innerText;

    const changeArray = dailyArray.map((daily) =>
        daily.id === Number(queryId) ? resultObject : daily
    );
    localStorage.setItem("dailyArray", JSON.stringify(changeArray));

    history.back();
}
