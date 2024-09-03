// 객체 담을 배열 선언
let posts = [];

// 날짜
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const todayDate = `${year}.${month}.${day}`;

// sidebar 요소 연결
const sideSubmitBtn = document.getElementById("side-submit-btn");

// sidebar에서 값 유무 판별 함수
const sidebarEmpty = function () {
  const sideTitle = document.getElementById("side-title").value;
  const sideContent = document.getElementById("side-content").value;
  const emotion = document.querySelector('input[name="side-emotion"]:checked').value;

  const checkEmpty = sideTitle !== "" && sideContent !== "" && emotion !== "";

  if (checkEmpty) {
    sideSubmitBtn.disabled = false;
    sideSubmitBtn.style.color = "black";
    sideSubmitBtn.style.backgroundColor = "#ffdd00";
  }
};

// sidebar에서 등록하기 버튼 클릭 함수
const checkSideSubmit = function () {
  const sideTitle = document.getElementById("side-title").value;
  const sideContent = document.getElementById("side-content").value;
  const emotionButtons = document.querySelectorAll('input[name="side-emotion"]');
  let realEmotion = "";
  emotionButtons.forEach((button) => {
    if (button.checked) {
      realEmotion = button.value;
    }
  });

  let previewImg = "";
  let emotionKorean = "";
  let emotionColor = "";
  // detail에서 이미지
  let smallPreviewImg = "";

  console.log(realEmotion);

  const cunnectImgUrl = () => {
    switch (realEmotion) {
      case "happy":
        previewImg = "./assets/행복해요 (m).png";
        emotionColor = "#EA5757";
        emotionKorean = "행복해요";
        smallPreviewImg = "./assets/행복해요 (s).png";
        break;
      case "sad":
        previewImg = "./assets/슬퍼요 (m).png";
        emotionColor = "#28B4E1";
        emotionKorean = "슬퍼요";
        smallPreviewImg = "./assets/슬퍼요 (s).png";
        break;
      case "suprise":
        previewImg = "./assets/놀랐어요 (m).png";
        emotionColor = "#D59029";
        emotionKorean = "놀랐어요";
        smallPreviewImg = "./assets/놀랐어요 (s).png";
        break;
      case "angry":
        previewImg = "./assets/화나요 (m).png";
        emotionColor = "var(--Gray-Gray-600, #777);";
        emotionKorean = "화나요";
        smallPreviewImg = "./assets/화나요 (s).png";
        break;
      case "etc":
        previewImg = "./assets/기타 (m).png";
        emotionColor = "#A229ED";
        emotionKorean = "기타";
        smallPreviewImg = "./assets/기타 (s).png";
        break;
    }
  };

  cunnectImgUrl();
  console.log(previewImg);

  // 새 일기 객체
  const newDiary = {
    emotion: emotionKorean,
    title: sideTitle,
    content: sideContent,
    date: todayDate,
    preview: previewImg,
    emotionColor: emotionColor,
    smailPreview: smallPreviewImg,
  };

  posts.push(newDiary);
  console.log(posts);

  addNewDiary();

  // 초기화
  document.getElementById("side-title").value = "";
  document.getElementById("side-content").value = "";
  const sideEmotionBtn = document.querySelectorAll('input[name="side-emotion"]');
  sideEmotionBtn.forEach((button) => (button.checked = false));
  sideEmotionBtn[0].checked = true;

  sideSubmitBtn.disabled = true;
  sideSubmitBtn.style.color = "#f2f2f2";
  sideSubmitBtn.style.backgroundColor = "#c7c7c7";
};

const addNewDiary = function () {
  const diaryPost = document.getElementById("board-post-line");
  // 현재 있는 요소의 내용 초기화 -> 아래에서 생성한 기존 요소는 존재
  diaryPost.innerHTML = "";

  // map()으로 작성한 일기 목록 렌더링
  posts.map((post, i) => {
    const newDiaryElement = document.createElement("a");
    newDiaryElement.className = "post";
    newDiaryElement.innerHTML = `
                <a href="./diary-detail.html?index=${i}#diary-comment">
                  <div class="emotion-img" style="background-image: url('${post.preview}')">
                    <div class="delete-card-board">
                      <img src="./assets/close icon.png"/>
                    </div>
                  </div>
                  <div class="post-preview">
                    <div class="post-preview-info">
                      <p class="post-preview-emotion" style="color: ${post.emotionColor}">${post.emotion}</p>
                      <p class="post-preview-date">${post.date}</p>
                    </div>
                    <p class="post-preview-title">${post.title}</p>
                  </div>
                </a>`;
    diaryPost.appendChild(newDiaryElement);

    // 새로운 데이터만 로컬 스토리지에 저장
    localStorage.setItem(`${i}`, JSON.stringify(post));
  });
};

// 데이터 불러오기
const loadDiary = () => {
  if (localStorage.length !== 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const diaryLists = localStorage.getItem(`${i}`);
      const diaryList = JSON.parse(diaryLists);
      console.log(diaryList);

      const diaryPost = document.getElementById("board-post-line");

      const newDiaryElement = document.createElement("a");
      newDiaryElement.className = "post";
      newDiaryElement.innerHTML = `
                <a href="./diary-detail.html?index=${i}#diary-comment">
                  <div class="emotion-img" style="background-image: url('${diaryList.preview}')">
                    <div class="delete-card-board">
                      <img src="./assets/close icon.png"/>
                    </div>
                  </div>
                  <div class="post-preview">
                    <div class="post-preview-info">
                      <p class="post-preview-emotion" style="color: ${diaryList.emotionColor}">${diaryList.emotion}</p>
                      <p class="post-preview-date">${diaryList.date}</p>
                    </div>
                    <p class="post-preview-title">${diaryList.title}</p>
                  </div>
                </a>`;

      posts.push(diaryList);
      diaryPost.appendChild(newDiaryElement);
      console.log(posts);
    }
  }
};

// 페이지가 로드될 때 addNewDiary를 호출하여 로컬 스토리지에 저장된 데이터를 렌더링
window.onload = loadDiary;

// 페이지 스크롤 기능
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 스크롤 시 필터 색상 변경
window.addEventListener("load", function () {
  window.addEventListener("scroll", () => {
    const moveScroll = window.scrollY;

    if (moveScroll > 350) {
      document.getElementById("emotions").style = "filter: invert(100%)";
    } else {
      document.getElementById("emotions").style = "filter: invert(0%)";
    }
  });
});
