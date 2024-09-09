function onChangeSelected(event) {
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    const parentElement = document.getElementById("post");
    parentElement.innerHTML = "";

    if (event.target.id === "all") {
        dailyArray.map((resultObject) => {
            const postContainer = document.createElement("a");
            postContainer.href = `./dailyDetailInfor.html?id=${resultObject.id}`;
            postContainer.className = "post-container";
            postContainer.innerHTML = `
        <img src="${resultObject.img}" alt="1" id=${resultObject.id}  class="post-img" />
        <div class="post-title">
            <div class="post-font-${resultObject.moodEng}">${resultObject.mood}</div>
            <div class="post-date">${resultObject.date}</div>
        </div>
        <div class="post-content">${resultObject.title}</div>
    `;
            parentElement.appendChild(postContainer);
        });
    }
    const selectedElement = dailyArray.filter(
        (value) => value.moodEng == event.target.id
    );
    selectedElement.map((resultObject) => {
        const postContainer = document.createElement("a");
        postContainer.href = `./dailyDetailInfor.html?id=${resultObject.id}`;
        postContainer.className = "post-container";
        postContainer.innerHTML = `
        <img src="${resultObject.img}" alt="1" id=${resultObject.id}  class="post-img" />
        <div class="post-title">
            <div class="post-font-${resultObject.moodEng}">${resultObject.mood}</div>
            <div class="post-date">${resultObject.date}</div>
        </div>
        <div class="post-content">${resultObject.title}</div>
    `;
        parentElement.appendChild(postContainer);
    });

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
