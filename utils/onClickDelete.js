import { paintPost } from "./paintPost.js";

function onClickDelete(event) {
    event.preventDefault();

    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));

    const deleteArray = dailyArray.filter(
        (daily) => daily.id !== Number(event.target.parentElement.id)
    );

    const parentElement = document.getElementById("post");
    parentElement.innerHTML = "";

    paintPost(deleteArray);

    if (deleteArray) {
        localStorage.setItem("dailyArray", JSON.stringify(deleteArray));
    }
}

// document.getElementById("post-delete").addEventListener("click", onClickDelete);
