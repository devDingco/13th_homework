let diaryData = [];

let diaryLocal = [];
diaryLocal = JSON.parse(localStorage.getItem("diaryData"))

const time = new Date().toISOString().split("T")[0].replace(/-/g, ". ")

const moodIndex = {
    all: "전체",
    happy: "행복해요",
    sad: "슬퍼요",
    surprise: "놀랐어요",
    angry: "화나요",
    etc: "기타",
};

window.onload = () => {
    // const loginName = prompt("이름을 입력해 주세요!")
    // document.getElementById("header__login").innerText = loginName;
    // document.getElementById("footer__login").innerText = loginName;
    // document.querySelector(".footer__copy").innerText = `Copyright © 2024. ${loginName} `
    makeDiaryCard(diaryLocal)
    openDiary()
}

//** 일기 작성 기능: 일기 작성 폼 데이터 취합하여 로컬에 저장하고 만들기 기능에 전달 */
function makeDiaryData () {
    const mood = document.getElementsByName("mood")

    let diaryMood;
    for ( i=0 ; i < mood.length ; i++ ) {
        if ( mood[i].checked ) {
            diaryMood = mood[i].value;
        }
    };

    const getDate = new Date();
    const getYear = getDate.getFullYear().toString();
    const getMonth = (getDate.getMonth() +1).toString().padStart(2, "0");
    const getDay = getDate.getDate().toString().padStart(2, "0");
    
    const diaryDate = `${getYear}. ${getMonth}. ${getDay}`

    const diaryTitle = document.getElementById("diaryTitle").value
    const diaryContent = document.getElementById("diaryContent").value

    let tempDiary = {
        mood: diaryMood,
        date: diaryDate,
        title: diaryTitle,
        content: diaryContent,
        comment: []
    }

    if ( diaryMood && diaryTitle && diaryContent ) {
        for ( i=0 ; i < mood.length ; i++ ) {
            mood[i].checked = false;
        }
        document.getElementById("diaryTitle").value = ""
        document.getElementById("diaryContent").value = ""
    } else {
        alert("일기를 마저 작성해 주세요!!")
        return
    }

    diaryData = JSON.parse(localStorage.getItem("diaryData")) || []
    diaryData.push(tempDiary)

    localStorage.setItem("diaryData", JSON.stringify(diaryData))
    diaryData = JSON.parse(localStorage.getItem("diaryData"))

    makeDiaryCard(diaryData);
    document.querySelector(".modal__submit").style = "display: flex;"
    window.scrollTo({ top: document.querySelector(".container__footer").getBoundingClientRect().top, behavior: "smooth" })
};

//** 일기 만들기 기능: 전달받은 일기 정보로 일기 카드 생성 */
function makeDiaryCard(diary) {
    if ( diary ) {
        const diaryCard = document.querySelector(".body__left__card")
        diaryCard.innerHTML = diary.map( (el, index) =>
`
<div class="wrapper__card">
    <a href="./depth01/myDiary_detail.html?page=${index}">
        <div class="card__delete" onclick="deleteDiary(${index})"></div>
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
        console.log( "받아올 데이터가 없어요!!" )
    };
};

//** 일기 삭제 기능: onclick event에서 index할당 받아 올바른 데이터 제거 */
function deleteDiary(index) {
    event.preventDefault()
    diaryLocal.splice(index, 1)
    localStorage.setItem("diaryData", JSON.stringify(diaryLocal))
    window.location.reload()
}

//** scroll 이벤트 관련: filter 배경색 반전, nav bar배경 토글, 플로팅 토글 */
window.addEventListener('scroll', () => {
    const footerHeight = document.querySelector(".container__footer").getBoundingClientRect().top
    const currentHeight = window.innerHeight

    if ( window.scrollY < 400 ) {
        document.querySelector(".inner__text").style = "background-color: #fff; color: #222; transition: 0.2s;"
        document.querySelector(".container__sticky").style = "display: none;"
    } else if ( footerHeight <= currentHeight ) {
        document.querySelector(".container__floating").style = "position: absolute; bottom: 2%; right: 4%;"
    }
    else {
        document.querySelector(".inner__text").style = "background-color: #222; color: #fff; transition: 0.2s;"
        document.querySelector(".container__sticky").style = "display: block;"
        document.querySelector(".container__floating").style = "position: fixed; bottom: 2%; right: 4%;"
    }
})

//** floating button 클릭시: 윈도우 최상단으로 부드럽게 이동 */
document.querySelector(".container__floating").addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
})

//** tap bar에서 [ 일기보관함 ] 클릭시: 갤러리 숨기고 일기창 표현 */
function openDiary() {
    document.querySelector(".tap__diary").classList.add("tap__active")
    document.querySelector(".tap__new").style = "display: flex;"
    document.querySelector(".nav__filter").style = "display: flex;"
    document.querySelector(".body__left__card").style = "display: flex;"
    document.querySelector(".body__right__diary").style = "display: block;"

    document.querySelector(".tap__gallery").classList.remove("tap__active")
    document.querySelector(".nav__gallery").style = "display: none;"
    document.querySelector(".body__gallery").style = "display: none;"

    window.scrollTo({ top: 0, behavior: "smooth" })
}

//** tap bar에서 [ 사진보관함 ] 클릭시: 일기 숨기고 갤러리 표현 */
function openGallery() {
    document.querySelector(".tap__gallery").classList.add("tap__active")
    document.querySelector(".tap__new").style = "display: none;"
    document.querySelector(".nav__filter").style = "display: none;"
    document.querySelector(".body__left__card").style = "display: none;"
    document.querySelector(".body__right__diary").style = "display: none;"

    document.querySelector(".tap__diary").classList.remove("tap__active")
    document.querySelector(".nav__gallery").style = "display: flex;"
    document.querySelector(".body__gallery").style = "display: flex;"

    window.scrollTo({ top: 0, behavior: "smooth" })
    document.querySelector(".gallery__direction").value = "기본"
    loadIMG()
}

//** nav filter btn 클릭시 드롭다운 디자인 메뉴 호출 및 실행, 세션스토리지 활용 */
function openFilter() {
    document.querySelector('.filter__menu').style.display = "block";
    document.querySelector('.filter__menu').addEventListener('click', (event) => {
        event.stopPropagation()
        document.querySelector('.inner__text').style.cssText = `--innerTextContent: "${moodIndex[event.target.id]}"`
        document.querySelector('.filter__menu').style.display = "none";

        let filterDiary = []
        switch(event.target.id) {
            case "all": {
                filterDiary = diaryLocal
                makeDiaryCard(filterDiary)
                break
            }
            case "happy": {
                filterDiary = diaryLocal.filter( el => el.mood === "happy")
                sessionStorage.setItem("tempData", JSON.stringify(filterDiary))
                makeDiaryCard( JSON.parse(sessionStorage.getItem("tempData")))
                break
            }
            case "sad": {
                filterDiary = diaryLocal.filter( el => el.mood === "sad")
                sessionStorage.setItem("tempData", JSON.stringify(filterDiary))
                makeDiaryCard( JSON.parse(sessionStorage.getItem("tempData")))
                break
            }
            case "surprise": {
                filterDiary = diaryLocal.filter( el => el.mood === "surprise")
                sessionStorage.setItem("tempData", JSON.stringify(filterDiary))
                makeDiaryCard( JSON.parse(sessionStorage.getItem("tempData")))
                break
            }
            case "angry": {
                filterDiary = diaryLocal.filter( el => el.mood === "angry")
                sessionStorage.setItem("tempData", JSON.stringify(filterDiary))
                makeDiaryCard( JSON.parse(sessionStorage.getItem("tempData")))
                break
            }
            case "etc": {
                filterDiary = diaryLocal.filter( el => el.mood === "etc")
                sessionStorage.setItem("tempData", JSON.stringify(filterDiary))
                makeDiaryCard( JSON.parse(sessionStorage.getItem("tempData")))
                break
            }
        }
    })
}

//** 검색기능: 검색창 인풋값으로 배열의 제목 필터하여 재정렬, 세션스토리지 활용 */
function searchDiary() {
    let timer;
    const searchValue = document.querySelector('.search__input').value
    const searchResult = diaryLocal.filter( el => el.title.includes(searchValue) )
    clearTimeout(timer)

    timer = setTimeout( () => {
        sessionStorage.setItem("tempData", JSON.stringify(searchResult))
        makeDiaryCard( JSON.parse(sessionStorage.getItem("tempData")))
    }, 1000)
}

//** 랜덤 강아지 이미지 불러오기 */
function loadIMG() {
    setTimeout(() => {
        document.querySelectorAll(".gallery__imgBox img").forEach(el => el.style = "opacity: 100%;")
        document.querySelectorAll(".img__skeleton").forEach(el => el.style = "display: none;")
    }, 2000)
    fetch("https://dog.ceo/api/breeds/image/random/10").then((randIMG) => {
        randIMG.json().then((jsonIMG) => {
            const randDogURL = jsonIMG.message
            document.querySelector(".body__gallery").innerHTML = randDogURL.map(
                (el) =>
                    `<div class="gallery__imgBox">
                        <div class="img__skeleton"></div>
                        <img src="${el}"/>
                    </div>`).join("")
        })
    })
}

//** 사진 비율 기능: 가로 세로 4:3 */
function changeDirection(event) {
    switch(event.target.value) {
        case "가로형": {
            document.querySelectorAll(".gallery__imgBox img").forEach(el =>
                el.style = "width: 48rem; height: auto; aspect-ratio: 4 / 3; opacity: 100%;")
            break
        }
        case "세로형": {
            document.querySelectorAll(".gallery__imgBox img").forEach(el =>
                el.style = "width: auto; height: 48rem; aspect-ratio: 3 / 4; opacity: 100%;" )
            break
        }
        default: {
            document.querySelectorAll(".gallery__imgBox img").forEach(el =>
                el.style = "width: 48rem; height: auto; aspect-ratio: 1 / 1; opacity: 100%;")
            break
        }
    }
}

//** 다크모드 토글기능 */
function changeMode(event) {
    event.target.checked === true ?
    document.documentElement.setAttribute("dark-mode", "on") :
    document.documentElement.removeAttribute("dark-mode")
}

//** 새로운 모달 호출 */
function newDiary() {
    document.querySelector(".container__modal").style = "width: 100%; height: 100%;"
    document.querySelector("body").classList.add("stop-scrolling")
    document.querySelector(".modal__bg").style = "display: flex;"
    document.querySelector(".modal__form").style = "display: flex; filter: blur(0px) brightness(100%);"

    window.scrollTo({ top: 0, behavior: "smooth" })
}

//** 1층 일기 모달에서 [ 닫기 ]: 2층 모달 - 취소 확인창 띄움 */
function exitNew() {
    document.querySelector(".modal__form").style = "display: flex; filter: blur(2px) brightness(50%);"
    document.querySelector(".modal__cancel").style = "display: flex;"
}

//** 2층 확인 모달에서 [ 등록 취소 || 확인 ]: 모달 전부 종료 */
function closeNew() {
    document.querySelector(".container__modal").style = "width: 0%; height: 0%;"
    document.querySelector("body").classList.remove("stop-scrolling")
    document.querySelector(".modal__bg").style = "display: none;"
    document.querySelector(".modal__form").style = "display: none; filter: blur(0px) brightness(100%);"

    document.querySelector(".modal__cancel").style = "display: none;"
    document.querySelector(".modal__submit").style = "display: none;"
}

//** 2층 확인 모달에서 [ 계속 작성 ]: 1층 모달로 돌아감 */
function continueNew() {
    document.querySelector(".modal__form").style = "display: flex; filter: blur(0px) brightness(100%);"
    document.querySelector(".modal__cancel").style = "display: none;"
}

//** 1층 일기 모달에서 [ 등록하기 ]: 새 일기 등록 && 2층 모달 - 등록 확인창 띄움 */
function submitNew() {
    const modalRadio = document.querySelector('input[name="mood"]:checked')
    const modalTitle = document.querySelector('.title__input')
    const modalContent = document.querySelector('.content__input')

    let modalDiary = {
        mood: modalRadio.value,
        date: time,
        title: modalTitle.value,
        content: modalContent.value,
        comment: []
    }

    if (modalRadio && modalTitle.value && modalContent.value) {
        document.querySelector('input[name="mood"]:checked').checked = false
        document.querySelector('.title__input').value = ""
        document.querySelector('.content__input').value = ""
    } else {
        alert("일기를 마저 작성해 주세요!!")
        return
    }

    document.querySelector(".modal__form").style = "display: flex; filter: blur(2px) brightness(50%);"
    document.querySelector(".modal__submit").style = "display: flex;"

    diaryData = JSON.parse(localStorage.getItem("diaryData")) || []
    diaryData.push(modalDiary)

    localStorage.setItem("diaryData", JSON.stringify(diaryData))
    diaryData = JSON.parse(localStorage.getItem("diaryData"))

    makeDiaryCard(diaryData);
    window.scrollTo({ top: document.querySelector(".container__footer").getBoundingClientRect().top, behavior: "smooth" })
}

// tab bar관련 event listener
document.querySelector(".tap__diary").addEventListener('click', openDiary)
document.querySelector(".tap__gallery").addEventListener('click', openGallery)
document.querySelector('.filter__inner').addEventListener('click', openFilter)
document.querySelector('.search__input').addEventListener('input', searchDiary)
document.querySelector(".gallery__direction").addEventListener('change', changeDirection)

// modal관련 event listener
document.querySelector(".modal__bg").addEventListener('click', closeNew)
document.querySelector('.mode__toggle').addEventListener('click', changeMode)
window.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeNew()} })

document.querySelector(".tap__new").addEventListener('click', newDiary)
document.querySelector(".btn__exit").addEventListener('click', exitNew)
document.querySelector(".btn__cancel").addEventListener('click', closeNew)
document.querySelector(".btn__continue").addEventListener('click', continueNew)
document.querySelector(".btn__submit").addEventListener('click', submitNew)
document.querySelector(".btn__confirm").addEventListener('click', closeNew)

// diary form관련 event listener
document.querySelector(".diary__button").addEventListener('click', makeDiaryData)