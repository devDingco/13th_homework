import { paintPost } from "./paintPost.js";

function onClickNextPagination() {
    let focus = Number(localStorage.getItem("focus"));
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    if (focus < Math.ceil(dailyArray.length / 12)) {
        focus += 1;
        localStorage.setItem("focus", focus);
        paintPost(dailyArray);
    }
}

document
    .getElementById("page-right")
    .addEventListener("click", onClickNextPagination);
