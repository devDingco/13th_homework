export const paintPost = (array) => {
    const parentElement = document.getElementById("post");
    array.map((resultObject) => {
        const postContainer = document.createElement("a");
        postContainer.href = `./dailyDetailInfor.html?id=${resultObject.id}`;
        postContainer.className = "post-container";
        postContainer.id = `${resultObject.id}`;
        postContainer.innerHTML = `
                <img src="${resultObject.img}" alt="img" id=${resultObject.id}  class="post-img" />
                <div class="post-title">
                    <div class="post-font-${resultObject.moodEng}">${resultObject.mood}</div>
                    <div class="post-date">${resultObject.date}</div>
                </div>
                <div class="post-content">${resultObject.title}</div>
                <button class="post-delete" id="post-delete">X</button>
            `;

        parentElement.appendChild(postContainer);
    });
};
