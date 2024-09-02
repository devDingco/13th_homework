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

const render = () => {
    document.getElementById("detail_diary_title").innerText = diary.title
    document.getElementById("detail_diary_mood").innerText = diary.mood
    document.getElementById("detail_diary_date").innerText = diary.date
    document.getElementById("detail_diary_text").innerText = diary.text
}

const updateButtonPressed = () => {
    const id = diary.id
    location.href = `./detail_update.html?diaryID=${id}`
}

const inputTextRender = () => {
    
}