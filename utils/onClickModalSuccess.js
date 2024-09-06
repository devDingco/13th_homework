function onClickModalSuccess() {
    const modalSuccessElement = document.getElementById(
        "modal_success_container"
    );
    const modalElement = document.getElementById("modal");

    modalSuccessElement.style.display = "flex";
    modalElement.style.backdropFilter = "opacity(0.5)";
}
