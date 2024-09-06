// 헤더 클릭 시 메인 이동
const goMain = () => {
  location.href = "../diary-main/diary-saver.html";
};

// 페이지 스크롤 기능
const commentArea = document.getElementById("diary-comment");

const scrollComment = () => {
  window.scrollTo({ commentArea, behavior: "smooth" });
};

window.onload = scrollComment;

let findIndex = "";
let diaryList = {};

// 페이지 로드 시 인덱스 값에 따라 상세 정보 불러오기
window.addEventListener("load", () => {
  const findIndexNum = location.search;
  findIndex = new URLSearchParams(findIndexNum).get("index");

  const diaryLists = localStorage.getItem(`${findIndex}`);
  diaryList = JSON.parse(diaryLists);
  console.log(diaryList);

  document.getElementById("detail-content-title").innerText = `${diaryList.title}`;
  document.getElementById("detail-menu-img").style.backgroundImage = `url('${diaryList.smailPreview}')`;
  document.getElementById("detail-menu-emotion").innerText = `${diaryList.emotion}`;
  document.getElementById("detail-menu-emotion").style.color = `${diaryList.emotionColor}`;
  document.getElementById("detail-menu-date").innerText = `${diaryList.date}`;
  document.getElementById("detail-content").innerText = `${diaryList.content}`;

  if (diaryList.comment.length !== 0) {
    for (let i = 0; i < diaryList.comment.length; i++) {
      const commentsList = document.getElementById("comment-list");

      const newDiaryElement = document.createElement("div");
      newDiaryElement.className = "comment-element";
      newDiaryElement.innerHTML = `
                    <p class="comment-ele-text">${diaryList.comment[i].comment}</p>
                    <p class="comment-ele-date">[${diaryList.comment[i].date}]</p>
                    <hr />
                `;

      comments.push(diaryList.comment[i]);
      commentsList.appendChild(newDiaryElement);
    }
  }
});

// 수정버튼 클릭 시 페이지 이동
const moveEdit = () => {
  location.href = `../diary-edit/diary-edit.html?index=${findIndex}`;
};

// 삭제버튼 클릭 시 게시글 삭제
document.getElementById("delete-card").addEventListener("click", (findIndex) => {
  let posts = [];

  for (let i = 0; i < localStorage.length; i++) {
    posts.push(JSON.parse(localStorage.getItem(`${i}`)));
  }

  console.log(diaryList);
  const index = diaryList.indexTime;

  let newPosts = posts.filter((post) => post.indexTime !== index);

  localStorage.clear();

  for (let i = 0; i < newPosts.length; i++) {
    localStorage.setItem(`${i}`, JSON.stringify(newPosts[i]));
  }

  alert("삭제 되었습니다.");
  location.href = "../diary-main/diary-saver.html";
});

// 회고 입력 버튼 클릭 시
let comments = [];

const diaryComment = () => {
  // 날짜
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayDate = `${year}.${month}.${day}`;

  const recomment = {
    comment: document.getElementById("comment").value,
    date: todayDate,
  };

  comments.push(recomment);
  diaryList.comment = comments;

  addNewComment();

  document.getElementById("comment").value = "";
};

const addNewComment = () => {
  const commentsList = document.getElementById("comment-list");
  commentsList.innerHTML = "";
  comments.map((newComment) => {
    const newDiaryElement = document.createElement("div");
    newDiaryElement.className = "comment-element";
    newDiaryElement.innerHTML = `
                    <p class="comment-ele-text">${newComment.comment}</p>
                    <p class="comment-ele-date">[${newComment.date}]</p>
                    <hr />
                  `;
    commentsList.appendChild(newDiaryElement);

    localStorage.setItem(`${findIndex}`, JSON.stringify(diaryList));
  });
};

// 복사 버튼
const contentClipboard = () => {
  const commentContent = document.getElementById("detail-content").innerText;
  navigator.clipboard.writeText(commentContent);

  const windowWidth = window.innerWidth;

  const toastBar = document.getElementById("toast-message");
  const toastText = document.getElementById("toast-text");

  // 윈도우 크기에 따른 toast 값 설정
  if (windowWidth >= 797) {
    toastBar.style = `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 47.5rem;
    padding: 1rem;
    
    gap: 0.625rem;

    position: absolute;
    bottom: 5%;
    left: calc(50% - (47.5rem / 2));

    border-radius: 0.5rem;
    background-color: black;
  `;
    toastText.style = `
    color: #fff;
    font-family: "Pretendard Variable";
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
    letter-spacing: -0.01rem;
  `;
  } else {
    toastBar.style = `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20rem;
    padding: 0.75rem 0.5rem;
    
    gap: 0.625rem;

    position: absolute;
    bottom: 5%;
    left: calc(50% - (20rem / 2));

    border-radius: 0.5rem;
    background-color: black;
  `;
    toastText.style = `
    color: #fff;
    font-family: "Pretendard Variable";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.009rem;
  `;
  }
};
