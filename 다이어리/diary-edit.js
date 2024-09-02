const editBtn = document.getElementById("edit_button");
const queryString = location.search;
const part = new URLSearchParams(queryString);
const id = part.get("id");
const diaryDetailContentList = JSON.parse(localStorage.getItem("diaryList"));

let [obj, index] = [];

diaryDetailContentList.map((e, i) => {
  if (e.id == id) [obj, index] = [e, i];
});

const title = document.getElementById("title_edit_input");
const content = document.getElementById("content_edit_input");
const check = document.getElementById(`check_${obj.imageName}`);

check.checked = true;
title.value = obj.title;
content.value = obj.content;

const edit = document.getElementById("edit");
const cancel = document.getElementById("cancel");

edit.href = `./diary-detail.html?id=${id}`;
cancel.href = `./diary-detail.html?id=${id}`;

const handleSaveChanges = () => {
  let updatedMood;
  let updatedMoodId;

  const getUpdatedMood = document.getElementsByName("mood");
  getUpdatedMood.forEach((mood) => {
    if (mood.checked) {
      updatedMoodId = mood.id;
      updatedMood = mood.nextElementSibling.innerText;
    }
  });

  const updateImageName = updatedMoodId.split(`_`)[1];
  const updateColor = `${updateImageName}_emotion_font_color`;
  const updatedTitle = document.getElementById("title_edit_input");
  const updatedContent = document.getElementById("content_edit_input");

  obj.mood = updatedMood;
  obj.color = updateColor;
  obj.title = updatedTitle.value;
  obj.imageName = updateImageName;
  obj.content = updatedContent.value;

  diaryDetailContentList.splice(index, 1, obj);
  localStorage.setItem("diaryList", JSON.stringify(diaryDetailContentList));
};

editBtn.addEventListener("click", handleSaveChanges);
