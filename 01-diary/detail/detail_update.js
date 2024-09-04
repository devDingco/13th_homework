// Variables
let diary

// viewWillLoad
window.onload = () => {
    const id = getParameters()
    diary = getDetailData(id)
    render()
}

// Input Data Validate
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

// Rendering
const render = () => {
    document.getElementById("update_contents_title").value = diary.title
    document.getElementById("update_contents_text").innerText = diary.text
    selectMoodCheck()
    renderReminiscenceList()
}

const renderReminiscenceList = () => {
    const reminiscenceDOMList = diary.reminiscenceList.map(el => `
        <div class="reminiscence_list_container_items">
            <div class="reminiscence_list_item_text">${el.text}</div>
            <div class="reminiscence_list_item_date">[${diary.date}]</div>
         </div>
         <div class="break_line"></div>`
    ).join("")
    
    document.getElementById("reminiscence_list").innerHTML = reminiscenceDOMList
}

// Data CRUD
const updateDiary = () => {
    const title = document.getElementById("update_contents_title").value
    const text = document.getElementById("update_contents_text").value

    console.log(title)
    diary.title = title
    diary.text = text

    const jsonData = JSON.stringify(diary)
    localStorage.setItem(diary.id, jsonData)
}

// Tap or Press Event
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

