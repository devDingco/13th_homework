function onClickModalBlank(event) {
    if (event.target.id === "modal") {
        const bodyElement = document.querySelector("body");
        const modalElement = document.getElementById("modal");
        bodyElement.style.overflow = "auto";
        modalElement.style.display = "none";
    }
}
