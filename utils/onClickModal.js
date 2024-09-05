let modalFlag = false;

function onClickModal() {
    const bodyElement = document.querySelector("body");
    const modalElement = document.getElementById("modal");

    bodyElement.style.overflow = "hidden";
    modalElement.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });

    modalFlag = true;
}
