let diary
let reminiscenceList = []
let reminiscenceText = ""


window.onload = () => {
    fetchDetailDataFromLocalStorage()
    render()
    scrollPositionSetting()
}

const fetchDetailDataFromLocalStorage = () => {
    const queryString = location.search
    const parameters = new URLSearchParams(queryString)

    const diaryID = parameters.get("diaryID")
    console.log(`상세보기 할 ID는 ${diaryID} 입니다.`)

    const jsonData = localStorage.getItem(diaryID)
    diary = JSON.parse(jsonData)
    reminiscenceList = diary.reminiscenceList
    console.log(reminiscenceList)
}

const render = () => {
    document.getElementById("detail_diary_title").innerText = diary.title
    document.getElementById("detail_diary_mood").innerText = diary.mood
    document.getElementById("detail_diary_date").innerText = diary.date
    document.getElementById("detail_diary_text").innerText = diary.text
    renderReminiscenceList()
}

const inputTextCheck = () => {
    reminiscenceText = document.getElementById("reminiscence_input_text").value
}

const createReminiscence = () => {
    diary.reminiscenceList.push({text: reminiscenceText})
    const jsonData = JSON.stringify(diary)
    localStorage.setItem(diary.id, jsonData)
}

const updateButtonPressed = () => {
    const id = diary.id
    location.href = `./detail_update.html?diaryID=${id}`
}

const deleteButtonPressed = () => {
    const id = diary.id
    localStorage.removeItem(id)
    location.href = "../index.html"
    alert(`일기를 삭제했습니다.`)
}



const inputButtonTapped = () => {
    const reminiscence = { text: reminiscenceText }
    reminiscenceList.push(reminiscence)
    renderReminiscenceList()
    document.getElementById("reminiscence_input_text").value = null
    createReminiscence()
    alert(`댓글을 등록했습니다.`)
}

const renderReminiscenceList = () => {
    const reminiscenceDOMList = reminiscenceList.map(el => `
        <div class="reminiscence_list_container_items">
            <div class="reminiscence_list_item_text">${el.text}</div>
            <div class="reminiscence_list_item_date">[${getToday()}]</div>
         </div>
         <div class="break_line"></div>`
    ).join("")
    
    document.getElementById("reminiscence_list").innerHTML = reminiscenceDOMList
}

const getToday = () => {
    const date = new Date()

    const year = date.getFullYear()
    const convertedMonth = String(date.getMonth() + 1).padStart(2, "0")
    const convertedDate = String(date.getDate()).padStart(2, "0")

    return `${year}.${convertedMonth}.${convertedDate}`
}

const scrollPositionSetting = () => {
    const y = document.getElementById("reminiscence_input_text").offsetTop
    window.scrollTo({top: y, behavior: "smooth"})
}