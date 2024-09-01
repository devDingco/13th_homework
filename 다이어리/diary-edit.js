const queryString = location.search;
const part = new URLSearchParams(queryString);
const id = part.get("id");
const diaryDetailContentList = JSON.parse(localStorage.getItem("diaryList"));
const diaryDetailContent = diaryDetailContentList.filter((e) => e.id == id)[0];

const check = document.getElementById(`check_${diaryDetailContent.imageName}`);
const title = document.getElementsByClassName("title_edit_input")[0];
const content = document.getElementsByClassName("content_edit_input")[0];
check.checked = true;
title.value = diaryDetailContent.title;
content.value = diaryDetailContent.content;
