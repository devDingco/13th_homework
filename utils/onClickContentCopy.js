function onClickContentCopy() {
    const contentElement = document.getElementById("article-content");
    const footerElememt = document.querySelector("footer");

    navigator.clipboard.writeText(contentElement.innerText);

    footerElememt.classList.add("footer-animation");

    footerElememt.addEventListener("animationend", function () {
        box.classList.remove("animate");
    });
}
