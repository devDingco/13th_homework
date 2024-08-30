function onInputButtonChange() {
    const titleElement = document.getElementById("titleId");
    const contentElement = document.getElementById("contentId");
    const selectedRadioElement = document.querySelector(
        'input[name="radio"]:checked'
    );

    const submitButtonElement = document.getElementById("submitButton");

    // 제목과 내용, 기분이 입력되면 disabled 해제 및 색상 변경 + 포인터
    // 제목 또는 내용 하나라도 입력되지 않으면 초기상태

    if (titleElement.value && contentElement.value && selectedRadioElement) {
        submitButtonElement.disabled = false;
        submitButtonElement.style.backgroundColor = "black";
        submitButtonElement.style.cursor = "pointer";
    } else {
        submitButtonElement.disabled = true;
        submitButtonElement.style.backgroundColor = "#c7c7c7";
        submitButtonElement.style.cursor = "default";
    }
}
