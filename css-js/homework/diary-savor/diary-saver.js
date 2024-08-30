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

// sidebar 관련 기능
// => 배열에 객체 push -> 새로운 값이 마지막 값으로
// 일기 카드 클릭 시 alert

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
  const emotion = document.querySelector('input[name="side-emotion"]:checked').value;

  let previewImg = "";
  let emotionKorean = "";
  let emotionColor = "";

  console.log(emotion);

  const cunnectImgUrl = () => {
    switch (emotion) {
      case "happy":
        previewImg = "./assets/행복해요 (m).png";
        emotionColor = "#EA5757";
        emotionKorean = "행복해요";
        break;
      case "sad":
        previewImg = "./assets/슬퍼요 (m).png";
        emotionColor = "#28B4E1";
        emotionKorean = "슬퍼요";
        break;
      case "suprise":
        previewImg = "./assets/놀랐어요 (m).png";
        emotionColor = "#D59029";
        emotionKorean = "놀랐어요";
        break;
      case "angry":
        previewImg = "./assets/화나요 (m).png";
        emotionColor = "var(--Gray-Gray-600, #777);";
        emotionKorean = "화나요";
        break;
      case "etc":
        previewImg = "./assets/기타 (m).png";
        emotionColor = "#A229ED";
        emotionKorean = "기타";
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
    emotionText: emotionColor,
  };

  posts.push(newDiary);
  console.log(posts);

  addNewDiary();

  // 초기화
  document.getElementById("side-title").value = "";
  document.getElementById("side-content").value = "";
  const sideEmotionBtn = document.querySelectorAll('input[name="side-emotion"]');
  sideEmotionBtn.forEach((button) => (button.checked = false));

  sideSubmitBtn.disabled = true;
  sideSubmitBtn.style.color = "#f2f2f2";
  sideSubmitBtn.style.backgroundColor = "#c7c7c7";
};

const addNewDiary = function () {
  const diaryPost = document.getElementById("board-post-line");
  // 현재 있는 요소의 내용 초기화 -> 아래에서 생성한 기존 요소는 존재
  diaryPost.innerHTML = "";

  // 프로필 이미지 안들가는 ㅇ이수
  for (let i = 0; i < posts.length; i++) {
    const newDiary = document.createElement("div");
    newDiary.className = "post";
    newDiary.innerHTML = `
                <div class="emotion-img"  style="background-image: url('${posts[i].preview}')"></div>
                <div class="post-preview">
                  <div class="post-preview-info">
                    <p class="post-preview-emotion" style="color: ${posts[i].emotionText}">${posts[i].emotion}</p>
                    <p class="post-preview-date">${posts[i].date}</p>
                  </div>
                  <p class="post-preview-title">${posts[i].title}</p>
                </div>`;

    newDiary.onclick = function () {
      showDairyInfo(i);
    };
    // 기존에 만든 요소 유지
    diaryPost.appendChild(newDiary);
  }
};

const showDairyInfo = function (i) {
  alert(
    `오늘의 기분: ${posts[i].emotion}
제목: ${posts[i].title}
내용: ${posts[i].content}
날짜: ${posts[i].date}`
  );
};
