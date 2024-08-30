// window.onload = () => {
//     const loginName = prompt("이름을 입력해 주세요!")
//     document.getElementById("header__login").innerText = loginName;
//     document.getElementById("footer__login").innerText = loginName;
// }

let diaryData = [];

const getDate = new Date();
const getYear = String(getDate.getFullYear());
const getMonth = String(getDate.getMonth() +1).padStart(2, "0");
const getDay = String(getDate.getDate()).padStart(2, "0");

const moodIndex = {
    happy: "행복해요",
    sad: "슬퍼요",
    surprise: "놀랐어요",
    angry: "화나요",
    etc: "기타"
};

function makeDiary () {
    const mood = document.getElementsByName("mood")
    const diaryTitle = document.getElementById("diaryTitle").value
    const diaryContext = document.getElementById("diaryContext").value

    let diaryMood;
    for ( i=0 ; i < mood.length ; i++) {
        if ( mood[i].checked ) {
            diaryMood = mood[i].value;
        }
    };
    const moodKR = moodIndex[diaryMood]

    const diaryDate = `${getYear}. ${getMonth}. ${getDay}`

    let tempDiary = {
        mood: diaryMood,
        title: diaryTitle,
        context: diaryContext,
        date: diaryDate
    }

    diaryMood !== undefined && diaryTitle !== "" && diaryContext !== "" ? diaryData.push(tempDiary) : alert("일기를 마저 작성해 주세요!!");
    console.log( diaryData );

    if (diaryData.length !== 0) {
        const diaryCard = document.createElement("div");
        diaryCard.className = "wrapper__card"
        diaryCard.innerHTML =
`
<div class="card__img">
    <img src="./asset/card__${diaryMood}.png">
</div>
<div class="card__topic">
    <div class="card__status">
        <div class="card__${diaryMood}">${moodKR}</div>
        <div class="card__date">${diaryDate}</div>
    </div>
    <div class="card__title">${diaryTitle}</div>
</div>
`
        document.querySelector(".content__left__card").append(diaryCard);
    };
};

document.getElementById("diaryButton").addEventListener('click', makeDiary);



// const diaryCard = diaryData.map( el =>
//     `
//     <div class="wrapper__card">
//         <div class="card__img">
//             <img src="./asset/card__${diaryMood}.png">
//         </div>
//         <div class="card__topic">
//             <div class="card__status">
//                 <div class="card__${diaryMood}">${el.mood}</div>
//                 <div class="card__date">${el.date}</div>
//             </div>
//             <div class="card__title">${el.title}</div>
//         </div>
//     </div>
//     `);