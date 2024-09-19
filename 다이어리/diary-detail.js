const queryString = location.search;
const part = new URLSearchParams(queryString);
const id = part.get("id");
const diaryDetailContentList = JSON.parse(localStorage.getItem("diaryList"));
const diaryDetailContent = diaryDetailContentList.filter((e) => e.id === id)[0];
let diaryEntries = [];
let commentEntries;
let index;

const diary = {
  id: diaryDetailContent.id,
  date: diaryDetailContent.date,
  mood: diaryDetailContent.mood,
  color: diaryDetailContent.color,
  title: diaryDetailContent.title,
  content: diaryDetailContent.content,
  imageName: diaryDetailContent.imageName,
};

const createHtml = (diary) => {
  const diaryDetailCard = `
      <div class="title_frame">
        <div class="title">${diary.title}</div>
        <div class="emotion_date_frame">
          <div class="emotion">
            <img src="./image/${diary.imageName}_s.png" width="32px" />
            <div class=${diary.color}>${diary.mood}</div>
          </div>
          <div class="date_frame">
            <div class="date">${diary.date}</div>
            <div class="write">작성</div>
          </div>
        </div>
      </div>
      <div class="content_frame">
        <div class="content_label">내용</div>
        <div class="content" id="copyContent">${diary.content}</div>
      </div>
      <div class="copy_content_btn_layout">
        <button onclick="handleContentCopy()">
          <img src="./image/content_copy.svg" />
          <div>내용 복사</div>
        </button>
      </div>
      <div class="diary_action_container">
      <a href="./diary-edit.html?id=${diary.id}" class="modification_frame">
        <button class="modification_Btn">수정</button>
      </a>
        <button class="modification_Btn" onclick="confirmDeleteDiary(event)">삭제</button>
      </div>
  `;

  const mainFrame = document.getElementById("main_frame");
  mainFrame.innerHTML = diaryDetailCard;
  const main = document.getElementById("main");
  return main.appendChild(mainFrame);
};

const createCommentHtml = (commentEntries) => {
  const commentCard = `
    <div class="comments_container">
      <div class="comment_content">${commentEntries.commentValue}</div>
      <div class="comment_date">${commentEntries.date}</div>
      <div class="comment_divider"></div>
    </div>
  `;
  const commentBox = document.createElement("div");
  commentBox.innerHTML = commentCard;
  const commentsContainerBox = document.getElementById(
    "comments_container_box"
  );
  return commentsContainerBox.appendChild(commentBox);
};

const addComment = (date) => {
  const comment = document.getElementById("comment_input");
  const commentValue = comment.value;
  const noResultBox = document.getElementsByClassName("no_result_box");
  commentEntries = { commentValue, date };
  diaryEntries[index].commentList.push({ ...commentEntries });
  localStorage.setItem("diaryList", JSON.stringify(diaryEntries));
  comment.value = null;
  if (noResultBox.length) {
    noResultBox[0].style = "display: none";
  }
  createCommentHtml(commentEntries);
};

const setupCommentInput = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDate()).padStart(2, 0);
  const commentRegistrationDate = `[${year}. ${month}. ${day}]`;
  addComment(commentRegistrationDate);
};

diaryEntries = diaryDetailContentList;
diaryDetailContentList.map((e, i) => {
  e.id === id ? (index = i) : undefined;
});

const currentDiaryComments = diaryDetailContent.commentList;
if (currentDiaryComments.length === 0) {
  document.getElementById(
    "comments_container_box"
  ).innerHTML += `<div class="no_result_box">등록된 회고가 없습니다.</div>`;
} else {
  currentDiaryComments.map((comment) => {
    createCommentHtml(comment);
  });
}

const deleteDiary = () => {
  diaryDetailContentList.splice(index, 1);
  localStorage.setItem("diaryList", JSON.stringify(diaryDetailContentList));
  alert("삭제 되었습니다.");
  window.location.href = "./diary.html";
};

const handleContentCopy = () => {
  const copyToast = document.getElementById("copy_toast");
  const copyContent = document.getElementById("copyContent").innerText;
  navigator.clipboard.writeText(copyContent);
  copyToast.style = "display: block";
  setTimeout(() => {
    copyToast.style = "display: none";
  }, 2000);
};

const confirmDeleteDiary = (event) => {
  event.preventDefault();
  deleteId = event.target.className;
  onTriggerModal("confirm_delete_diary_modal_detail_page");
};

createHtml(diary);
