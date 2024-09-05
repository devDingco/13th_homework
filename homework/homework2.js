let diaryList = [];

// 내비게이션(탭) 함수
function tab() {
  // 1. 탭 버튼과 탭 내용 부분들을 querySelectorAll을 사용해 변수에 담는다.
  const tabItem = document.querySelectorAll(".tab__item");
  const tabContent = document.querySelectorAll(".tab__content");

  // 2. 탭 버튼들을 forEach 문을 통해 한번씩 순회한다.
  // 이때 index도 같이 가져온다.
  tabItem.forEach((item, index) => {
    // 3. 탭 버튼에 클릭 이벤트를 준다.
    item.addEventListener("click", (e) => {
      // 4. 버튼을 a 태그에 만들었기 때문에,
      // 태그의 기본 동작(링크 연결) 방지를 위해 preventDefault를 추가한다.
      e.preventDefault(); // a

      // 5. 탭 내용 부분들을 forEach 문을 통해 한번씩 순회한다.
      tabContent.forEach((content) => {
        // 6. 탭 내용 부분들 전부 active 클래스를 제거한다.
        content.classList.remove("active");
      });

      // 7. 탭 버튼들을 forEach 문을 통해 한번씩 순회한다.
      tabItem.forEach((content) => {
        // 8. 탭 버튼들 전부 active 클래스를 제거한다.
        content.classList.remove("active");
      });

      // 9. 탭 버튼과 탭 내용 영역의 index에 해당하는 부분에 active 클래스를 추가한다.
      // ex) 만약 첫번째 탭(index 0)을 클릭했다면, 같은 인덱스에 있는 첫번째 탭 내용 영역에
      // active 클래스가 추가된다.
      tabItem[index].classList.add("active");
      tabContent[index].classList.add("active");
      // console.log("item:", tabItem[index]);
      // console.log("content:", tabContent);
    });
  });
}

function getImageUrl(emotion) {
  switch (emotion) {
    case "happy":
      return "../assets/Frame-happy.png";
    case "sad":
      return "../assets/Frame-sad.png";
    case "surprise":
      return "../assets/Frame-sur.png";
    case "mad":
      return "../assets/Frame-mad.png";
    case "etc":
      return "../assets/Frame-etc.png";
  }
}

const emotion_kor = {
  happy: "행복해요",
  sad: "슬퍼요",
  surprise: "놀랐어요",
  mad: "화나요",
  etc: "기타",
};

const emotion_color = {
  happy: "#EA5757",
  sad: "#28B4E1",
  surprise: "#D59029",
  mad: "#777",
  etc: "#A229ED",
};

// 로컬 스토리지에서 일기 데이터 꺼내오기
function LoadItem(event) {
  const data = JSON.parse(localStorage.getItem("diaryList"));

  // 데이터가 없다면 그냥 끝내라. 로드 작업을 할 필요가 없기때문에
  if (!data) return;

  diaryList = data;

  if (!location.pathname.includes("homework2")) return;

  let itemAll = "";
  const filterValue = event ? event.target.value : "all";

  diaryList
    .filter((e) => filterValue === "all" || filterValue === e.emotion) // 감정 필터
    .forEach((item) => {
      itemAll += `
      <a class="one-album" href="./diaryDetail.html?title=${item.title}&emotion=${item.emotion}&date=${
        item.date
      }&body=${item.body}" }>
        <img class="thumbnail" src=${getImageUrl(item.emotion)} />
        <div onclick="deleteDiary(event)" class="delete-btn">x</div>
        <div class="album-text">
            <div class="album-text-up">
                <div class="feeling" style="color:${emotion_color[item.emotion]}">${emotion_kor[item.emotion]}</div>
                <div class="date">${new Date(item.date).toLocaleDateString().slice(0, -1)}</div>
            </div>
          <div class="title">${item.title}</div>
        </div>
      </a>
    `;
    });

  document.getElementById("library").innerHTML = itemAll;
}

function addItem() {
  // 1. 데이터 가져오기
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const emotionList = document.getElementsByName("feeling");

  let selEmotion = "";

  emotionList.forEach((emotion) => {
    if (emotion.checked) {
      selEmotion = emotion.id;
    }
  });

  if (!title) {
    window.alert("제목을 입력하세요.");
    return;
  }
  if (!body) {
    window.alert("내용을 입력하세요.");
    return;
  }
  if (!selEmotion) {
    window.alert("감정을 선택하세요.");
    return;
  }

  // 2. 일기 데이터 넣기  -> 로컬 스토리지에 넣기

  diaryList.push({
    title: title,
    body: body,
    emotion: selEmotion,
    date: new Date().getTime(),
  });

  localStorage.setItem("diaryList", JSON.stringify(diaryList));

  LoadItem();
  resetFormData();
}

function resetFormData() {
  // 일기 폼 초기화
  const el = document.querySelectorAll("input[type=text],textarea");
  for (let i = 0; i < el.length; i++) {
    el[i].value = "";
  }
}

function LoadDetail() {
  if (!location.pathname.includes("diaryDetail")) return;

  const urlParams = new URLSearchParams(location.search);

  document.getElementsByTagName("h1")[0].innerText = urlParams.get("title");
  document.getElementsByClassName("username")[0].innerText = emotion_kor[urlParams.get("emotion")];
  document.getElementsByClassName("date")[0].innerText =
    new Date(parseInt(urlParams.get("date"))).toLocaleDateString().slice(0, -1) + " 작성";
  document.getElementsByClassName("diary-content")[0].innerText = urlParams.get("body");

  document.getElementsByTagName("input")[0].value = urlParams.get("title");
  document.getElementById(urlParams.get("emotion")).checked = true;
  document.getElementById("body").value = urlParams.get("body");
}

function editClick() {
  document.getElementsByClassName("diary-wrap")[0].setAttribute("class", "diary-wrap disable");
  document.getElementsByClassName("diary-wrap")[1].setAttribute("class", "diary-wrap");
}

// 일기를 저장하고, 이후 해당 일기의 상세 페이지로 리디렉션
function saveClick() {
  // 현재 페이지의 URL에서 쿼리 스트링(예: ?date=123456789)을 파싱하여 URL 파라미터를 가져옴.
  const urlParams = new URLSearchParams(location.search);

  const title = document.getElementsByTagName("input")[0].value;
  const body = document.getElementById("body").value;

  const emotionList = document.getElementsByName("feeling");

  let selEmotion = "";

  //반복문을 통해 각 감정 라디오 버튼을 확인하여, 선택된 감정의 id를 selEmotion에 저장
  emotionList.forEach((emotion) => {
    if (emotion.checked) {
      selEmotion = emotion.id;
    }
  });

  const date = new Date().getTime();

  localStorage.setItem(
    "diaryList",
    JSON.stringify(
      diaryList.map((item) => {
        if (parseInt(urlParams.get("date")) === item.date) {
          return {
            title: title,
            body: body,
            emotion: selEmotion,
            date: date,
          };
        }

        return item;
      })
    )
  );

  window.location.href = `./diaryDetail.html?title=${title}&emotion=${selEmotion}&date=${date}&body=${body}`;
}

LoadItem();
LoadDetail();

// 버튼 누르면 맨 위로 올리기
const scrollUp = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 스크롤 내려가면 필터 색 바꾸기
const isScroll = () => {
  window.addEventListener("scroll", () => {
    const scrollHeight = window.scrollY;

    if (scrollHeight > 0) {
      document.getElementById("emotionFilter").style = "background-color:#000000; color:#ffffff";
    } else {
      document.getElementById("emotionFilter").style = "";
    }
  });
};
isScroll();

// 일기 삭제 기능
const deleteDiary = (event) => {
  event.preventDefault();

  // 삭제할 일기 항목의 상위 요소인 `.one-album` 찾기
  let album = event.target.closest(".one-album") == null ? location : event.target.closest(".one-album");

  // URL에서 일기 날짜를 가져와서 고유 식별자로 사용
  const diaryDate = parseInt(new URL(album.href).searchParams.get("date"));

  // 일기 목록에서 해당 날짜를 가진 항목을 필터링하여 제거
  diaryList = diaryList.filter((item) => item.date !== diaryDate);

  // 로컬 스토리지에 업데이트된 일기 목록을 저장
  localStorage.setItem("diaryList", JSON.stringify(diaryList));

  // UI에서 삭제된 항목을 제거
  if (document.querySelectorAll(".one-album").length == 0) {
    window.location.href = "./homework2.html";
  } else {
    album.remove();
  }
};

// 상세페이지 > 댓글
// 페이지 로드 시 기존 댓글을 로컬 스토리지에서 가져와서 화면에 표시
function loadComments() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  const commentArea = document.querySelector(".comment");

  commentArea.innerHTML = comments?.map((comment) => `<div>${comment}</div>`).join("");
}

// 댓글 추가 기능

function addComment() {
  const inputField = document.querySelector(".input-area input");
  const commentText = inputField.value;
  console.log("22", commentText);

  if (commentText === "") {
    alert("댓글을 입력해 주세요.");
    return;
  }

  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments.push(commentText);

  localStorage.setItem("comments", JSON.stringify(comments));

  const commentArea = document.querySelector(".comment");
  commentArea.innerHTML += `<div>${commentText}</div>`;

  resetFormData();
}

// 플로팅버튼
function stopScroll() {
  window.addEventListener("scroll", () => {
    const 화면위에서부터푸터위까지길이 = document.getElementById("footer-id").getBoundingClientRect().top;
    console.log(`화면위에서부터푸터위까지길이: ${화면위에서부터푸터위까지길이}`);

    const 보이는화면길이 = window.innerHeight; //window.outerHeight 메뉴, 주소창 등 포함
    console.log(`보이는화면길이:${보이는화면길이}`);

    if (보이는화면길이 >= 화면위에서부터푸터위까지길이) {
      document.getElementById("scroll-id").style = `
              position: fixed;
              bottom: 270px;
              left: 75%;
              // background-color : green;
              `;
    } else {
      document.getElementById("scroll-id").style = `
              position: fixed;
              bottom: 50px;
              left: 75%;
              // background-color : red;
            `;
    }
  });
}
stopScroll();

// 페이지 로드 시 댓글 로드
loadComments();
