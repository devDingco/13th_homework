const cancelButtonPressed = () => {
    const queryString = location.search
    const parameters = new URLSearchParams(queryString)
    const diaryID = parameters.get("diaryID")
    location.href = `./detail.html?diaryID=${diaryID}`
}