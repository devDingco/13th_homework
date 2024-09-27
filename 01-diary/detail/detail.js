// Variables
let diary
let reminiscenceText = ""

// view Will Load
window.onload = () => {
    const id = getParameters()
    diary = getDetailData(id)
    console.log(diary)
    render()
    scrollPositionSetting()
}

// Input Data Validate
const inputTextCheck = () => {
    reminiscenceText = document.getElementById("reminiscence_input_text").value
}

// Data CRUD
const createReminiscence = (id) => {
    diary.reminiscenceList.push({text: reminiscenceText})
    console.log(diary.reminiscenceList[0])
    
    const diaryList = fetchDiaryListFromLocalStorage()
    diaryList.forEach(el => {
        if (Number(el.id) === Number(id)) {
            el.reminiscenceList = diary.reminiscenceList
        }
    })

    updateDiaryListFromLocalStorage(diaryList)
    renderReminiscenceList()
}

const deleteDiary = () => {
    const id = diary.id
    localStorage.removeItem(id)
    
    const diaryList = fetchDiaryListFromLocalStorage()
    const filteredData = diaryList.filter(el => (Number(el.id) !== Number(id)))
    updateDiaryListFromLocalStorage(filteredData)
}

// Rendering
const render = () => {
    document.getElementById("detail_diary_title").innerText = diary.title
    document.getElementById("detail_diary_mood").innerText = diary.mood
    document.getElementById("detail_diary_date").innerText = diary.date
    document.getElementById("detail_diary_text").innerText = diary.text
    renderReminiscenceList()
}

const renderReminiscenceList = () => {
    const reminiscenceDOMList = diary.reminiscenceList.map(el => `
        <div class="reminiscence_list_container_items">
            <div class="reminiscence_list_item_text">${el.text}</div>
            <div class="reminiscence_list_item_date">[${getToday()}]</div>
         </div>
         <div class="break_line"></div>`
    ).join("")
    
    document.getElementById("reminiscence_list").innerHTML = reminiscenceDOMList
}

// Tap or Press Event
const updateButtonPressed = () => {
    const id = diary.id
    location.href = `./detail_update.html?diaryID=${id}`
}

const deleteButtonPressed = () => {
    document.getElementById("HTML_write_diary_delete_select_modal_bg").style = "display: block;"
    document.body.style.overflow = "hidden"
    window.scrollTo({top:0, behavior: "smooth"})

    document.getElementById("HTML_write_diary_delete_select_modal_container").addEventListener("click", (el) => {
        el.stopPropagation()
    })
}

const inputButtonTapped = () => {
    const id = getParameters()
    document.getElementById("reminiscence_input_text").value = null
    createReminiscence(id)
    alert(`댓글을 등록했습니다.`)
}

const textCopyButtonPressed = () => {
    const copyText = document.getElementById("detail_diary_text").innerText
    navigator.clipboard.writeText(copyText)
    document.getElementById("HTML_toast_message_container").style = "display: flex;"
    window.setTimeout(() => {
        document.getElementById("HTML_toast_message_container").style = "display: none;"
    }, 2000)
}

const deleteCancelButtonPressed = () => {
    dismiss()
}

const deleteOkButtonPressed = () => {
    deleteDiary()
    location.href = "../index.html"
}

// Other
const scrollPositionSetting = () => {
    const y = document.getElementById("reminiscence_input_text").offsetTop
    window.scrollTo({top: y, behavior: "smooth"})
}

const dismiss = () => {
    document.getElementById("HTML_write_diary_delete_select_modal_bg").style = "display: none;"
    document.body.style.overflow = "auto"
}