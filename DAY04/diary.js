// 일기 데이터를 저장할 배열
let 일기목록 = [];

// DOM 요소들을 선택
const 일기리스트 = document.querySelector(".일기리스트");
const 기분버튼들 = document.querySelectorAll(
  ".기분인풋상자 input[type='radio']"
);
const 제목입력 = document.getElementById("diary-title");
const 내용입력 = document.getElementById("diary-content");
const 등록버튼 = document.querySelector(".일기등록하기버튼");

const 페이지당아이템수 = 6; // 한 페이지에 표시할 일기 수
let 현재페이지 = 1;

// 현재 선택된 기분을 저장할 변수
let 선택된기분 = "";

// 현재 선택된 필터를 저장할 변수
let 현재필터 = "전체";

// 로컬 스토리지에서 일기 데이터를 불러오는 함수
function 로컬스토리지에서불러오기() {
  const 저장된일기 = localStorage.getItem("일기목록");
  if (저장된일기) {
    일기목록 = JSON.parse(저장된일기);
  }
}

// 로컬 스토리지에 일기 데이터를 저장하는 함수
function 로컬스토리지에저장하기() {
  localStorage.setItem("일기목록", JSON.stringify(일기목록));
}

// 기분 라디오 버튼들에 이벤트 리스너를 추가
기분버튼들.forEach((버튼) => {
  버튼.addEventListener("change", () => {
    선택된기분 = 버튼.value;
    console.log("선택된 기분:", 선택된기분); // 디버깅을 위한 로그
    입력필드확인();
  });
});

// 입력 필드 상태 확인 함수
function 입력필드확인() {
  const 제목입력됨 = 제목입력.value.trim() !== "";
  const 내용입력됨 = 내용입력.value.trim() !== "";
  const 기분선택됨 = 선택된기분 !== "";

  if (제목입력됨 && 내용입력됨 && 기분선택됨) {
    등록버튼.style.background = "var(--Gray-B, #000)";
    등록버튼.style.color = "#fff";
    등록버튼.style.cursor = "pointer";
  } else {
    등록버튼.style.background = "var(--Gray-Gray-300, #c7c7c7)";
    등록버튼.style.color = "var(--Gray-Gray-50, #f2f2f2)";
    등록버튼.style.cursor = "default";
  }
}

// 입력 필드에 이벤트 리스너 추가
제목입력.addEventListener("input", 입력필드확인);
내용입력.addEventListener("input", 입력필드확인);

// 일기 등록 함수
function 일기등록하기() {
  const 제목 = 제목입력.value;
  const 내용 = 내용입력.value;
  const 날짜 = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식

  if (!선택된기분 || !제목 || !내용) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  const 새일기 = {
    기분: 선택된기분,
    제목: 제목,
    내용: 내용,
    날짜: 날짜,
    이미지: 기분이미지(선택된기분), // 기분에 따른 이미지 경로 추가
  };

  일기목록.push(새일기);
  로컬스토리지에저장하기(); // 새 일기를 로컬 스토리지에 저장
  현재페이지 = Math.ceil(일기목록.length / 페이지당아이템수);
  일기목록갱신하기();
  입력필드초기화();

  console.log("일기가 등록되었습니다.");
  console.log("현재 일기 목록:", 일기목록);
}

// 필터링 함수
function 필터링기능(event) {
  현재필터 = event.target.value;
  일기목록갱신하기();
}

// 일기 목록 갱신 함수
function 일기목록갱신하기() {
  일기리스트.innerHTML = ""; // 기존 목록을 비우기

  // 로컬 스토리지에서 최신 데이터 불러오기
  const 최신일기목록 = JSON.parse(localStorage.getItem("일기목록")) || [];

  // 필터링된 일기 목록을 생성
  const 필터링된일기목록 = 최신일기목록.filter(
    (일기) => 현재필터 === "전체" || 일기.기분 === 현재필터
  );

  console.log("필터링된 일기 목록:", 필터링된일기목록);

  if (필터링된일기목록.length === 0) {
    // 일기가 없을 경우 메시지 표시
    const 안내메시지 = document.createElement("div");
    안내메시지.textContent = "해당하는 일기가 없습니다.";
    안내메시지.style.textAlign = "center";
    안내메시지.style.padding = "20px";
    안내메시지.style.gridColumn = "1 / span 2";
    일기리스트.appendChild(안내메시지);
  } else {
    // 일기 요소들을 생성하고 DOM에 추가
    필터링된일기목록.forEach((일기) => {
      // 원본 인덱스 찾기
      const 원본인덱스 = 최신일기목록.findIndex(
        (원본일기) => 원본일기 === 일기
      );
      const 일기요소 = 일기요소만들기(일기, 원본인덱스);
      일기리스트.appendChild(일기요소);
    });

    // 빈 그리드 셀 채우기
    const 남은셀수 = 페이지당아이템수 - 필터링된일기목록.length;
    for (let i = 0; i < 남은셀수; i++) {
      const 빈셀 = document.createElement("div");
      빈셀.className = "등록한일기 빈셀";
      일기리스트.appendChild(빈셀);
    }
  }
}

// 일기 요소 만들기 함수
function 일기요소만들기(일기, 원본인덱스) {
  const 일기요소 = document.createElement("div");
  일기요소.className = `등록한일기 filled`;

  일기요소.innerHTML = `
    <div class="등록한일기">
      <div class="감정표현사진" style="background-image: url('${일기.이미지}')"></div>
      <div class="등록한일기핵심포인트">
        <div class="등록한일기핵심포인트_1">
          <span class="일기기분 ${일기.기분}">${일기.기분}</span>
          <span class="일기작성일">${일기.날짜}</span>
        </div>
        <p class="일기제목타이틀">${일기.제목}</p>
      </div>
    </div>
  `;

  // 원본 인덱스를 데이터 속성으로 저장
  일기요소.dataset.originalIndex = 원본인덱스;

  일기요소.addEventListener("click", () => 일기상세보기(원본인덱스));
  return 일기요소;
}

// 기분에 따른 이미지 경로를 반환하는 함수
function 기분이미지(기분) {
  switch (기분) {
    case "행복해요":
      return "./images/행복해요 (m).png";
    case "슬퍼요":
      return "./images/슬퍼요 (m).png";
    case "놀랐어요":
      return "./images/놀랐어요 (m).png";
    case "화나요":
      return "./images/화나요 (m).png";
    default:
      return "./images/기타 (m).png";
  }
}

// 일기 상세 보기 함수
function 일기상세보기(원본인덱스) {
  // 현재 페이지의 기본 URL을 가져오기
  const 기본URL = window.location.href.split("/").slice(0, -1).join("/");
  // 기본 URL에 diary-detail.html 페이지 경로를 추가
  window.location.href = `${기본URL}/diary-detail.html?id=${원본인덱스}`;
}

// 입력 필드 초기화 함수
function 입력필드초기화() {
  제목입력.value = "";
  내용입력.value = "";
  선택된기분 = "";
  기분버튼들.forEach((버튼) => {
    버튼.checked = false;
  });
  입력필드확인(); // 버튼 상태 업데이트
  console.log("입력 필드가 초기화되었습니다.");
}

// 등록 버튼에 이벤트 리스너 추가
등록버튼.addEventListener("click", () => {
  일기등록하기();
  console.log("등록 버튼이 클릭되었습니다.");
});

// 필터 버튼들에 이벤트 리스너 추가
document.querySelectorAll(".감정필터상자 button").forEach((button) => {
  button.addEventListener("click", (event) => {
    현재필터 = event.target.textContent.trim();
    console.log("선택된 필터:", 현재필터); // 디버깅을 위한 로그
    일기목록갱신하기();
  });
});

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  로컬스토리지에서불러오기();
  일기목록갱신하기();
  입력필드확인(); // 초기 버튼 상태 설정
});
