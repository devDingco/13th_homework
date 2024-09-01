const queryString = location.search;
const part = new URLSearchParams(queryString);
const id = part.get("id");
const diaryDetailContentList = JSON.parse(localStorage.getItem("diaryList"));
const diaryDetailContent = diaryDetailContentList.filter((e) => e.id == id)[0];

const diary = {
  id: diaryDetailContent.id,
  mood: diaryDetailContent.mood,
  date: diaryDetailContent.date,
  color: diaryDetailContent.color,
  title: diaryDetailContent.title,
  content: diaryDetailContent.content,
  imageName: diaryDetailContent.imageName,
};

const createHtml = (diary) => {
  const diaryDetailCard = `
    <a href="./diary-edit.html?id=${diary.id}" class="diary_edit">
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
        <div class="content">${diary.content}</div>
      </div>
      <div class="modification_frame">
        <button class="modification_Btn">수정</button>
      </div>
    </a>
  `;

  const mainFrame = document.getElementById("main_frame");
  mainFrame.innerHTML = diaryDetailCard;
  const main = document.getElementById("main");
  return main.appendChild(mainFrame);
};

createHtml(diary);
