const registerButton = document.querySelector("button");
const diaryContent = document.getElementById("diaryContent");
let storedDiaryList = JSON.parse(localStorage.getItem("diaryList")) || [];
let diaryEntry = {};

const createHtml = (diaryEntry) => {
  const diaryCard = `
    <a href="./diary-detail.html?id=${diaryEntry.id}" class="diary_detail">
      <div class="diary_entry">
          <img
            class="diary_cover"
            src="./image/${diaryEntry.imageName}.png"
            width="774px"
          />
          <div class="diary_entry_summary">
            <div class="emotion_date_info">
              <div class="${diaryEntry.color}">${diaryEntry.mood}</div>
              <div class="date">${diaryEntry.date}</div>
            </div>
            <div class="diary_title_area">
              ${diaryEntry.title}
            </div>
          </div>
      </div>
    </a>
    `;

  const diaryEntryContainer = document.querySelectorAll(
    "#diary_entry_container"
  );
  const article = document.getElementById("article");

  if (
    article.children.length == 0 ||
    diaryEntryContainer[diaryEntryContainer.length - 1].children.length == 2
  ) {
    const diaryEntryContainer = document.createElement("div");
    diaryEntryContainer.className = "diary_entry_container";
    diaryEntryContainer.id = "diary_entry_container";
    diaryEntryContainer.innerHTML = diaryCard;

    return article.appendChild(diaryEntryContainer);
  } else {
    return (diaryEntryContainer[diaryEntryContainer.length - 1].innerHTML +=
      diaryCard);
  }
};

const saveDiaryEntry = (diaryEntry) => {
  storedDiaryList.push({...diaryEntry});
  localStorage.setItem("diaryList", JSON.stringify(storedDiaryList));
  createHtml(diaryEntry);
}

const getDate = (diaryEntry) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDate()).padStart(2, 0);
  const registrationDate = `${year}. ${month}. ${day}`;
  diaryEntry.date = registrationDate
  saveDiaryEntry(diaryEntry)
}

const getImageNameAndFontColor = (checkedMoodId) => { 
  const coverName = checkedMoodId.split(`_`)[1];
  const fontColor = `${coverName}_emotion_font_color`;
  diaryEntry.imageName = coverName
  diaryEntry.color = fontColor
  getDate(diaryEntry)
}

const getMood = (diaryEntry) => {
  let checkedMood;
  let checkedMoodId;
  const getMood = document.getElementsByName("mood");

  getMood.forEach((mood) => {
    if (mood.checked) {
      checkedMood = mood.nextElementSibling.innerText;
      checkedMoodId = mood.id;
    }
  });
  diaryEntry.mood = checkedMood
  getImageNameAndFontColor(checkedMoodId)
}

const getId = (diaryEntry) => {
  const uuid = String(Math.floor(Math.random() * 1000000)).padStart(6, 0);
  diaryEntry.id = uuid;
  getMood(diaryEntry)
}

const getTitleAndContent = (diaryEntry) => {
  const diaryTitle =
  document.getElementsByClassName("diary_title_window")[0].value;
const diaryContent = document.getElementsByClassName(
  "diary_contents_window"
)[0].value;
  diaryEntry.title = diaryTitle
  diaryEntry.content = diaryContent
  getId(diaryEntry)
}

const registerDiary = () => {
  getTitleAndContent(diaryEntry)
};

storedDiaryList.forEach((diary) => {
  const storedDiary = {
    id: diary.id,
    mood: diary.mood,
    date: diary.date,
    color: diary.color,
    title: diary.title,
    content: diary.content,
    imageName: diary.imageName,
  };
  createHtml(storedDiary);
});

registerButton.addEventListener("click", registerDiary);
