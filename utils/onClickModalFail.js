function onClickModalFail() {
    const modalFailElement = document.getElementById("modal_fail_container");
    const modalElement = document.getElementById("modal");

    modalFailElement.style.display = "flex";
    modalElement.style.backdropFilter = "opacity(0.5)";
}
