'use strict';
const param = Number(new URLSearchParams(window.location.search).get("p"));
const diaryArray = JSON.parse(localStorage.getItem("diaryArray"));
const editPostIdx = diaryArray.findIndex(e => e!==null && e.index===param);
const editPost = diaryArray[editPostIdx];

[`comment${param}`].forEach(key => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify([]));
});

JSON.parse(localStorage.getItem(`comment${param}`)).forEach(element => {
    if (element !== null) addDiaryUI(element);
});

document.querySelector("label.sticky-input").scrollIntoView({behavior: "smooth", block: "end"});

document.querySelector(`input[type='radio']#${editPost["emotion"]}`).checked = true;
document.querySelector("input.edit-title").placeholder = editPost.title;
document.querySelector("textarea.edit-content").placeholder = editPost.content;

document.querySelector("button#cancel-button").addEventListener("click", e => {
    e.preventDefault();
    location.href = "/";
});

document.querySelector("form#edit-form").addEventListener("submit", e => {
    e.preventDefault();
    const emotion = e.target.querySelector("input[type='radio']:checked").value;
    const title = e.target.querySelector("input.edit-title").value;
    const content = e.target.querySelector("textarea.edit-content").value;
    const dateNow = new Date();
    const newPost = {
        "emotion" : emotion,
        "title" : (!!title) ? title : editPost.title,
        "content" : (!!content) ? content : editPost.content,
        "datenow" : dateNow,
        "index" : editPost.index
    };
    diaryArray[editPostIdx] = newPost;
    localStorage.setItem("diaryArray", JSON.stringify(diaryArray));
    const oldSet = new Set(JSON.parse(localStorage.getItem(`${editPost["emotion"]}`)));
    oldSet.delete(editPost.index);
    localStorage.setItem(`${editPost["emotion"]}`, JSON.stringify([...oldSet]));
    const newSet = new Set(JSON.parse(localStorage.getItem(`${newPost["emotion"]}`)));
    newSet.add(editPost.index);
    localStorage.setItem(`${newPost["emotion"]}`, JSON.stringify([...newSet]));
    location.href = "/";
});

document.querySelector("button#delete-button").addEventListener("click", e => {
    e.preventDefault();
    diaryArray[editPostIdx] = null;
    const oldSet = new Set(JSON.parse(localStorage.getItem(`${editPost["emotion"]}`)));
    oldSet.delete(editPost.index);
    localStorage.setItem(`${editPost["emotion"]}`, JSON.stringify([...oldSet]));
    localStorage.setItem("diaryArray", JSON.stringify(diaryArray));
    location.href = "/";
});

function addCommentUI(listobj) {
    const content = listobj["content"];
    const dateNow = listobj["dateNow"];
    let year, month, date;
    if (typeof dateNow === "string") {
        const m = dateNow.match(/(\d{4})-(\d{2})-(\d{2})/);
        year = Number(m[1]);
        month = Number(m[2]);
        date = Number(m[3]);
    }
    else {
        year = dateNow.getFullYear();
        month = dateNow.getMonth() + 1;
        date = dateNow.getDate();
    }
    if ('content' in document.createElement('template')) {
        const dateString = `${year}년 ${month}월 ${date}일`;
        const commentList = document.querySelector("ul.comment-list");
        const templateHTML = document.querySelector("template#comment-template");
        const templClone = templateHTML.content.cloneNode(true);
        templClone.querySelector("span.comment-content").innerText = content;
        templClone.querySelector("span.comment-date").innerText = dateString;
        commentList.prepend(templClone);
    }
}

document.querySelector("form#comment-form").addEventListener("submit", e => {
    e.preventDefault();
    const content = e.target.querySelector("input.edit-title").value;
    if (!content) {
        alert("댓글을 입력하세요");
        return;
    }
    commentList = JSON.parse(localStorage.getItem(`comment${param}`));
    commentList.push(objAdded={
        "content": content,
        "dateNow": new Date(),
    });
    addCommentUI(objAdded);
    e.target.querySelector("input.edit-title").value="";
});

document.querySelector("#copy-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(document.querySelector("textarea.edit-content").value);
    showToast("클립보드에 복사되었습니다.");
});

function showToast(str) {
    if ('content' in document.createElement('template')) {
        const templateHTML = document.querySelector("template#toast-template");
        const templClone = templateHTML.content.cloneNode(true);
        templClone.querySelector("p#toast-p").innerText = str;
        templClone.querySelector("button#toast-close-btn").addEventListener("click", e => {
            e.target.parentElement.remove();
        });
        document.querySelector("footer").prepend(templClone);
    }
};