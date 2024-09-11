const moodList = document.getElementById("mood_list");
const registerButton = document.querySelector("button");
const diaryContent = document.getElementById("diaryContent");
const photoFilterList = document.getElementById("photo_filter_list");

let deleteId;
let diaryEntry = {};
let paginatedDiaryData;
let currentFilteredMood = "";
let currentFilteredPhoto = "";
let storedDiaryList = JSON.parse(localStorage.getItem("diaryList")) || [];
paginatedDiaryData = storedDiaryList;

const clearDiaryInputs = () => {
  const getMood = document.getElementsByName("mood");
  const text = document.getElementsByClassName("diary_title_window")[0];
  const textarea = document.getElementsByClassName("diary_contents_window")[0];
  text.value = null;
  textarea.value = null;
  [...getMood].map((e) => (e.checked = false));
};
const appendDiaryEntry = (diaryCard) => {
  const diaryEntryContainer = document.querySelectorAll(
    "#diary_entry_container"
  );
  const lastDiaryEntryContainer =
    diaryEntryContainer[diaryEntryContainer.length - 1];

  if (
    article.children.length === 0 ||
    lastDiaryEntryContainer.children.length === 4
  ) {
    const diaryEntryContainer = document.createElement("div");
    diaryEntryContainer.className = "diary_entry_container";
    diaryEntryContainer.id = "diary_entry_container";
    diaryEntryContainer.innerHTML = diaryCard;

    return article.appendChild(diaryEntryContainer);
  } else {
    return (lastDiaryEntryContainer.innerHTML += diaryCard);
  }
};

const handleDiaryEntryBasedOnMood = (diaryCard, diaryEntry) => {
  if (currentFilteredMood === "" || currentFilteredMood === diaryEntry.mood) {
    appendDiaryEntry(diaryCard);
  } else {
    appendDiaryEntry(diaryCard);
  }
};

const getLastPageIndex = () => {
  generatePageNumbers();
  const pageNumber = document.getElementsByClassName("page_number");
  const lastPageNumber = pageNumber[pageNumber.length - 1];
  lastPageNumber.click();
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
            <div id="delete_button" onclick="confirmDeleteDiary(event)">
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
  paginatedDiaryData.push({ ...diaryEntry });
  renderInitialDiaryEntries(paginatedDiaryData);
  getLastPageIndex();
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
  clearDiaryInputs();
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

const registerDiary = (event) => {
  event.preventDefault();
  const text = document.getElementsByClassName("diary_title_window")[0];
  const textarea = document.getElementsByClassName("diary_contents_window")[0];
  const getMood = document.getElementsByName("mood");
  const mood = [...getMood].filter((e) => e.checked === true);
  const isAllFieldsFilled =
    text.value === "" || textarea.value === "" || mood.length === 0;
  isAllFieldsFilled
    ? alert("다이어리를 등록하려면 모든 항목을 입력해야 합니다.")
    : triggerModal("diary_registration_modal");
};

const renderInitialDiaryEntries = (diaryList) => {
  diaryList.slice(0, 12).map((diary) => {
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
};

const handlePageClick = (event) => {
  [...document.getElementsByClassName("page_number")].map((e) =>
    e.setAttribute("page", "none")
  );
  event.target.setAttribute("page", "clickedPage");
  const pageNumber = event.target.innerText;
  const begin = (pageNumber - 1) * 12;
  const end = pageNumber * 12;
  const article = document.getElementById("article");
  article.innerHTML = "";
  paginatedDiaryData.slice(begin, end).map((diary) => createHtml(diary));
  upScroll();
};

const generatePageNumbers = () => {
  const pageNumberList = Math.ceil(paginatedDiaryData.length / 12);
  const pageNumberButtonList = Array(pageNumberList)
    .fill(1)
    .map((n, idx) => {
      return `<button onclick="handlePageClick(event)" class="page_number">${
        n + idx
      }</button>`;
    })
    .join("");
  document.getElementById("page_number_list").innerHTML = pageNumberButtonList;
  document
    .getElementsByClassName("page_number")[0]
    .setAttribute("page", "clickedPage");
};

const setDropdownLabel = (selectedMood) => {
  let dropdownName;
  selectedMood.includes("형")
    ? (dropdownName = "photo_dropdown")
    : (dropdownName = "mood_dropdown");
  const dropdownLabel = document.getElementById(dropdownName);
  dropdownLabel.style.cssText = `--boxText: "${selectedMood}"`;
};

const updateDiaryList = (diaryList, selectedMood) => {
  const article = document.getElementById("article");
  article.innerHTML = "";
  renderInitialDiaryEntries(diaryList);
  selectedMood !== undefined ? setDropdownLabel(selectedMood) : undefined;
};

const getDiariesByMood = (selectedMood) => {
  const filteredDiaries = storedDiaryList.filter((diary) =>
    diary.mood.includes(selectedMood)
  );
  paginatedDiaryData = filteredDiaries;
  if (selectedMood === "전체") {
    document.getElementById("article").innerHTML = "";
    paginatedDiaryData = storedDiaryList;
    updateDiaryList(paginatedDiaryData, selectedMood);
    generatePageNumbers();
  } else {
    if (filteredDiaries.length === 0) {
      alert("선택한 감정의 다이어리가 없습니다. 다른 감정을 선택해보세요.");
    } else {
      updateDiaryList(paginatedDiaryData, selectedMood);
      generatePageNumbers();
    }
  }
};

const onClickMood = (event) => {
  const selectedMood = event.target.closest("li").innerText;
  currentFilteredMood = selectedMood;
  getDiariesByMood(currentFilteredMood);
  upScroll();
};

const getPhotoByType = (selectedPhotoType) => {
  const dogImages = document.querySelectorAll(".dogImage");
  switch (selectedPhotoType) {
    case "기본형": {
      [...dogImages].map((dogImage) => {
        dogImage.style = "aspect-ratio:  1 / 1;";
      });
      break;
    }
    case "가로형": {
      [...dogImages].map((dogImage) => {
        dogImage.style = "aspect-ratio:  4 / 3;";
      });
      break;
    }
    case "세로형": {
      [...dogImages].map((dogImage) => {
        dogImage.style = "aspect-ratio:  3 / 4;";
      });
      break;
    }
  }
};

const onClickPhoto = (e) => {
  const selectedPhotoType = e.target.innerText;
  currentFilteredPhoto = selectedPhotoType;
  getPhotoByType(selectedPhotoType);
};

const deleteDiaryEntry = () => {
  let index;
  const diaryList = JSON.parse(localStorage.getItem("diaryList"));
  diaryList.map((e, i) => {
    e.id === deleteId ? (index = i) : undefined;
  });
  const deleteData = storedDiaryList[index];
  storedDiaryList.splice(index, 1);
  localStorage.setItem("diaryList", JSON.stringify(storedDiaryList));
  const newDiaryList = paginatedDiaryData.filter((e) => e.id !== deleteData.id);
  updateDiaryList(newDiaryList);
  generatePageNumbers();
  closeSingleModal("confirm_delete_diary_modal");
};

const confirmDeleteDiary = (event) => {
  event.preventDefault();
  deleteId = event.target.className;
  triggerModal("confirm_delete_diary_modal");
};

const upScroll = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const focusActiveModal = (modal) => {
  switch (modal) {
    case "aside_layout":
      document.getElementById("check_happy").focus();
      break;
    case "diary_cancel_modal":
      document.getElementById("cancelRegistrationBtn").focus();
      break;
    case "diary_registration_modal": {
      diaryEntry.commentList = [];
      getContent(diaryEntry);
      document.getElementById("confirmRegistration").focus();
      break;
    }
    case "confirm_delete_diary_modal": {
      document.getElementById("deleteDiaryBtn").focus();
      break;
    }
  }
};

const triggerModal = (modal) => {
  upScroll();
  document.body.style.cssText = "overflow-y: hidden;";
  document.getElementById(modal).style = "display: flex;";
  focusActiveModal(modal);
};

const closeAllModals = (modal) => {
  document.getElementById(modal).style = "display: none;";
  document.getElementById("aside_layout").style = "display: none;";
  document.body.style.cssText = "overflow-y: none;";
  clearDiaryInputs();
};

const closeSingleModal = (modal) => {
  document.getElementById(modal).style = "display: none;";
  document.body.style.cssText = "overflow-y: none;";
};

window.addEventListener("click", (event) => {
  const className = event.target.className;
  const id = event.target.id;
  if (className === "aside_layout" || className === "confirm_modal_layout") {
    event.target.id != "diary_cancel_modal"
      ? closeAllModals(id)
      : closeSingleModal(id);
  }
});

const fetchAndDisplayPhotos = () => {
  const dogImage = document.querySelectorAll(".dogImage");
  fetch("https://dog.ceo/api/breeds/image/random/10").then((result) => {
    result.json().then((object) => {
      const skeleton = document.querySelectorAll("#skeleton");
      const dogImages = object.message;
      dogImages.map((e, i) => {
        skeleton[i].style = "display: none";
        dogImage[i].src = e;
      });
    });
  });
};

const showLoadingSkeleton = () => {
  const photoGallery = document.getElementById("photo_gallery");
  photoGallery.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    photoGallery.innerHTML += `
      <div>
        <img src"#" class="dogImage">
        <div id="skeleton"></div>
        </img>
      </div>
    `;
  }
  fetchAndDisplayPhotos();
};

let photoTimer = null;
window.addEventListener("scroll", () => {
  const scrollPercent =
    document.documentElement.scrollTop /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);
  if (scrollPercent < 0.9) return;
  if (photoTimer !== null) return;

  showLoadingSkeleton();
  fetchAndDisplayPhotos();

  photoTimer = setTimeout(() => {
    photoTimer = null;

    const scrollPercent =
      document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);

    if (scrollPercent === 1) {
      fetchAndDisplayPhotos();
    }
  }, 1000);
});

const toggleDiaryPhotoView = (viewType) => {
  const diaryStorageMenuStyle = document.getElementById("diary_storage_menu");
  const photoStorageMenuStyle = document.getElementById("photo_storage_menu");
  const noneStyle = "color: var(--Gray-Gray-400, #ABABAB); border: none";
  const blockStyle = "color: #000; border-bottom: 2px solid black;";
  const diaryStorage = document.getElementById("diary_storage");
  const photoStorage = document.getElementById("photo_storage");

  switch (viewType) {
    case "diaryStorage": {
      document.getElementById("article").innerHTML = "";
      renderInitialDiaryEntries(storedDiaryList);
      photoStorage.style = "display: none";
      diaryStorage.style = "display: block";
      photoStorageMenuStyle.style = noneStyle;
      diaryStorageMenuStyle.style = blockStyle;
      break;
    }
    case "photoStorage": {
      diaryStorage.style = "display: none";
      photoStorage.style = "display: block";
      diaryStorageMenuStyle.style = noneStyle;
      photoStorageMenuStyle.style = blockStyle;
      showLoadingSkeleton();
      break;
    }
  }
};

let timer;
const onSearch = (event) => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    const searchQuery = event.target.value;
    const searchResults = paginatedDiaryData.filter((e) =>
      e.title.includes(searchQuery)
    );
    document.getElementById("article").innerHTML = "";
    console.log(searchResults.length);
    if (searchResults.length === 0) {
      document.getElementById(
        "article"
      ).innerHTML += `<div class="no_search_result_box"><p class="no_search_result">"${searchQuery}"</p>에 대한 검색결과가 없습니다.</div>`;
    } else {
      searchResults.map((diary) => {
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
    }
  }, 1000);
};

const darkModeToggle = (event) => {
  const mode = document.documentElement;
  event.target.checked
    ? mode.setAttribute("mode", "dark")
    : mode.setAttribute("mode", "light");
};

renderInitialDiaryEntries(storedDiaryList);
generatePageNumbers();
moodList.addEventListener("click", onClickMood);
photoFilterList.addEventListener("click", onClickPhoto);
