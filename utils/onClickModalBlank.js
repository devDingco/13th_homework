function onClickModalBlank(event) {
    event.stopPropagation();
    const bodyElement = document.querySelector("body");
    const modalElement = document.getElementById("modal");

    bodyElement.style.overflow = "auto";
    modalElement.style.display = "none";
}
