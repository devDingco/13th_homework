let diaryList = []

let inputTitle
let inputText
let selectedMood

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
    console.log("일기 작성 버튼을 눌렀습니다.")
    createDiary()
}

const createDiary = () => {
    console.log("일기를 작성합니다.")
    diaryList.push({
        id: diaryList.length,
        date: getToday(),
        mood: selectedMood,
        title: inputTitle,
        text: inputText
    })
    console.log(`생성된 일기의 제목은 "${diaryList[diaryList.length - 1].text}" 입니다.`)

    reloadDiary()
}

const getToday = () => {
    const date = new Date()

    const year = date.getFullYear()
    const convertedMonth = String(date.getMonth() + 1).padStart(2, "0")
    const convertedDate = String(date.getDate()).padStart(2, "0")

    return `${year}.${convertedMonth}.${convertedDate}`
}

const reloadDiary = () => {
    const diaryDOMList = diaryList.map(el => 
        `<div class="diary" id="diary_DOM">
            <img class="diary_mood_img" src=${getMoodSettings(el.mood).img} alt=${getMoodSettings(el.mood).alt} onclick="diaryCardTapped(${el.id})">
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

const diaryCardTapped = (id) => {
    console.log("다이어리 카드를 탭했습니다.", id)
    const diary = diaryList[id]
    alert(`
    다이어리 상세보기
    제목: ${diary.title}
    날짜: ${diary.date}
    기분: ${diary.mood}
    내용: ${diary.text}`)
}

