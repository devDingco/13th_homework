import { paintPost } from "./paintPost.js";

function onClickPrevPagination() {
    let focus = Number(localStorage.getItem("focus"));
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    if (focus > 1) {
        focus -= 1;
        localStorage.setItem("focus", focus);
        paintPost(dailyArray);
    }
}

document
    .getElementById("page-left")
    .addEventListener("click", onClickPrevPagination);
