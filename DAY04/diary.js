// 일기 데이터를 저장할 배열
let 일기목록 = [];

// DOM 요소들을 선택합니다.
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

// 기분 라디오 버튼들에 이벤트 리스너를 추가합니다.
기분버튼들.forEach((버튼) => {
  버튼.addEventListener("change", () => {
    선택된기분 = 버튼.value;
    console.log("선택된 기분:", 선택된기분); // 디버깅을 위한 로그
  });
});

// 입력 필드 상태 확인 함수
function 입력필드확인() {
  const 제목입력됨 = 제목입력.value.trim() !== "";
  const 내용입력됨 = 내용입력.value.trim() !== "";
  const 기분선택됨 = 선택된기분 !== "";

  if (제목입력됨 && 내용입력됨 && 기분선택됨) {
    등록버튼.style.background = "var(--Gray-B, #000)";
    등록버튼.style.color = "#fff"; // 텍스트 색상을 흰색으로 변경
    등록버튼.style.cursor = "pointer"; // 커서를 포인터로 변경
  } else {
    등록버튼.style.background = "var(--Gray-Gray-300, #c7c7c7)";
    등록버튼.style.color = "var(--Gray-Gray-50, #f2f2f2)";
    등록버튼.style.cursor = "default";
  }
}

// 입력 필드에 이벤트 리스너 추가
제목입력.addEventListener("input", 입력필드확인);
내용입력.addEventListener("input", 입력필드확인);
기분버튼들.forEach((버튼) => {
  버튼.addEventListener("change", () => {
    선택된기분 = 버튼.value;
    입력필드확인();
  });
});

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
  };

  일기목록.push(새일기);
  현재페이지 = Math.ceil(일기목록.length / 페이지당아이템수);
  일기목록갱신하기();
  입력필드초기화();

  console.log("일기가 등록되었습니다.");
  console.log("현재 일기 목록:", 일기목록);
}

// 일기 목록 갱신 함수
function 일기목록갱신하기() {
  const 총일기수 = 일기목록.length;
  const 시작인덱스 = (현재페이지 - 1) * 페이지당아이템수;
  const 끝인덱스 = Math.min(현재페이지 * 페이지당아이템수, 총일기수);
  const 현재페이지일기목록 = 일기목록.slice(시작인덱스, 끝인덱스);

  일기리스트.innerHTML = ""; // 기존 목록을 비웁니다.

  if (일기목록.length === 0) {
    const 안내메시지 = document.createElement("div");
    안내메시지.textContent = "일기를 등록해주세요";
    안내메시지.style.textAlign = "center";
    안내메시지.style.padding = "20px";
    안내메시지.style.gridColumn = "1 / span 2"; // 그리드 전체 너비를 차지하도록 설정
    일기리스트.appendChild(안내메시지);
  } else {
    현재페이지일기목록.forEach((일기, 인덱스) => {
      const 실제인덱스 = 시작인덱스 + 인덱스;
      const 일기요소 = 일기요소만들기(일기, 실제인덱스);
      일기리스트.appendChild(일기요소);
    });

    // 빈 그리드 셀 채우기
    const 남은셀수 = 페이지당아이템수 - 현재페이지일기목록.length;
    for (let i = 0; i < 남은셀수; i++) {
      const 빈셀 = document.createElement("div");
      빈셀.className = "등록한일기 빈셀";
      일기리스트.appendChild(빈셀);
    }
  }

  //페이지네이션갱신();
}

// 일기 요소 만들기 함수
function 일기요소만들기(일기, 인덱스) {
  const 일기요소 = document.createElement("div");
  일기요소.className = `등록한일기`;
  일기요소.innerHTML = `
    <div class="감정표현사진" style="background-image: url('./images/${일기.기분} (m).png')"></div>
    <div class="등록한일기핵심포인트">
      <div class="등록한일기핵심포인트_1">
        <span class="일기기분 ${일기.기분}">${일기.기분}</span>
        <span class="일기작성일">${일기.날짜}</span>
      </div>
      <p class="일기제목타이틀">${일기.제목}</p>
    </div>
  `;

  일기요소.addEventListener("click", () => 일기상세보기(인덱스));
  return 일기요소;
}

// 일기 상세 보기 함수
function 일기상세보기(인덱스) {
  const 일기 = 일기목록[인덱스];
  alert(
    `날짜: ${일기.날짜}\n기분: ${일기.기분}\n제목: ${일기.제목}\n내용: ${일기.내용}`
  );
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

// 페이지네이션 갱신 함수
/* function 페이지네이션갱신() {
  const 총페이지수 = Math.ceil(일기목록.length / 페이지당아이템수);
  const 페이지네이션 = document.querySelector(".페이지네이션");
  페이지네이션.innerHTML = "";

  for (let i = 1; i <= 총페이지수; i++) {
    const 버튼 = document.createElement("button");
    버튼.textContent = i;
    버튼.classList.add("페이지버튼");
    if (i === 현재페이지) 버튼.classList.add("active");
    버튼.addEventListener("click", () => 페이지변경(i));
    페이지네이션.appendChild(버튼);
  }
} */

// 페이지 변경 함수
/* function 페이지변경(페이지번호) {
  현재페이지 = 페이지번호;
  일기목록갱신하기();
} */

// 등록 버튼에 이벤트 리스너 추가
등록버튼.addEventListener("click", () => {
  일기등록하기();
  console.log("등록 버튼이 클릭되었습니다."); // 디버깅을 위한 로그
});

// 페이지 로드 시 초기화
일기목록갱신하기();
입력필드확인(); // 초기 버튼 상태 설정
