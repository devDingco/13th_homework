function onInputSearch(event) {
    let timer;

    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    const filterArray = dailyArray.filter((daily) =>
        daily.title.includes(event.target.value)
    );
    if (timer) return;

    console.log(filterArray);

    timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;

        const parentElement = document.getElementById("post");
        parentElement.innerHTML = "";
        filterArray.map((resultObject) => {
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
    }, 1000);
}
