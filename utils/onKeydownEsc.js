function onkeydownEsc(event) {
    if (modalFlag && event.key == "Escape") {
        const bodyElement = document.querySelector("body");
        const modalElement = document.getElementById("modal");

        bodyElement.style.overflow = "auto";
        modalElement.style.display = "none";
    }
}
window.addEventListener("keydown", onkeydownEsc);
