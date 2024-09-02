const param = Number(new URLSearchParams(window.location.search).get("p"));
const diaryArray = JSON.parse(localStorage.getItem("diaryArray"));
const editPostIdx = diaryArray.findIndex(e => e.index===param);
const editPost = diaryArray[editPostIdx];
console.log(editPost);
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
    console.log(newPost);
    diaryArray[editPostIdx] = newPost;
    localStorage.setItem("diaryArray", JSON.stringify(diaryArray));
    console.log(editPost["emotion"])
    const oldSet = new Set(JSON.parse(localStorage.getItem(`${editPost["emotion"]}`)));
    oldSet.delete(editPost.index);
    localStorage.setItem(`${editPost["emotion"]}`, JSON.stringify([...oldSet]));
    const newSet = new Set(JSON.parse(localStorage.getItem(`${newPost["emotion"]}`)));
    newSet.add(editPost.index);
    localStorage.setItem(`${newPost["emotion"]}`, JSON.stringify([...newSet]));
    location.href = "/";
});