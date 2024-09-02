let diary

window.onload = () => {
    fetchDetailDataFromLocalStorage()
    render()
}

const fetchDetailDataFromLocalStorage = () => {
    const queryString = location.search
    const parameters = new URLSearchParams(queryString)

    const diaryID = parameters.get("diaryID")
    console.log(`상세보기 할 ID는 ${diaryID} 입니다.`)

    const jsonData = localStorage.getItem(diaryID)
    diary = JSON.parse(jsonData)
}

const selectMoodCheck = () => {
    const radioList = document.getElementsByName("select_mood_radio_list")
    radioList.forEach(el => {
        if (el.value === diary.mood) {
            el.checked = true
        }
    })
}

const inputMoodCheck = () => {
    const radioList = document.getElementsByName("select_mood_radio_list")
    radioList.forEach(el => {
        if (el.checked) {
            diary.mood = el.value
        }
    })
}

const render = () => {
    document.getElementById("update_contents_title").innerText = diary.title
    document.getElementById("update_contents_text").innerText = diary.text
    selectMoodCheck()
}


const updateDiary = () => {
    const title = document.getElementById("update_contents_title").value
    const text = document.getElementById("update_contents_text").value

    diary.title = title
    diary.text = text

    const jsonData = JSON.stringify(diary)
    localStorage.setItem(diary.id, jsonData)
}

const cancelButtonPressed = () => {
    const queryString = location.search
    const parameters = new URLSearchParams(queryString)
    const diaryID = parameters.get("diaryID")
    location.href = `./detail.html?diaryID=${diaryID}`
}

const updateButtonPressed = () => {
    updateDiary()
    location.href = `./detail.html?diaryID=${diary.id}`
}
