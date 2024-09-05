const moodList = document.getElementById("mood_list");
const registerButton = document.querySelector("button");
const diaryContent = document.getElementById("diaryContent");

let diaryEntry = {};
let currentFilteredMood = "";
let storedDiaryList = JSON.parse(localStorage.getItem("diaryList")) || [];

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const filterCheckbox = document.getElementById("filterCheckbox");

  scroll > 0
    ? (filterCheckbox.style = "background-color: #1C1C1C; color: #FFF")
    : (filterCheckbox.style = "background-color: #FFF");
});

const clearDiaryInputs = (checkedMoodId) => {
  const check = document.getElementById(`${checkedMoodId}`);
  const text = document.getElementsByClassName("diary_title_window")[0];
  const textarea = document.getElementsByClassName("diary_contents_window")[0];
  text.value = null;
  textarea.value = null;
  check.checked = false;
};

const appendDiaryEntry = (diaryCard) => {
  const diaryEntryContainer = document.querySelectorAll(
    "#diary_entry_container"
  );

  if (
    article.children.length == 0 ||
    diaryEntryContainer[diaryEntryContainer.length - 1].children.length == 4
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

const handleDiaryEntryBasedOnMood = (diaryCard, diaryEntry) => {
  if (currentFilteredMood == "") {
    appendDiaryEntry(diaryCard);
  } else if (currentFilteredMood == diaryEntry.mood) {
    appendDiaryEntry(diaryCard);
  } else {
    window.location.href = "./diary.html";
    appendDiaryEntry(diaryCard);
  }
};

const createHtml = (diaryEntry) => {
  const diaryCard = `
    <a href="./diary-detail.html?id=${diaryEntry.id}#comments_container_box" class="diary_detail">
      <div class="diary_entry">
          <div class="diary_entry_inner">
            <img
              class="diary_cover"
              src="./image/${diaryEntry.imageName}.png"
            />
            <div id="delete_button" onclick="deleteDiaryEntry(event)">
            <img
              class="${diaryEntry.id}"
              src="./image/delete_button.png"
            />
            </div>
          </div>
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

  handleDiaryEntryBasedOnMood(diaryCard, diaryEntry);
};

const saveDiaryEntry = (diaryEntry) => {
  storedDiaryList.push({ ...diaryEntry });
  localStorage.setItem("diaryList", JSON.stringify(storedDiaryList));
  createHtml(diaryEntry);
};

const getDate = (diaryEntry) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDate()).padStart(2, 0);
  const registrationDate = `${year}. ${month}. ${day}`;
  diaryEntry.date = registrationDate;
  saveDiaryEntry(diaryEntry);
};

const getFontColor = (diaryEntry, coverName) => {
  const fontColor = `${coverName}_emotion_font_color`;
  diaryEntry.color = fontColor;
  getDate(diaryEntry);
};

const getImageName = (diaryEntry, checkedMoodId) => {
  const coverName = checkedMoodId.split(`_`)[1];
  diaryEntry.imageName = coverName;
  getFontColor(diaryEntry, coverName);
};

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

  diaryEntry.mood = checkedMood;
  getImageName(diaryEntry, checkedMoodId);
  clearDiaryInputs(checkedMoodId);
};

const getId = (diaryEntry) => {
  const uuid = String(Math.floor(Math.random() * 1000000)).padStart(6, 0);
  diaryEntry.id = uuid;
  getMood(diaryEntry);
};

const getTitle = (diaryEntry) => {
  const diaryTitle =
    document.getElementsByClassName("diary_title_window")[0].value;
  diaryEntry.title = diaryTitle;
  getId(diaryEntry);
};

const getContent = (diaryEntry) => {
  const diaryContent = document.getElementsByClassName(
    "diary_contents_window"
  )[0].value;
  diaryEntry.content = diaryContent;
  getTitle(diaryEntry);
};

const registerDiary = () => {
  const text = document.getElementsByClassName("diary_title_window")[0];
  const textarea = document.getElementsByClassName("diary_contents_window")[0];
  const getMood = document.getElementsByName("mood");
  const mood = [...getMood].filter((e) => e.checked == true);
  if (text.value == "" || textarea.value == "" || mood.length == 0) {
    alert("다이어리를 등록하려면 모든 항목을 입력해야 합니다.");
  } else {
    diaryEntry.commentList = [];
    getContent(diaryEntry);
  }
};

storedDiaryList.map((diary) => {
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

const updateDiaryList = (diaryList) => {
  const article = document.getElementById("article");
  article.innerHTML = "";
  diaryList.map((diary) => createHtml(diary));
};

const getDiariesByMood = (selectedMood) => {
  const filteredDiaries = storedDiaryList.filter(
    (diary) => diary.mood == selectedMood
  );

  if (filteredDiaries.length == 0) {
    return alert(
      "선택한 감정의 다이어리가 없습니다. 다른 감정을 선택해보세요."
    );
  }

  updateDiaryList(filteredDiaries);
};

const onClickMood = (e) => {
  const selectedMood = e.target.innerText;
  currentFilteredMood = selectedMood;
  getDiariesByMood(selectedMood);
};

const deleteDiaryEntry = (event) => {
  event.preventDefault();
  let index;
  const id = event.target.className;
  const diaryList = JSON.parse(localStorage.getItem("diaryList"));
  diaryList.map((e, i) => {
    if (e.id == id) index = i;
  });
  storedDiaryList.splice(index, 1);
  localStorage.setItem("diaryList", JSON.stringify(storedDiaryList));
  updateDiaryList(storedDiaryList);
};

const upScroll = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const triggerModal = (modal) => {
  document.getElementById(modal).style = "display: flex;";
  if (modal == "diary_registration_modal") {
    registerDiary();
  }
};

const closeModal = (modal) => {
  document.getElementById(modal).style = "display: none;";
  document.getElementById("aside_layout").style = "display: none;";
};

const continueWriting = () => {
  document.getElementById("diary_cancel_modal").style = "display: none;";
};

moodList.addEventListener("click", onClickMood);
