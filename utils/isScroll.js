function isScroll() {
    const selectElement = document.getElementById("select-post");
    const scrollLength = window.scrollY;
    if (scrollLength !== 0) {
        selectElement.style.backgroundColor = "black";
        selectElement.style.color = "white";
    } else {
        selectElement.style.backgroundColor = null;
        selectElement.style.color = "black";
    }
}
window.addEventListener("scroll", isScroll);
