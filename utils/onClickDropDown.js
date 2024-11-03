function onClickDropDown() {
    const optionElement = document.getElementById("optionList");
    if (optionElement.style.display === "flex") {
        optionElement.style.display = "none";
    } else {
        optionElement.style.display = "flex";
    }
}
