let diaryLocalStorage = localStorage.getItem("다이어리카드배열");

if (diaryLocalStorage === null) {
  diaryLocalStorage = [];
} else {
  diaryLocalStorage = JSON.parse(localStorage.getItem("다이어리카드배열"));
}

let diaryCardArr = diaryLocalStorage;
let currentArr = diaryCardArr;
let clickPageNumber = 1;
let lastPage = Math.ceil(diaryCardArr.length / 12);

window.onload = () => {
  createPageNumberButton();
  pageNumberRendering(clickPageNumber, diaryCardArr);
};

const registerButton = () => {
  document.getElementById("modal_group2").style = "display:block";
  const diaryCardObject = {};
  let emotionText;

  const radioArr = document.getElementsByName("emotion");

  radioArr.forEach((el) => {
    if (el.checked) {
      emotionText = el.value;
    }
  });

  diaryCardObject.emotionText = emotionText;
  diaryCardObject.title = document.getElementById("titleBox_input").value;
  diaryCardObject.textarea = document.getElementById(
    "contentBox_textarea"
  ).value;
  diaryCardObject.image = getImage(diaryCardObject.emotionText);
  diaryCardObject.date = createDate();
  diaryCardObject.remembrance = [];

  diaryCardArr.push(diaryCardObject);
  const diaryCardJson = JSON.stringify(diaryCardArr);
  localStorage.setItem("다이어리카드배열", diaryCardJson);

  diaryCardArr = JSON.parse(localStorage.getItem("다이어리카드배열"));
  currentArr = diaryCardArr;
  clickPageNumber = 1;
  lastPage = Math.ceil(diaryCardArr.length / 12);
  createPageNumberButton(currentArr);
  pageNumberRendering(clickPageNumber, currentArr);
};

//날짜 함수
const createDate = () => {
  const date = new Date();
  const getYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDate = date.getDate();
  const writeDate = getYear + ". " + getMonth + ". " + getDate;

  return writeDate;
};

const getImage = (emotionText) => {
  let imageSrc;

  switch (emotionText) {
    case "행복해요":
      imageSrc = "./assets/행복해요 (m).png";
      break;
    case "슬퍼요":
      imageSrc = "./assets/슬퍼요 (m).png";
      break;
    case "화나요":
      imageSrc = "./assets/화나요 (m).png";
      break;
    case "놀랐어요":
      imageSrc = "./assets/놀랐어요 (m).png";
      break;
    case "기타":
      imageSrc = "./assets/기타 (m).png";
      break;
  }
  return imageSrc;
};

const diaryFiltering = (event) => {
  const selection = event.target.value;
  document.getElementById("diary_select").click();
  let filterArr = [];

  switch (selection) {
    case "selectAll": {
      filterArr = diaryCardArr;
      break;
    }
    case "selectHappy": {
      filterArr = diaryCardArr.filter((el) => el.emotionText === "행복해요");
      break;
    }
    case "selectSad": {
      filterArr = diaryCardArr.filter((el) => el.emotionText === "슬퍼요");
      break;
    }
    case "selectSurprised": {
      filterArr = diaryCardArr.filter((el) => el.emotionText === "놀랐어요");
      break;
    }
    case "selectAngry": {
      filterArr = diaryCardArr.filter((el) => el.emotionText === "화나요");
      break;
    }
    case "selectEtc": {
      filterArr = diaryCardArr.filter((el) => el.emotionText === "기타");
      break;
    }
  }
  currentArr = filterArr;

  clickPageNumber = 1;
  lastPage = Math.ceil(currentArr.length / 12);
  createPageNumberButton(currentArr);
  pageNumberRendering(clickPageNumber, currentArr);
};

window.onscroll = () => {
  const scrollY = window.scrollY;

  if (scrollY > 0) {
    document.getElementById("diary_select").style =
      "background-color: black; color: white;";
  }
};

const upToButton = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openModal = () => {
  document.getElementById("modal_group").style = "display: block;";
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  document.getElementById("modal_group").style = "display: none;";
  document.getElementById("modal_group2").style = "display: none";
  document.body.style.overflow = "auto";
};

const checkClose = () => {
  document.getElementById("modal_group3").style = "display: block;";
};

const continueWrite = () => {
  document.getElementById("modal_group3").style = "display: none;";
};

const realCancelButton = () => {
  document.getElementById("modal_group").style = "display: none;";
  document.getElementById("modal_group3").style = "display: none";
  document.body.style.overflow = "auto";
};

const deleteDiaryCard = (event, index) => {
  event.preventDefault();
  document.getElementById("modal_group4").setAttribute("data-index", index);
  document.getElementById("modal_group4").style = "display: block";
};

const deleteDiaryCancel = () => {
  document.getElementById("modal_group4").style = "display: none;";
};

const realDeleteDiary = () => {
  const diaryCardIndex = document
    .getElementById("modal_group4")
    .getAttribute("data-index");
  const editDiaryCard = JSON.parse(localStorage.getItem("다이어리카드배열"));
  editDiaryCard.splice(diaryCardIndex, 1);
  localStorage.setItem("다이어리카드배열", JSON.stringify(editDiaryCard));

  diaryCardArr = editDiaryCard;
  currentArr = diaryCardArr;
  lastPage = Math.ceil(diaryCardArr.length / 12);
  createPageNumberButton(currentArr);
  pageNumberRendering(clickPageNumber, currentArr);

  document.getElementById("modal_group4").style = "display: none;";
};

const photoNavStyling = () => {
  document.getElementById("filter_formButton_box").style = "display: none";
  document.getElementById("photo_select").style = "display: block";
  document.getElementById("photoNav").style =
    "border-bottom: 2px solid #000; padding: 12px 8px; color: #000000;";
  document.getElementById("diaryNav").style =
    "border-bottom: 0px; color: #ababab;";
};

const diaryNavStyling = () => {
  document.getElementById("filter_formButton_box").style = "display: flex";
  document.getElementById("photo_select").style = "display: none";
  document.getElementById("photoNav").style =
    "border-bottom: 0px; color: #ababab;";
  document.getElementById("diaryNav").style =
    "border-bottom: 2px solid #000; padding: 12px 8px; color: #000000;";
};

const skeleton = () => {
  const skeletonHtml = `
    <div id="skeleton_card">
      <div id="skeleton_box">
        <div class="skeleton_stick"></div> 
      </div>
      <div id="skeleton_box">
        <div class="skeleton_stick"></div>
      </div>
      <div id="skeleton_box">
        <div class="skeleton_stick"></div>
      </div>
      <div id="skeleton_box">
        <div class="skeleton_stick"></div>
      </div>
      <div id="skeleton_box">
        <div class="skeleton_stick"></div>
      </div>
      <div id="skeleton_box">
        <div class="skeleton_stick"></div>
      </div>
      <div id="skeleton_box">
        <div class="skeleton_stick"></div>
      </div>
      <div id="skeleton_box">
        <div class="skeleton_stick"></div>
      </div>
      <div id="skeleton_box">
        <div class="skeleton_stick"></div>
      </div>
      <div id="skeleton_box">
        <div class="skeleton_stick"></div>
      </div>
    </div>
  `;

  document.getElementById("main").innerHTML = skeletonHtml;
};

const photoNavClick = () => {
  photoNavStyling();
  skeleton();
  fetch("https://dog.ceo/api/breeds/image/random/10").then((el) => {
    el.json().then((jsonEl) => {
      const imageList = jsonEl.message;

      const photoCardString = imageList
        .map((el) => `<img id="dog_image" src="${el}" />`)
        .join("");

      const photoCardHtml = `
        <div id="dog_image_box">
            ${photoCardString}
        </div>
      `;
      document.getElementById("main").innerHTML = photoCardHtml;
    });
  });
};

const diaryNavClick = () => {
  diaryNavStyling();
  diaryCardRendering(diaryCardArr);
};

const photoFiltering = (event) => {
  const selection = event.target.value;
  const images = document.querySelectorAll("#dog_image");
  images.forEach((image) => {
    switch (selection) {
      case "selectBase":
        image.setAttribute("style", "aspect-ratio: 1 / 1;");
        break;

      case "selectWidth":
        image.setAttribute("style", "aspect-ratio: 4 / 3;");
        break;

      case "selectHeight":
        image.setAttribute("style", "aspect-ratio: 3 / 4;");
        break;
    }
  });
};

const darkmodeElements = document.getElementsByClassName("darkmode");

const darkmode = (event) => {
  for (let i = 0; i < darkmodeElements.length; i++) {
    if (event.target.checked === true) {
      darkmodeElements[i].setAttribute("darkmode", "on");
    } else {
      darkmodeElements[i].setAttribute("darkmode", "off");
    }
  }
};

let searchTimer;
const searchTitle = (event) => {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(() => {
    const diaryArray = JSON.parse(localStorage.getItem("다이어리카드배열"));

    const researchResult = diaryArray.filter((el) => {
      return el.title.includes(event.target.value);
    });

    currentArr = researchResult;

    clickPageNumber = 1;
    createPageNumberButton(currentArr);
    pageNumberRendering(clickPageNumber, currentArr);
  }, 1000);
};

let scrolltimer;
window.addEventListener("scroll", () => {
  if (document.getElementById("photoNav").style.color == "rgb(0, 0, 0)") {
    const scrollPercent =
      document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);

    if (scrollPercent < 0.7) return;
    if (scrolltimer) return;

    fetch("https://dog.ceo/api/breeds/image/random").then((response) => {
      response.json().then((data) => {
        const dogimage = data.message;
        const baseHtml = document.getElementById("main");
        const image = `<img src="${dogimage}" width="500px"/>`;
        const imageHtml = document.createElement("div");
        imageHtml.id = "dog_image_box";
        imageHtml.innerHTML = image;
        baseHtml.appendChild(imageHtml);
      });
    });

    scrolltimer = setTimeout(() => {
      scrolltimer = null;
    }, 300);
  }
});

//---------페이지네이션---------
let firstPage = 1;

const createPageNumberButton = () => {
  const pageArr = new Array(5).fill("철수");
  const pagesHtml = pageArr
    .map((el, index) => {
      const pageNumber = index + firstPage;
      return pageNumber <= lastPage
        ? `<button id="pagesNumber" onclick="changePage(${pageNumber})">${pageNumber}</button>`
        : "";
    })
    .join("");
  document.getElementById("pagesBox").innerHTML = pagesHtml;
};

const changePage = (pageNumber) => {
  clickPageNumber = pageNumber;
  pageNumberRendering(clickPageNumber, currentArr);
  createPageNumberButton(currentArr);
};

const nextPageButton = () => {
  if (firstPage + 5 <= lastPage) {
    firstPage = firstPage + 5;
    createPageNumberButton(diaryCardArr);
  } else {
    document.getElementById("rightButton").style = "color: #c7c7c7;";
  }
};

const prevPageButton = () => {
  if (firstPage === 1) {
    document.getElementById("leftButton").style = "color: #c7c7c7;";
  } else {
    firstPage = firstPage - 5;
    createPageNumberButton(diaryCardArr);
  }
};

const pageNumberRendering = (clickPageNumber, arr) => {
  const dozen = 12;
  const pageJump = (clickPageNumber - 1) * dozen;
  const result = arr.slice(pageJump, pageJump + dozen);
  diaryCardRendering(result);
};

const diaryCardRendering = (diaryCardList) => {
  const diaryCardHtmlString = diaryCardList
    .map(
      (el, index) => ` 
      <div class="diaryCard">
        <a href="./일기상세페이지.html?diaryCardIndex=${index}">
            <img src="${el.image}" alt="" id="diaryCard_image">
            <img src="./assets/close_outline_light_m.svg" 
            alt="" 
            id="deleteButton" 
            onclick="deleteDiaryCard(event, ${index})"
        ></a>
        <div class="diaryCard_content">
            <div class="diaryCard_content_header">
                <div id="content_header_emotion">${el.emotionText}</div>
                <div id="content_header_date">${el.date}</div>
            </div>
            <div id="diaryCard_content_title">
                <div id="diarCard_title">
                ${el.title}
                </div>    
            </div>
        </div>
        </div>
    `
    )
    .join(""); //map메서드를 통한 새로운 배열객체 리턴

  const diaryCardHtml = `
    <div id="storage_leftBody">
      ${diaryCardHtmlString}
    </div>
  `;
  document.getElementById("main").innerHTML = diaryCardHtml;
};
