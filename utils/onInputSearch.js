import { paintPost } from "./paintPost.js";

let searchTimer;
function onInputSearch(event) {
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    const filterArray = dailyArray.filter((daily) =>
        daily.title.includes(event.target.value)
    );
    if (searchTimer) return;

    searchTimer = setTimeout(() => {
        clearTimeout(searchTimer);
        searchTimer = null;

        const parentElement = document.getElementById("post");
        parentElement.innerHTML = "";
        paintPost(filterArray);
    }, 1000);
}

document
    .getElementById("search-input")
    .addEventListener("input", onInputSearch);
