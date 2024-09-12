// interface postObjectType {
//     id: string;
//     date: number;
//     title: string;
//     content: string;
//     img: string;
// }

import { paintPost } from "./paintPost.js";

// 이번 목표 - if문 최대한 안 쓰기

const idList = ["angry", "etc", "happy", "sad", "surprise"];

// 금일 날짜
const date = new Date();
const year = date.getFullYear();
const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const today = `${year}.${month}.${day}`;

// map을 이용하여 미리 값을 할당할 수 있는 postObject
const postObject = idList.map((id) => ({
    id: 0,
    moodEng: id, // 기분 영어
    mood: "", // 기분 한글
    date: today, // 금일 날짜
    title: "", // post title
    content: "", // post content
    img: `./img/${id}.png`, // post img url
}));

function pushDaily() {
    const titleElement = document.getElementById("titleId");
    const contentElement = document.getElementById("contentId");
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));

    // input 태그 내에 name="radio"인 것을 찾은 이후 checked 속성을 이용하여 checked 된 element
    const selectedRadioElement = document.querySelector(
        'input[name="radio"]:checked'
    );
    // html 구조를 보면 부모 태그 내에 input과 label로 이루어져 있음.
    // mood 즉 기분 한글을 뽑아오기 위해서 라디오된 형제 element 추출
    const selectedRadioSiblingElement = selectedRadioElement.nextElementSibling;

    // find를 이용하여 미리 만들어둔 postObejct와 현재 radio된 id가 같은 객체를 추출
    const resultObject = postObject.find(
        (post) => post.moodEng == selectedRadioElement.id
    );
    let index = localStorage.getItem("idx");

    // 이후 mood, title, content, 고유의 key인 id 할당
    resultObject.mood = selectedRadioSiblingElement.innerText;
    resultObject.title = titleElement.value;
    resultObject.content = contentElement.value;
    resultObject.id = index++;
    resultObject.comments = [];

    dailyArray.push(resultObject);
    localStorage.setItem("dailyArray", JSON.stringify(dailyArray));
    localStorage.setItem("idx", index);
    paintPost(dailyArray);

    const modalElement = document.getElementById("modal");
    const modalSuccessElement = document.getElementById(
        "modal_success_container"
    );
    const bodyElement = document.querySelector("body");

    titleElement.innerText = "";
    contentElement.innerText = "";

    modalElement.style.display = "none";
    modalSuccessElement.style.display = "none";
    bodyElement.style.overflow = "auto";
}

document
    .getElementById("modal_success_button")
    .addEventListener("click", pushDaily);
