const diaryListKey = "diaryList"

// Local Storage
const createDiaryListFromLocalStorage = () => {
    if (localStorage.getItem(diaryListKey) === null ) {
        const diaryList = []
        const jsonData = convertToJSON(diaryList)
        localStorage.setItem(diaryListKey, jsonData)
        console.log("빈 다이어리 리스트를 생성했습니다.")
    }
}

const updateDiaryListFromLocalStorage = (data) => {
    const jsonData = convertToJSON(data)
    localStorage.setItem(diaryListKey, jsonData)
}

const fetchDiaryListFromLocalStorage = () => {
    createDiaryListFromLocalStorage()

    const jsonData = localStorage.getItem(diaryListKey)
    const objects = parseJSON(jsonData)
    return objects
}

const convertToJSON = (data) => {
    const convertedData = JSON.stringify(data)
    return convertedData
}

const parseJSON = (data) => {
    const convertedData = JSON.parse(data)
    console.log(`parseJSON: 변환된 데이터 ${convertedData} 입니다.`)
    return convertedData
}

// default Data Settings
const getToday = () => {
    const date = new Date()

    const year = date.getFullYear()
    const convertedMonth = String(date.getMonth() + 1).padStart(2, "0")
    const convertedDate = String(date.getDate()).padStart(2, "0")

    return `${year}.${convertedMonth}.${convertedDate}`
}

const getParameters = () => {
    const queryString = location.search
    const parameters = new URLSearchParams(queryString)
    
    const id = parameters.get("diaryID")
    return id
}

const getDetailData = (id) => {
    const diaryList = fetchDiaryListFromLocalStorage()
    const diary = diaryList.filter(el => (Number(el.id) === Number(id)))
    return diary[0] 
}
