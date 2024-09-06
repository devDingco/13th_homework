function onClickChangePost(event) {
    const dailyElement = document.getElementById("article-daily");
    const pictureElement = document.getElementById("article-picture");
    const dailyComponent = document.getElementById("article-main");
    const pictureComponent = document.getElementById(
        "article-picture-component"
    );
    const selectElement = document.getElementById("select-post");
    const selectElement1 = document.getElementById("select-post1");

    if (event.target.innerText === "일기 보관함") {
        pictureComponent.style.display = "none";
        dailyComponent.style.display = "flex";
        pictureElement.style.color = "rgba(171, 171, 171, 1)";
        dailyElement.style.color = "black";
        selectElement.style.display = "block";
        selectElement1.style.display = "none";
    } else if (event.target.innerText === "사진 보관함") {
        pictureComponent.style.display = "flex";
        dailyComponent.style.display = "none";
        pictureElement.style.color = "black";
        dailyElement.style.color = "rgba(171, 171, 171, 1)";
        selectElement.style.display = "none";
        selectElement1.style.display = "block";
    }
}
