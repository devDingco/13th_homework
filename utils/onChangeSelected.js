function onChangeSelected(event) {
    // event.target.value
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    console.log(dailyArray);

    const parentElement = document.getElementById("post");
    parentElement.innerHTML = "";

    const selectedElement = dailyArray.filter(
        (value) => value.moodEng == event.target.value
    );
    selectedElement.map((resultObject, index) => {
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
