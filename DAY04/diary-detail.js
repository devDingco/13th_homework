// 전역 변수 및 상수 선언
let 원본일기;
const 기분이모티콘맵 = new Map([
  ["행복해요", "./images/감정이미지/행복해요 (s).png"],
  ["슬퍼요", "./images/감정이미지/슬퍼요 (s).png"],
  ["놀랐어요", "./images/감정이미지/놀랐어요 (s).png"],
  ["화나요", "./images/감정이미지/화나요 (s).png"],
  ["기타", "./images/감정이미지/기타 (s).png"],
]);

// 유틸리티 함수
function 기분이모티콘(기분) {
  return 기분이모티콘맵.get(기분) || "";
}

// 초기화 함수
function 초기화() {
  일기불러오기();
  보기모드로전환();
  댓글기능초기화();
  플로팅버튼초기화();
  // 반응형레이아웃조정();
}

// 일기 관련 함수
function 일기불러오기() {
  const urlParams = new URLSearchParams(window.location.search);
  const 일기인덱스 = urlParams.get("id");
  const 일기목록 = JSON.parse(localStorage.getItem("일기목록")) || [];
  원본일기 = 일기목록[일기인덱스];

  if (!원본일기) {
    console.error("일기를 찾을 수 없습니다.");
    window.location.href = "index.html";
    return;
  }

  원본일기.인덱스 = parseInt(일기인덱스);
}

function 보기모드로전환() {
  const 전체상자 = document.querySelector(".전체상자");
  전체상자.classList.remove("edit-mode");
  전체상자.classList.add("view-mode");

  전체상자.innerHTML = `
    <div class="제목과기분과날짜담는상자">
      <div id="일기제목"></div>
      <div class="기분과날짜담는상자">
        <div id="선택된기분" class="일기기분"></div>
        <div class="작성일자와작성담는상자">
          <span id="작성일자"></span>
          <span class="작성">작성</span>
        </div>
      </div>
    </div>
    <div class="내용상자">
      <span>내용</span>
      <div id="일기내용"></div>
    </div>
    <div class="내용복사상자">
      <div class="내용복사작은상자">
        <img src="./images/icons/content_copy.svg"
        <span>내용 복사</span>
      </div>
    </div>
    <div class="버튼상자">
      <button id="수정버튼">수정</button>
      <button id='삭제버튼'>삭제</button>
    </div>
  `;

  일기표시();

  document.getElementById("수정버튼").addEventListener("click", 수정모드활성화);
  document
    .getElementById("삭제버튼")
    .addEventListener("click", 삭제확인모달열기);

  // 내용 복사 기능 추가
  const 내용복사버튼 = document.querySelector(".내용복사작은상자");
  if (내용복사버튼) {
    내용복사버튼.addEventListener("click", 일기내용복사);
  }

  const 댓글입력 = document.querySelector(".입력상자 input");
  const 댓글등록버튼 = document.querySelector(".입력상자 button");
  if (댓글입력) 댓글입력.disabled = false;
  if (댓글등록버튼) 댓글등록버튼.disabled = false;
}

function 삭제확인모달열기() {
  document.getElementById("삭제확인모달그룹").style.display = "block";
}

function 삭제확인모달닫기() {
  document.getElementById("삭제확인모달그룹").style.display = "none";
}

// 일기 내용 복사 함수
function 일기내용복사() {
  const 일기내용 = document.getElementById("일기내용");
  if (일기내용) {
    navigator.clipboard
      .writeText(일기내용.textContent)
      .then(() => {
        토스트메시지표시();
      })
      .catch((err) => {
        console.error("내용 복사 실패:", err);
      });
  }
}

// 토스트 메시지 표시 함수
function 토스트메시지표시() {
  const 토스트 = document.getElementById("토스트메시지");
  토스트.style.display = "block";
  토스트.style.opacity = "0";

  // 토스트 위치 조정
  const viewportHeight = window.innerHeight;
  const toastHeight = 토스트.offsetHeight;
  토스트.style.bottom = `${Math.max(20, viewportHeight * 0.1)}px`; // 최소 20px, 최대 뷰포트 높이의 10%

  // 페이드 인 효과
  let opacity = 0;
  const fadeIn = setInterval(() => {
    if (opacity < 1) {
      opacity += 0.1;
      토스트.style.opacity = opacity.toString();
    } else {
      clearInterval(fadeIn);

      // 2초 후 페이드 아웃
      setTimeout(() => {
        const fadeOut = setInterval(() => {
          if (opacity > 0) {
            opacity -= 0.1;
            토스트.style.opacity = opacity.toString();
          } else {
            clearInterval(fadeOut);
            토스트.style.display = "none";
          }
        }, 50);
      }, 2000);
    }
  }, 50);
}

function 일기표시() {
  const 일기제목 = document.getElementById("일기제목");
  const 선택된기분 = document.getElementById("선택된기분");
  const 작성일자 = document.getElementById("작성일자");
  const 일기내용 = document.getElementById("일기내용");

  if (일기제목 && 선택된기분 && 작성일자 && 일기내용) {
    일기제목.textContent = 원본일기.제목;
    작성일자.textContent = 원본일기.날짜;

    const 기분이미지경로 = 기분이모티콘(원본일기.기분);
    선택된기분.innerHTML = `
      <img src="${기분이미지경로}" alt="${원본일기.기분}" style="width: 2rem; height: 2rem;">
      <span class="현재기분">${원본일기.기분}</span>
    `;
    선택된기분.className = `선택된기분 일기기분 ${원본일기.기분}`;

    일기내용.textContent = 원본일기.내용;
  } else {
    console.error("일기 표시에 필요한 DOM 요소를 찾을 수 없습니다.");
  }
}

function 수정모드활성화() {
  const 전체상자 = document.querySelector(".전체상자");
  전체상자.classList.remove("view-mode");
  전체상자.classList.add("edit-mode");

  전체상자.innerHTML = `
    <div class="오늘기분물어보기">
      <div id="오늘기분질문">오늘 기분은 어땠나요?</div>
      <div class="기분선택상자">
        ${Array.from(기분이모티콘맵.keys())
          .map(
            (기분) => `
          <label>
            <input type="radio" name="기분" value="${기분}" ${
              원본일기.기분 === 기분 ? "checked" : ""
            }>
            ${기분}
          </label>
        `
          )
          .join("")}
      </div>
    </div>
    <div class="제목입력상자">
      <label for="일기제목">제목</label>
      <div class="일기제목" contenteditable="true"></div>
    </div>
    <div class="내용상자">
      <label for="일기내용">내용</label>
      <div class="일기내용" contenteditable="true"></div>
    </div>
    <div class="버튼상자">
      <button class="취소버튼">취소</button>
      <button class="수정완료버튼">수정완료</button>
    </div>
  `;

  일기표시수정모드();

  document.querySelector(".취소버튼").addEventListener("click", 보기모드로전환);
  document.querySelector(".수정완료버튼").addEventListener("click", 수정완료);

  댓글입력비활성화();
}

function 일기표시수정모드() {
  const 일기제목 = document.querySelector(".일기제목");
  const 일기내용 = document.querySelector(".일기내용");

  if (일기제목 && 일기내용) {
    일기제목.textContent = 원본일기.제목;
    일기내용.textContent = 원본일기.내용;

    const 선택된기분라디오 = document.querySelector(
      `input[name="기분"][value="${원본일기.기분}"]`
    );
    if (선택된기분라디오) {
      선택된기분라디오.checked = true;
    }
  } else {
    console.error("일기 표시에 필요한 DOM 요소를 찾을 수 없습니다.");
  }
}

function 수정완료() {
  const 새제목 = document.querySelector(".일기제목").textContent;
  const 새내용 = document.querySelector(".일기내용").textContent;
  const 새기분 = document.querySelector('input[name="기분"]:checked').value;

  const 수정된일기 = {
    ...원본일기,
    제목: 새제목,
    기분: 새기분,
    내용: 새내용,
  };

  const 일기목록 = JSON.parse(localStorage.getItem("일기목록")) || [];
  일기목록[원본일기.인덱스] = 수정된일기;
  localStorage.setItem("일기목록", JSON.stringify(일기목록));

  alert("일기가 수정되었습니다.");
  원본일기 = 수정된일기;
  보기모드로전환();
}

function 일기삭제하기() {
  const 일기목록 = JSON.parse(localStorage.getItem("일기목록")) || [];
  const 새일기목록 = 일기목록.filter((_, 인덱스) => 인덱스 !== 원본일기.인덱스);
  localStorage.setItem("일기목록", JSON.stringify(새일기목록));
  localStorage.removeItem(`댓글_${원본일기.인덱스}`);

  console.log("일기와 관련 회고가 삭제되었습니다.");
  window.location.href = "index.html";
}

// 댓글 관련 함수
function 댓글기능초기화() {
  const 회고상자 = document.querySelector(".회고상자");
  if (!회고상자) {
    console.error("회고상자를 찾을 수 없습니다.");
    return;
  }

  let 댓글목록컨테이너 = 회고상자.querySelector(".댓글목록컨테이너");
  if (!댓글목록컨테이너) {
    댓글목록컨테이너 = document.createElement("div");
    댓글목록컨테이너.className = "댓글목록컨테이너";
    회고상자.appendChild(댓글목록컨테이너);
  }

  const 입력상자 = 회고상자.querySelector(".입력상자");
  if (!입력상자) {
    console.error("입력상자를 찾을 수 없습니다.");
    return;
  }

  const 댓글등록버튼 = 입력상자.querySelector("button");
  if (댓글등록버튼) {
    댓글등록버튼.addEventListener("click", () => 댓글등록하기(원본일기.인덱스));
  }

  댓글불러오기(원본일기.인덱스);

  setTimeout(() => {
    회고상자.scrollIntoView({ behavior: "smooth" });
  }, 500);
}

function 댓글불러오기(일기인덱스) {
  const 댓글목록 = JSON.parse(localStorage.getItem(`댓글_${일기인덱스}`)) || [];
  const 댓글컨테이너 = document.querySelector(".댓글목록컨테이너");

  if (!댓글컨테이너) {
    console.error("댓글 컨테이너를 찾을 수 없습니다.");
    return;
  }

  댓글컨테이너.innerHTML = "";
  댓글목록.forEach((댓글) => 댓글표시(댓글, 댓글컨테이너));
}

function 댓글표시(댓글, 컨테이너) {
  const 댓글요소 = document.createElement("div");
  댓글요소.className = "댓글항목";
  댓글요소.innerHTML = `<span class="댓글내용">${댓글.내용}</span><span class="댓글날짜">[${댓글.날짜}]</span>`;
  컨테이너.appendChild(댓글요소);
}

function 댓글등록하기(일기인덱스) {
  const 댓글입력 = document.querySelector(".입력상자 input");
  const 댓글내용 = 댓글입력.value.trim();
  if (댓글내용 === "") return;

  const 현재날짜 = new Date().toISOString().split("T")[0];
  const 새댓글 = { 내용: 댓글내용, 날짜: 현재날짜 };

  const 댓글목록 = JSON.parse(localStorage.getItem(`댓글_${일기인덱스}`)) || [];
  댓글목록.push(새댓글);
  localStorage.setItem(`댓글_${일기인덱스}`, JSON.stringify(댓글목록));

  const 댓글컨테이너 = document.querySelector(".댓글목록컨테이너");
  if (댓글컨테이너) {
    댓글표시(새댓글, 댓글컨테이너);
  }

  댓글입력.value = "";
}

function 댓글입력비활성화() {
  const 댓글입력 = document.querySelector(".입력상자 input");
  const 댓글등록버튼 = document.querySelector(".입력상자 button");
  if (댓글입력) 댓글입력.disabled = true;
  if (댓글등록버튼) 댓글등록버튼.disabled = true;
  댓글입력.style = "background-color: #F2F2F2; border: none; color: #ABABAB;";
  댓글등록버튼.style =
    "background-color: #C7C7C7; border: none; color:#F2F2F2;";
  댓글입력.placeholder = "수정중일땐 회고를 작성할 수 없어요.";
}

// 플로팅 버튼 관련 함수
function 플로팅버튼초기화() {
  const 위로올리기버튼 = document.getElementById("위로올리기");
  if (!위로올리기버튼) {
    console.error("위로 올리기 버튼을 찾을 수 없습니다.");
    return;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 0) {
      위로올리기버튼.style.display = "flex";
    } else {
      위로올리기버튼.style.display = "none";
    }
  });

  위로올리기버튼.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 페이지 로드 시 초기화 함수를 실행
window.addEventListener("load", () => {
  초기화();

  // 내용 복사 기능 초기화
  const 내용복사버튼 = document.querySelector(".내용복사작은상자");
  if (내용복사버튼) {
    내용복사버튼.addEventListener("click", 일기내용복사);
  }

  // 삭제 확인 모달 버튼 이벤트 리스너 추가
  const 삭제취소버튼 = document.querySelector(".삭제취소버튼");
  const 삭제확인버튼 = document.querySelector(".삭제확인버튼");

  if (삭제취소버튼) {
    삭제취소버튼.addEventListener("click", 삭제확인모달닫기);
  }

  if (삭제확인버튼) {
    삭제확인버튼.addEventListener("click", () => {
      삭제확인모달닫기();
      일기삭제하기();
    });
  }
});
