const queryString = location.search;
const part = new URLSearchParams(queryString);
const id = part.get("id");
const diaryDetailContent = JSON.parse(localStorage.getItem(id));

const diaryDetailContentList = {
  id: diaryDetailContent.id,
  mood: diaryDetailContent.mood,
  date: diaryDetailContent.date,
  color: diaryDetailContent.color,
  title: diaryDetailContent.title,
  content: diaryDetailContent.content,
  imageName: diaryDetailContent.imageName,
};

const createHtml = (diaryEntry) => {
  const diaryDetailCard = `
    <div class="title_frame">
      <div class="title">${diaryEntry.title}</div>
      <div class="emotion_date_frame">
        <div class="emotion">
          <img src="./image/${diaryEntry.imageName}_s.png" width="32px" />
          <div class="mood_text">${diaryEntry.mood}</div>
        </div>
        <div class="date_frame">
          <div class="date">${diaryEntry.mood}</div>
          <div class="write">작성</div>
        </div>
      </div>
    </div>
    <div class="content_frame">
      <div class="content_label">내용</div>
      <div class="content">${diaryEntry.content}</div>
    </div>
    <div class="modification_frame">
      <button class="modification_Btn">수정</button>
    </div>
  `;

  const mainFrame = document.getElementById("main_frame");
  mainFrame.innerHTML = diaryDetailCard;
  const main = document.getElementById("main");
  return main.appendChild(mainFrame);
};

createHtml(diaryDetailContentList);
