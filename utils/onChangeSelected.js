import { paintPost } from "./paintPost.js";

function onChangeSelected(event) {
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    const parentElement = document.getElementById("post");
    parentElement.innerHTML = "";

    if (event.target.id === "all") {
        paintPost(dailyArray);
    } else {
        const selectedElement = dailyArray.filter(
            (value) => value.moodEng == event.target.id
        );
        paintPost(selectedElement);
    }

    document.querySelectorAll(".optionItem").forEach((item) => {
        item.style.backgroundColor = "white";
        item.style.color = "rgba(95, 95, 95, 1)";
        item.childNodes[5].style.display = "none";
    });

    const selectedDiv = event.target.closest(".optionItem");

    selectedDiv.style.backgroundColor = "rgba(58, 181, 15, 0.05)";
    selectedDiv.style.color = "rgba(41, 156, 0, 1)";
    selectedDiv.children[2].style.display = "block";
}
document
    .getElementById("optionList")
    .addEventListener("click", onChangeSelected);
