let diaryList = []
let filteredDiaryList = []

let inputTitle
let inputText
let selectedMood

let isFiltered = false

window.onload = () => {
    fetchDiaryFromLocalStorage()
}

const fetchDiaryFromLocalStorage = () => {
    const numberOfDiary = localStorage.length

    for (let i = 0; i < numberOfDiary; i++) {
        const data = localStorage.getItem(i)
        console.log(`fetchDiaryFromLocalStorage: "로컬 스토리지"에서 데이터를 가져왔습니다. ${data}`)
        diaryList.push(parseJSON(data))
        console.log(`fetchDiaryFromLocalStorage: 현재 테스트 배열의 목록 ${diaryList}, 배열의 수 ${numberOfDiary}`)
    }

    if (diaryList.length !== 0) {
        reloadDiary(diaryList)
    }
}

const validateInputText = () => {
    console.log("입력된 텍스트를 검증합니다.")
    inputTitle = document.getElementById("input_diary_title").value
    inputText = document.getElementById("input_diary_text").value
    checkedInputMood()
    activateWriteButton()
}

const checkedInputMood = () => {
    const moodList = document.getElementsByName("mood_radio")

    moodList.forEach(el => {
        if (el.checked) {
            selectedMood = el.value
            console.log(`선택된 기분은 "${selectedMood}" 입니다.`)
        }
    })
}

const activateWriteButton = () => {
    if (inputTitle !== "" && inputText !== "" && selectedMood !== "") {
        console.log("등록 버튼이 활성화 됩니다.")
        document.getElementById("writeButton").disabled = false
        document.getElementById("writeButton").style = "background-color: black; color: white"
        return
    }

    if (inputTitle === "" || inputText === "" || selectedMood === "") {
        console.log("등록 버튼이 비활성화 됩니다.")
        document.getElementById("writeButton").disabled = true
        document.getElementById("writeButton").style = "background-color: #C7C7C7; color: #F2F2F2"  
        return
    }
}

const writeButtonPressed = () => {
    console.log("writeButtonPressed: 일기 작성 버튼을 눌렀습니다.")
    createDiary()
}

const createDiary = () => {
    console.log("createDiary: 일기를 작성합니다.")
    diaryList.push({
        id: diaryList.length,
        date: getToday(),
        mood: selectedMood,
        title: inputTitle,
        text: inputText
    })
    const createdDiary = diaryList[diaryList.length -1]
    convertToJSON(createdDiary)
    console.log(`createDiary: 생성된 일기의 제목은 "${createdDiary.text}" 입니다.`)

    filterDiary()
    alert(`일기가 추가되었습니다.`)
}

const convertToJSON = (data) => {
    const convertedData = JSON.stringify(data)
    console.log(`convertToJSON: ${convertedData} 객체를 JSON 데이터로 변환했습니다.`)
    localStorage.setItem(data.id, convertedData)
    console.log(localStorage.length)
}

const parseJSON = (data) => {
    const convertedData = JSON.parse(data)
    console.log(`parseJSON: 변환된 데이터 ${convertedData} 입니다.`)
    return convertedData
}

const getToday = () => {
    const date = new Date()

    const year = date.getFullYear()
    const convertedMonth = String(date.getMonth() + 1).padStart(2, "0")
    const convertedDate = String(date.getDate()).padStart(2, "0")

    return `${year}.${convertedMonth}.${convertedDate}`
}

// "mood" 데이터에 따라, 이미지 주소 전달하기.
const getMoodSettings = (mood) => {
    console.log(`이미지 주소를 위해, 전달받은 "${mood}" 데이터입니다.`)
    switch (mood) {
        case "행복해요":
            return {
                img: `"./assets/mood_happy.png"`,
                attribute: `"diary_mood_happy"`,
                alt: `"행복한 얼굴 사진입니다."`
            }
        case "슬퍼요":
            return {
                img: `"./assets/mood_sad.png"`,
                attribute: `"diary_mood_sad"`,
                alt: `"슬픈 얼굴 사진입니다."`
            }
        case "놀랐어요":
            return {
                img: `"./assets/mood_ surprised.png"`,
                attribute: `"diary_mood_surprised"`,
                alt: `"놀란 얼굴 사진입니다."`
            }
        case "화나요":
            return {
                img: `"./assets/mood_angry.png"`,
                attribute: `"diary_mood_angry"`,
                alt: `"화난 얼굴 사진입니다."`
            }
        case "기타":
            return {
                img: `"./assets/mood_other.png"`,
                attribute: `"diary_mood_other"`,
                alt: `"선택 항목에 없는 기분을 나타내는 고민하는 얼굴 사진입니다."`
            }
        default:
            break
    }
}

const reloadDiary = (reload_diaryList) => {
    const diaryDOMList = reload_diaryList.map(el => 
        `<div class="diary" id="diary_DOM" onclick="diaryCardTapped(${el.id})">
            <img class="diary_mood_img" src=${getMoodSettings(el.mood).img} alt=${getMoodSettings(el.mood).alt}>
            <button class="diary_delete_button"><img src="./assets/delete_button.png" alt="X 삭제 버튼" onclick="deleteButtonTapped(event, ${el.id})"></button>
                <div class="diary_title">
                    <div class="diary_sub_title">
                        <div class=${getMoodSettings(el.mood).attribute}>${el.mood}</div>
                        <div class="diary_date">${el.date}</div>
                    </div>
                 <div class="diary_main_title">${el.title}</div>
            </div>
        </div>`
    ).join("")

    document.getElementById("diary_list").innerHTML = diaryDOMList
}

const filterDiary = () => {
    const selectedMood = document.getElementById("mood_select").value

    if (selectedMood === "전체") {
        isFiltered = false
        reloadDiary(diaryList)
    } else {
        filteredDiaryList = diaryList.filter(el => (el.mood === selectedMood))
        isFiltered = true
        reloadDiary(filteredDiaryList)
    }
}

const diaryCardTapped = (id) => {
    console.log("diaryCardTapped: 다이어리 카드를 탭했습니다.", id)
    const diary = diaryList[id]
    location.href = `./detail/detail.html?diaryID=${id}`
}

const removeDiary = (id) => {
    localStorage.removeItem(id)
    diaryList = []
    fetchDiaryFromLocalStorage()
}

const deleteButtonTapped = (event, id) => {
    event.stopPropagation()
    removeDiary(id)
    reloadDiary(diaryList)
    alert(`일기가 삭제되었습니다.`)
}

const topScrollFloatingButtonTapped = () => {
    window.scrollTo({top:0})
}

window.addEventListener("scroll", () => {
    const y = window.scrollY

    if (y > 0) {
        document.getElementById("mood_select").style = "background-color: black; color: white;"
    } else {
        document.getElementById("mood_select").style = "background-color: white; color: black;"
    }
})
