// post container를 다시 그리는 코드가 여러 개 중복되어서
// 조금 더 효율적인 코드를 작성하기 위해 모듈화하였다.
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
    // 기존에는 html 내에 직접 이벤트 속성을 적용하여 이벤트를 처리했지만
    // 모듈화를 하기 위해서는 위 방법이 아닌 addEventListener를 사용
    // -> 하지만 문제는 다음과 같음.
    // onload된 이후 innerhtml으로 post들을 만들기 때문에
    // 초반에 eventlistenrer가 읽히지 못해서 onClickDelete.js:22 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    // 라는 에러가 발생함
    // 이를 해결하기 위해서 수업시간에 배운 이벤트 캡쳐링(이벤트 위임)
    // 부모한테 click event 처리해놓고 분기를 통해서 post delete를 구현

    parentElement.addEventListener("click", function onClickDelete(event) {
        event.preventDefault();
        if (event.target && event.target.matches(".post-delete")) {
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
    });
};
