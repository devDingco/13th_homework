let deleteId;
let diaryEntry = {};
let currentFilteredMood = "전체";
let storedDiaryList = JSON.parse(localStorage.getItem("diaryList")) || [];
let paginatedDiaryData = storedDiaryList;
let entirePageNumberList;
let currentPage = 1;
let lastPage;

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
    diaryEntryContainer.id = "diary_entry_container";
    diaryEntryContainer.innerHTML = diaryCard;

    return article.appendChild(diaryEntryContainer);
  } else {
    return (lastDiaryEntryContainer.innerHTML += diaryCard);
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

  appendDiaryEntry(diaryCard);
};

const getLastPageIndex = () => {
  generatePageNumbers();
  currentPage = 1;
  const clickNumber = Math.ceil(entirePageNumberList.length / 5) - currentPage;
  for (let i = 0; i < clickNumber; i++) {
    document.querySelectorAll(".go_to_page_set")[1].click();
  }
  const pageNumber = document.getElementsByClassName("page_number");
  const lastPageNumber = pageNumber[pageNumber.length - 1];
  lastPageNumber.click();
};

const handleDiaryEntryBasedOnMood = (mood) => {
  if (currentFilteredMood === mood) {
    renderFirstPage(paginatedDiaryData);
    getLastPageIndex();
  } else {
    const article = document.getElementById("article");
    article.innerHTML = "";
    paginatedDiaryData = storedDiaryList;
    renderFirstPage(paginatedDiaryData);
    getLastPageIndex();
    setDropdownLabel("전체");
  }
};

const saveDiaryEntry = (diaryEntry) => {
  storedDiaryList.push({ ...diaryEntry });
  localStorage.setItem("diaryList", JSON.stringify(storedDiaryList));
  currentFilteredMood !== "전체"
    ? paginatedDiaryData.push({ ...diaryEntry })
    : "";
  handleDiaryEntryBasedOnMood(diaryEntry.mood);
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

const getFontColorAndImageName = (diaryEntry, checkedMoodId) => {
  const coverName = checkedMoodId.split(`_`)[1];
  const fontColor = `${coverName}_emotion_font_color`;
  diaryEntry.imageName = coverName;
  diaryEntry.color = fontColor;
  getDate(diaryEntry);
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
  getFontColorAndImageName(diaryEntry, checkedMoodId);
};

const getId = (diaryEntry) => {
  const uuid = String(Math.floor(Math.random() * 1000000)).padStart(6, 0);
  diaryEntry.id = uuid;
  getMood(diaryEntry);
};

const getDiaryTitleAndContent = (diaryEntry) => {
  const diaryTitle = document.getElementById("diary_title_window").value;
  const diaryContent = document.getElementById("diary_contents_window").value;
  diaryEntry.title = diaryTitle;
  diaryEntry.content = diaryContent;
  getId(diaryEntry);
};

const registerDiary = (event) => {
  event.preventDefault();
  onTriggerModal("diary_registration_modal");
};

const renderFirstPage = (diaryList) => {
  document.querySelector(".page_list_box").style.display = "flex";
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

const navigateToPageSet = () => {
  const begin = (currentPage - 1) * 5;
  const end = currentPage * 5;
  const page = entirePageNumberList.slice(begin, end).join("");
  document.getElementById("page_number_list").innerHTML = page;
  document
    .getElementsByClassName("page_number")[0]
    .setAttribute("page", "clickedPage");
  document.getElementsByClassName("page_number")[0].click();
};

const checkCurrentPageSet = (event) => {
  const prevPageBtn = document.getElementById("prev-page-btn");
  const nextPageBtn = document.getElementById("next-page-btn");
  const pageSet = Math.ceil(entirePageNumberList.length / 5);
  if (event === undefined) {
    currentPage > 1
      ? (prevPageBtn.style = "display: block")
      : (prevPageBtn.style = "display: none");
    pageSet <= currentPage
      ? (nextPageBtn.style = "display: none")
      : (nextPageBtn.style = "display: block");
  } else {
    const isNextClicked = event.target.outerHTML.includes("right");
    isNextClicked ? (currentPage += 1) : (currentPage -= 1);
    currentPage > 1
      ? (prevPageBtn.style = "display: block")
      : (prevPageBtn.style = "display: none");
    pageSet <= currentPage
      ? (nextPageBtn.style = "display: none")
      : (nextPageBtn.style = "display: block");
    navigateToPageSet();
  }
};

const generatePageNumbers = () => {
  if (paginatedDiaryData.length === 0) {
    document.getElementById(
      "article"
    ).innerHTML += `<div class="no_result_box">등록된 일기가 없습니다.</div>`;
    document.querySelector(".page_list_box").style.display = "none";
  }
  const pageNumberList = Math.ceil(paginatedDiaryData.length / 12);
  const pageNumberButtonList = Array(pageNumberList)
    .fill(1)
    .map((n, idx) => {
      return `<button onclick="handlePageClick(event)" class="page_number">${
        n + idx
      }</button>`;
    });
  entirePageNumberList = pageNumberButtonList;
  document.getElementById("page_number_list").innerHTML = pageNumberButtonList
    .slice(0, 5)
    .join("");
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

const updateDiaryList = (selectedMood) => {
  const article = document.getElementById("article");
  article.innerHTML = "";
  renderFirstPage(paginatedDiaryData);
  generatePageNumbers();
  selectedMood !== undefined ? setDropdownLabel(selectedMood) : "";
};

const getDiariesByMood = (selectedMood) => {
  const filteredDiaries = storedDiaryList.filter((diary) =>
    diary.mood.includes(selectedMood)
  );
  if (selectedMood === "전체") {
    document.getElementById("article").innerHTML = "";
    paginatedDiaryData = storedDiaryList;
    updateDiaryList(selectedMood);
    currentPage = 1;
  } else {
    if (filteredDiaries.length === 0) {
      document.getElementById("article").innerHTML = "";
      document.getElementById(
        "article"
      ).innerHTML += `<div class="no_result_box">등록된 일기가 없습니다.</div>`;
      document.querySelector(".page_list_box").style.display = "none";
    } else {
      paginatedDiaryData = filteredDiaries;
      updateDiaryList(selectedMood);
      currentPage = 1;
    }
  }
};

const onClickMood = (event) => {
  const selectedMood = event.target.closest("li").innerText;
  currentFilteredMood = selectedMood;
  currentPage = 1;
  getDiariesByMood(currentFilteredMood);
  checkCurrentPageSet();
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

const onClickPhoto = (event) => {
  const selectedPhotoType = event.target.innerText;
  getPhotoByType(selectedPhotoType);
};

const deleteDiaryEntry = () => {
  let index;
  const diaryList = JSON.parse(localStorage.getItem("diaryList"));
  for (let i = 0; i < diaryList.length; i++) {
    if (diaryList[i].id === deleteId) {
      index = i;
      break;
    }
  }

  storedDiaryList.splice(index, 1);
  localStorage.setItem("diaryList", JSON.stringify(storedDiaryList));
  paginatedDiaryData = storedDiaryList;
  updateDiaryList();
  onCloseSingleModal("confirm_delete_diary_modal");
};

const confirmDeleteDiary = (event) => {
  event.preventDefault();
  deleteId = event.target.className;
  onTriggerModal("confirm_delete_diary_modal");
};

const validateDiaryInputCompletion = () => {
  const text = document.getElementById("diary_title_window");
  const textarea = document.getElementById("diary_contents_window");

  const validate = () => {
    if (!(text.value && textarea.value)) {
      document.getElementById("register_button").disabled = true;
      document.getElementById("register_button").style =
        "color: #f2f2f2; background-color: #c7c7c7;";
    } else {
      document.getElementById("register_button").disabled = false;
      document.getElementById("register_button").style =
        "color: #F2F2F2; background-color: #000;";
    }
  };

  text.addEventListener("keyup", validate);
  textarea.addEventListener("keyup", validate);
};

const clearDiaryInputs = () => {
  const text = document.getElementById("diary_title_window");
  const textarea = document.getElementById("diary_contents_window");
  document.getElementById("check_surprise").checked = "checked";
  text.value = null;
  textarea.value = null;
};

const closeAllModals = (modal) => {
  document.getElementById(modal).style = "display: none;";
  document.getElementById("aside_layout").style = "display: none;";
  document.body.style.cssText = "overflow-y: none;";
  clearDiaryInputs();
};

window.addEventListener("click", (event) => {
  const className = event.target.className;
  const id = event.target.id;
  if (
    className === "aside_layout" ||
    className === "confirm_modal_layout" ||
    className === "confirm_delete_diary_modal_layout"
  ) {
    event.target.id !== "diary_cancel_modal"
      ? closeAllModals(id)
      : onCloseSingleModal(id);
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
      currentPage = 1;
      getDiariesByMood("전체");
      checkCurrentPageSet();
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
      setDropdownLabel("기본형");
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
    paginatedDiaryData = searchResults;
    document.getElementById("article").innerHTML = "";
    if (searchResults.length === 0) {
      document.getElementById(
        "article"
      ).innerHTML += `<div class="no_result_box"><p class="no_search_result">"${searchQuery}"</p>에 대한 검색결과가 없습니다.</div>`;
      document.querySelector(".page_list_box").style.display = "none";
    } else {
      renderFirstPage(searchResults);
      generatePageNumbers();
      checkCurrentPageSet();
    }
    document.getElementById("search").value = null;
    paginatedDiaryData = storedDiaryList;
  }, 1000);
};

const darkModeToggle = (event) => {
  const mode = document.documentElement;
  event.target.checked
    ? mode.setAttribute("mode", "dark")
    : mode.setAttribute("mode", "light");
};

renderFirstPage(storedDiaryList);
generatePageNumbers();
