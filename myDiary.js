let diaryData = [];
let diaryLocal = [];

diaryLocal = JSON.parse(localStorage.getItem("diaryData"))

window.onload = () => {
    // const loginName = prompt("이름을 입력해 주세요!")
    // document.getElementById("header__login").innerText = loginName;
    // document.getElementById("footer__login").innerText = loginName;
    // document.querySelector(".footer__copy").innerText = `Copyright © 2024. ${loginName} `
    makeDiaryList(diaryLocal)
}

const moodIndex = {
    happy: "행복해요",
    sad: "슬퍼요",
    surprise: "놀랐어요",
    angry: "화나요",
    etc: "기타"
};

const getDate = new Date();
const getYear = getDate.getFullYear().toString();
const getMonth = (getDate.getMonth() +1).toString().padStart(2, "0");
const getDay = getDate.getDate().toString().padStart(2, "0");

function makeDiaryData () {
    const mood = document.getElementsByName("mood")
    const diaryTitle = document.getElementById("diaryTitle").value
    const diaryContext = document.getElementById("diaryContext").value

    let diaryMood;
    for ( i=0 ; i < mood.length ; i++ ) {
        if ( mood[i].checked ) {
            diaryMood = mood[i].value;
        }
    };

    const diaryDate = `${getYear}. ${getMonth}. ${getDay}`

    let indexNum = diaryLocal === null ? +1 : diaryLocal.length +1

    let tempDiary = {
        mood: diaryMood,
        date: diaryDate,
        title: diaryTitle,
        context: diaryContext,
        index: indexNum
    }

    if ( diaryMood !== undefined && diaryTitle !== "" && diaryContext !== "" ) {
        for ( i=0 ; i < mood.length ; i++ ) {
            mood[i].checked = false;
        }
        document.getElementById("diaryTitle").value = ""
        document.getElementById("diaryContext").value = ""
    } else {
        alert("일기를 마저 작성해 주세요!!")
    }

    diaryData = JSON.parse(localStorage.getItem("diaryData")) || []
    diaryData.push(tempDiary)
    localStorage.setItem("diaryData", JSON.stringify(diaryData))
    diaryLocal = JSON.parse(localStorage.getItem("diaryData"))

    // makeDiaryTemp ( tempDiary );
    makeDiaryList(diaryLocal);
};

// function makeDiaryTemp(temp) {
//     if (diaryData.length !== 0) {
//         const diaryCard = document.createElement("div");
//         diaryCard.className = "wrapper__card"
//         diaryCard.innerHTML =
// `
// <div class="card__img">
//     <img src="./asset/card__${temp.mood}.png">
// </div>
// <div class="card__topic">
//     <div class="card__status">
//         <div class="card__${temp.mood}">${moodIndex[temp.mood]}</div>
//         <div class="card__date">${temp.date}</div>
//     </div>
//     <div class="card__title">${temp.title}</div>
// </div>
// `
//         document.querySelector(".content__left__card").append(diaryCard);
//         diaryCard.onclick = () => alertDiary(temp);
//     };
// };

// function alertDiary(temp) {
//     alert(
// `
// 제목: ${temp.title}
// 기분: ${temp.mood}
// 날짜: ${temp.date}
// 내용: ${temp.context}
// `
//     )
// };

function makeDiaryList(diary) {
    if ( diary !== null ) {
        const diaryCard = document.querySelector(".content__left__card")
        diaryCard.innerHTML = diaryLocal.map( el =>
`
<div class="wrapper__card">
    <a href="./depth01/myDiary_detail.html?page=${el.index}">
        <div class="card__delete"></div>
        <div class="card__img">
            <img src="./asset/card__${el.mood}.png">
        </div>
        <div class="card__topic">
            <div class="card__status">
                <div class="card__${el.mood}">${moodIndex[el.mood]}</div>
                <div class="card__date">${el.date}</div>
            </div>
            <div class="card__title">${el.title}</div>
        </div>
    </a>
</div>
`
        ).join("");
    } else {
        console.log( "local is null" )
    };
};

function activeFilter (event) {
    filterMood = event.target.value;

    diaryLocal = JSON.parse(localStorage.getItem("diaryData"))

    switch (filterMood) {
        case "all": {
            diaryLocal = diaryLocal.filter( el => el.index > 0 )
            makeDiaryList(diaryLocal)
            break
        }
        case "happy": {
            diaryLocal = diaryLocal.filter( el => el.mood === "happy" )
            console.log(diaryLocal)
            makeDiaryList(diaryLocal)
            break
        }
        case "sad": {
            diaryLocal = diaryLocal.filter( el => el.mood === "sad" )
            makeDiaryList(diaryLocal)
            break
        }
        case "surprise": {
            diaryLocal = diaryLocal.filter( el => el.mood === "surprise" )
            makeDiaryList(diaryLocal)
            break
        }
        case "angry": {
            diaryLocal = diaryLocal.filter( el => el.mood === "angry" )
            makeDiaryList(diaryLocal)
            break
        }
        case "etc": {
            diaryLocal = diaryLocal.filter( el => el.mood === "etc" )
            makeDiaryList(diaryLocal)
            break
        }
        default: {
            diaryLocal = JSON.parse(localStorage.getItem("diaryData"))
            makeDiaryList(diaryLocal)
        }
    }
}

window.addEventListener('scroll', () => {
    window.scrollY > 400 ?
    document.querySelector(".nav__filter").style = "background-color: #222; color: #fff; transition: 0.2s;" :
    document.querySelector(".nav__filter").style = "background-color: #fff; color: #222; transition: 0.2s;"
})

document.querySelector(".container__floating").addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
})

document.querySelector(".card__delete")
console.log ( document.querySelector(".card__delete") )

document.getElementById("diaryButton").addEventListener('click', makeDiaryData);