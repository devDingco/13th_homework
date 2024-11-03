function onClickCancelRegister() {
    const bodyElement = document.querySelector("body");
    const modalElement = document.getElementById("modal");
    const failElement = document.getElementById("modal_fail_container");

    bodyElement.style.overflow = "auto";
    modalElement.style.display = "none";
    failElement.style.display = "none";
}
