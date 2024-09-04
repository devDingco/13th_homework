let findIndex = "";
let diaryList = {};

// 페이지 로드 시 인덱스 값에 따라 상세 정보 불러오기
window.addEventListener("load", function () {
  const findIndexNum = location.search;
  findIndex = new URLSearchParams(findIndexNum).get("index");

  const diaryLists = localStorage.getItem(`${findIndex}`);
  diaryList = JSON.parse(diaryLists);
  console.log(diaryList);

  document.getElementById("detail-content-title").value = `${diaryList.title}`;
  document.getElementById("detail-content").value = `${diaryList.content}`;
  document.getElementById(`${diaryList.emotionCheck}`).checked = true;

  const comments = diaryList.comment;
  console.log(comments);

  if (comments.length !== 0) {
    for (let i = 0; i < comments.length; i++) {
      const commentsList = document.getElementById("comment-list");

      const newDiaryElement = document.createElement("div");
      newDiaryElement.className = "comment-element";
      newDiaryElement.innerHTML = `
                    <p>${comments[i].comment}</p>
                    <p>[${comments[i].date}]</p>
                    <hr />
                `;

      commentsList.appendChild(newDiaryElement);
    }
  }
});

// 취소 버튼을 클릭한 경우
const back = () => {
  location.href = `../diary-detail/diary-detail.html?index=${findIndex}`;
};

// 수정 버튼을 클릭한 경우
const editInfo = () => {
  // diaryList 값 변경
  diaryList.title = document.getElementById("detail-content-title").value;
  diaryList.content = document.getElementById("detail-content").value;

  const emotionButtons = document.querySelectorAll('input[name="edit-emotion"]');
  let realEmotion = "";
  emotionButtons.forEach((button) => {
    if (button.checked) {
      realEmotion = button.value;
      diaryList.emotionCheck = realEmotion;
    }
  });

  switch (realEmotion) {
    case "happy":
      diaryList.preview = "../assets/행복해요 (m).png";
      diaryList.emotionColor = "#EA5757";
      diaryList.emotion = "행복해요";
      diaryList.smailPreview = "../assets/행복해요 (s).png";
      break;
    case "sad":
      diaryList.preview = "../assets/슬퍼요 (m).png";
      diaryList.emotionColor = "#28B4E1";
      diaryList.emotion = "슬퍼요";
      diaryList.smailPreview = "../assets/슬퍼요 (s).png";
      break;
    case "suprise":
      diaryList.preview = "../assets/놀랐어요 (m).png";
      diaryList.emotionColor = "#D59029";
      diaryList.emotion = "놀랐어요";
      diaryList.smailPreview = "../assets/놀랐어요 (s).png";
      break;
    case "angry":
      diaryList.preview = "../assets/화나요 (m).png";
      diaryList.emotionColor = "var(--Gray-Gray-600, #777);";
      diaryList.emotion = "화나요";
      diaryList.smailPreview = "../assets/화나요 (s).png";
      break;
    case "etc":
      diaryList.preview = "../assets/기타 (m).png";
      diaryList.emotionColor = "#A229ED";
      diaryList.emotion = "기타";
      diaryList.smailPreview = "../assets/기타 (s).png";
      break;
  }

  localStorage.setItem(`${findIndex}`, JSON.stringify(diaryList));

  // 수정 후 이전 페이지로
  location.href = `../diary-detail/diary-detail.html?index=${findIndex}`;
};
