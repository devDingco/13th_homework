let diaryList = []
let filteredDiaryList = []

let inputTitle
let inputText
let selectedMood

let isFiltered = false

window.onload = () => {
    diaryList = fetchDiaryListFromLocalStorage()
    console.log(diaryList)
    reloadData(diaryList)
}

// [Input Data Validate]
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
        }
    })
}

const activateWriteButton = () => {
    if (inputTitle !== "" && inputText !== "" && selectedMood !== undefined) {
        console.log("등록 버튼이 활성화 됩니다.")
        console.log(selectedMood)
        document.getElementById("HTML_diary_write_button").disabled = false
        document.getElementById("HTML_diary_write_button").style = "background-color: black; color: white"
        return
    }

    if (inputTitle === "" || inputText === "" || selectedMood === undefined) {
        console.log("등록 버튼이 비활성화 됩니다.")
        document.getElementById("HTML_diary_write_button").disabled = true
        document.getElementById("HTML_diary_write_button").style = "background-color: #C7C7C7; color: #F2F2F2"  
        return
    }
}

// [Data CRUD]
const createDiary = () => {
    console.log("createDiary: 일기를 작성합니다.")
    diaryList.push({
        id: getID(),
        date: getToday(),
        mood: selectedMood,
        title: inputTitle,
        text: inputText,
        reminiscenceList: []
    })

    updateDiaryListFromLocalStorage(diaryList)
    reloadData(diaryList)
}

const removeDiary = (id) => {
    const updateDiaryList = diaryList.filter(el => Number(el.id) !== Number(id))
    console.log(`다이어리가 삭제 됩니다. ${updateDiaryList}`)
    diaryList = updateDiaryList
    updateDiaryListFromLocalStorage(diaryList)
    reloadData(diaryList)
}

const filterDiary = () => {
    const selectedMood = document.getElementById("mood_select").value 

    if (selectedMood === "전체") {
        isFiltered = false
        reloadData(diaryList)
    } else {
        filteredDiaryList = diaryList.filter(el => (el.mood === selectedMood))
        isFiltered = true
        reloadData(filteredDiaryList)
    }
}

const resetInputData = () => {
    document.getElementById("input_diary_title").value = null
    document.getElementById("input_diary_text").value = null

    const moodList = document.getElementsByName("mood_radio")
    moodList.forEach(el => {
        el.checked = false
    })
}

// [Data Settings]
const getID = () => {
    if (diaryList.length === 0) {
        return "1"
    } else {
        const lastID = diaryList[diaryList.length - 1].id
        const newID = Number(lastID) + 1
        return newID
    }
}

const getMoodSettings = (mood) => {
    // "mood" 데이터에 따라, 이미지 주소 전달하기.
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

// [Rendering]
const reloadData = (reload_diaryList) => {
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

//  [Tap or Press Event]
const diaryCardTapped = (id) => {
    console.log("diaryCardTapped: 다이어리 카드를 탭했습니다.", id)
    const diary = diaryList[id]
    location.href = `./detail/detail.html?diaryID=${id}`
}

const deleteButtonTapped = (event, id) => {
    event.stopPropagation()
    removeDiary(id)
    alert(`일기가 삭제되었습니다.`)
}

const continueButtonPressed = () => {
    document.getElementById("HTML_write_diary_cancel_modal_bg").style = "display: none;"
}

const closedButtonPressed = () => {
    document.getElementById("HTML_write_diary_cancel_modal_bg").style = "display: block;"
}

const cancelButtonPressed = () => {
    console.log("cancelButtonPressed: 일기 등록 닫기 버튼을 눌렀습니다.")
    document.getElementById("HTML_write_diary_cancel_modal_bg").style = "display: none;"
    document.getElementById("HTML_write_diary_modal_bg").style = "display: none;"

    resetInputData()
}

const writeButtonPressed = () => {
    presentModal()
}

const makeButtonPressed = () => {
    createDiary()
    document.getElementById("HTML_write_diary_success_modal_bg").style = "display: block;"
}

const okButtonPressed = () => {
    document.getElementById("HTML_write_diary_success_modal_bg").style = "display: none;"
    document.getElementById("HTML_write_diary_modal_bg").style = "display: none;"
    resetInputData()
}

const topScrollFloatingButtonTapped = () => {
    window.scrollTo({top:0})
}

// [Other]
window.addEventListener("scroll", () => {
    const y = window.scrollY

    if (y > 0) {
        document.getElementById("mood_select").style = "background-color: black; color: white;"
    } else {
        document.getElementById("mood_select").style = "background-color: white; color: black;"
    }
})

const presentModal = () => {
    document.getElementById("HTML_write_diary_modal_bg").style = "display: block;"
}