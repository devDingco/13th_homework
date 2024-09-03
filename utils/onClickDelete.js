function onClickDelete(event) {
    event.preventDefault();

    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));

    const deleteArray = dailyArray.filter(
        (daily) => daily.id !== Number(event.target.parentElement.id)
    );

    const parentElement = document.getElementById("post");
    parentElement.innerHTML = "";

    deleteArray.map((resultObject) => {
        const postContainer = document.createElement("a");
        postContainer.href = `./dailyDetailInfor.html?id=${resultObject.id}`;
        postContainer.className = "post-container";
        postContainer.id = `${resultObject.id}`;
        postContainer.innerHTML = `
        <img src="${resultObject.img}" alt="1" id=${resultObject.id}  class="post-img" />
        <div class="post-title">
            <div class="post-font-${resultObject.moodEng}">${resultObject.mood}</div>
            <div class="post-date">${resultObject.date}</div>
        </div>
        <div class="post-content">${resultObject.title}</div>
        <button class="post-delete" onclick="onClickDelete(event)">X</button>
    `;

        parentElement.appendChild(postContainer);
    });
    if (deleteArray) {
        localStorage.setItem("dailyArray", JSON.stringify(deleteArray));
    }
}
