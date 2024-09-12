let diaryList = []
let filteredDiaryList = []

let inputTitle
let inputText
let selectedMood

let isFiltered = false
let searchTimer = null

let startPage = 1
let selectedPage = 1
let lastPage = null

window.onload = () => {
    diaryList = fetchDiaryListFromLocalStorage()
    lastPage = Math.ceil(diaryList.length / 12)
    drawPageNumberButtons()
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
        document.getElementById("HTML_diary_write_button").style = "background-color: var(--button_activation_background_color); color: var(--button_activation_text_color);"
        return
    }

    if (inputTitle === "" || inputText === "" || selectedMood === undefined) {
        console.log("등록 버튼이 비활성화 됩니다.")
        document.getElementById("HTML_diary_write_button").disabled = true
        document.getElementById("HTML_diary_write_button").style = "background-color: var(--button_disabled_background_color); color: var(--button_disabled_text_color);"  
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

    
    isFiltered = false
    document.getElementById("HTML_dropdown_title").style.cssText = `--dropdown_title: "전체"`
    drawPageNumberButtons()
}

const removeDiary = (id) => {
    const updateDiaryList = diaryList.filter(el => Number(el.id) !== Number(id))
    console.log(`다이어리가 삭제 됩니다. ${updateDiaryList}`)
    diaryList = updateDiaryList
    updateDiaryListFromLocalStorage(diaryList)
    drawPageNumberButtons()
}

const filterDiary = (event) => {
    const selectedMood = event.target.value
    selectedPage = 1

    if (selectedMood === "전체") {
        isFiltered = false
        drawPageNumberButtons()
    } else {
        filteredDiaryList = diaryList.filter(el => (el.mood === selectedMood))
        isFiltered = true
        drawPageNumberButtons()
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

//  [Tap or Press Event]
const selectDiaryFilterMenu = (event) => {
    const value = event.target
    const title = value.id.slice(8)

    switch (title) {
        case "all": {
            document.getElementById("HTML_dropdown_title").style.cssText = `--dropdown_title: "전체"`
            break
        }
        case "happy": {
            document.getElementById("HTML_dropdown_title").style.cssText = `--dropdown_title: "행복해요"`
            break
        }
        case "sad": {
            document.getElementById("HTML_dropdown_title").style.cssText = `--dropdown_title: "슬퍼요"`
            break
        }
        case "surprised": {
            document.getElementById("HTML_dropdown_title").style.cssText = `--dropdown_title: "놀랐어요"`
            break
        }
        case "angry": {
            document.getElementById("HTML_dropdown_title").style.cssText = `--dropdown_title: "화나요"`
            break
        }
        case "other": {
            document.getElementById("HTML_dropdown_title").style.cssText = `--dropdown_title: "기타"`
            break
        }
    }
    filterDiary(event)
    document.getElementById("HTML_dropdown_title").click()
}

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

// [일기 작성 취소] 버튼 클릭 시 동작
const cancelButtonPressed = () => {
    dismiss()
    resetInputData()
}

// [일기 쓰기] 버튼 클릭 시 동작
const writeButtonPressed = () => {
    presentModal()
}

const makeButtonPressed = () => {
    createDiary()
    document.getElementById("HTML_write_diary_success_modal_bg").style = "display: block;"
}

const okButtonPressed = () => {
    dismiss()
    resetInputData()
}

const onDarkMode = (event) => {
    if (event.target.checked) {
        document.documentElement.setAttribute("dark_mode", "on")
    } else {
        document.documentElement.removeAttribute("dark_mode")
    }
    
}

const presentNaviMenu = (naviItem) => {
    switch (naviItem) {
        case "diary": {
            document.getElementById("diary_list").style = "display: grid;"
            document.getElementById("HTML_contents_photos_container").style = "display: none;"
            document.getElementById("diary_filter_dropbox").style = "display: flex;"
            document.getElementById("photos_filter_dropbox").style = "display: none;"
            document.getElementById("id_page_button_list_container").style = "display: flex;"
            window.scrollTo({top:0})
            nowNavMenu = "diary"
            break
        }
        case "photos": {
            document.getElementById("diary_list").style = "display: none;"
            document.getElementById("HTML_contents_photos_container").style = "display: block;"
            document.getElementById("diary_filter_dropbox").style = "display: none;"
            document.getElementById("id_page_button_list_container").style = "display: none;"
            photosPageOnLoad()
            nowNavMenu = "photos"
            break
        }
    }
}

const topScrollFloatingButtonTapped = () => {
    window.scrollTo({top:0})
}

// [Other]
const presentModal = () => {
    window.scrollTo({top:0, behavior: "smooth"})
    document.getElementById("HTML_write_diary_modal_bg").style = "display: block;"
    document.body.style.overflow = "hidden"

    document.getElementById("HTML_write_diary_modal_container").addEventListener("click", (el) => {
        el.stopPropagation()
    })

    document.getElementById("HTML_write_diary_cancel_modal_bg").addEventListener("click", (el) => {
        el.stopPropagation()
    })
}

const dismiss = () => {
    document.getElementById("HTML_write_diary_success_modal_bg").style = "display: none;"
    document.getElementById("HTML_write_diary_cancel_modal_bg").style = "display: none;"
    document.getElementById("HTML_write_diary_modal_bg").style = "display: none;"
    document.body.style.overflow = "auto"
}

const searchDiary = (event) => {
    clearTimeout(searchTimer)

    timer = setTimeout(() => {
        const inputText = event.target.value

        const result = diaryList.filter(el => el.title.includes(inputText))
        if (isFiltered) {
            const result = filteredDiaryList.filter(el => el.title.includes(inputText))
            drawPageList(result)
        } else {
            const result = diaryList.filter(el => el.title.includes(inputText))
            drawPageList(result)
        }
    }, 1000)
}

const drawPageNumberButtons = () => {
    if (isFiltered) {
        drawPageList(filteredDiaryList)
    } else {
        drawPageList(diaryList)
    }
}

const drawPageList = (data) => {
    const lastPage = Math.ceil(data.length / 12)
    const pageList = data.map((el, index) => {
        if ((index + startPage) <= lastPage) {
            console.log(isFiltered)
            console.log(index)
            const pageNumber = index + 1
            const className = selectedPage === pageNumber ? "selected_page_button" : "page_list_button"
            return `
                <button onclick="goToPage(${pageNumber})" class=${className}>
                ${pageNumber}</button>
                `
        } else {
            return ""
        }
    }).join("")
    document.getElementById("id_page_number_button_list").innerHTML = pageList
    renderDiaryList(data)
}

const renderDiaryList = (data) => {
    const result = data.filter((el, index) => {
        const diaryOfNumber = 12
        const showIndex = (selectedPage - 1) * diaryOfNumber
        if (showIndex <= index && index < (showIndex + diaryOfNumber)) {
            return true 
        } else {
            return false
        }
    })

    document.getElementById("diary_list").innerHTML = result.map(el => 
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
        </div>
    `
    ).join("")
}

const goToPage = (number) => {
    selectedPage = number
    drawPageNumberButtons()
    window.scrollTo({top:300, behavior: "smooth"})
}

const goToPreviousPage = () => {
    if (selectedPage === 1) {
        alert(`이전 페이지가 없습니다.`)
    } else {
        selectedPage -= 12
    }
}

const goToNextPage = () => {
    if (selectedPage + 12 <= lastPage) {
        selectedPage += 12
    } else {
        alert(`다음 페이지가 없습니다.`)
    }
}

// Event Listener
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        dismiss()
    }
})

