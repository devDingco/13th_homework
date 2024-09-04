let 일기목록 = []; // 모든 일기를 저장할 배열
let 현재필터 = "전체"; // 현재 선택된 감정 필터

// DOM 요소 선택
const 일기리스트 = document.querySelector(".일기리스트"); // 일기 목록을 표시할 컨테이너
const 기분버튼들 = document.querySelectorAll(
  ".기분인풋상자 input[type='radio']"
); // 기분 선택 라디오 버튼들
const 제목입력 = document.getElementById("diary-title"); // 일기 제목 입력 필드
const 내용입력 = document.getElementById("diary-content"); // 일기 내용 입력 필드
const 등록버튼 = document.querySelector(".일기등록하기버튼"); // 일기 등록 버튼
const 위로올리기버튼 = document.getElementById("위로올리기"); // 페이지 상단으로 이동하는 버튼
const 푸터 = document.querySelector("footer"); // 페이지 하단 푸터
const 일기보관함상자 = document.querySelector(".일기보관함상자"); // 일기 보관함 컨테이너

let 선택된기분 = ""; // 현재 선택된 기분을 저장하는 변수

// 로컬 스토리지에서 일기 데이터를 불러오는 함수
function 로컬스토리지에서불러오기() {
  const 저장된일기 = localStorage.getItem("일기목록");
  if (저장된일기) {
    일기목록 = JSON.parse(저장된일기); // 저장된 JSON 문자열을 객체로 변환
  }
}

// 로컬 스토리지에 일기 데이터를 저장하는 함수
function 로컬스토리지에저장하기() {
  localStorage.setItem("일기목록", JSON.stringify(일기목록)); // 일기 목록을 JSON 문자열로 변환하여 저장
}

// 이벤트 리스너 설정
기분버튼들.forEach((버튼) => {
  버튼.addEventListener("change", () => {
    선택된기분 = 버튼.value; // 선택된 기분 값 저장
    입력필드확인(); // 입력 필드 상태 확인
  });
});

// 제목과 내용 입력 필드에 이벤트 리스너 추가
[제목입력, 내용입력].forEach((필드) =>
  필드.addEventListener("input", 입력필드확인)
);

// 등록 버튼 클릭 이벤트 리스너
등록버튼.addEventListener("click", 일기등록하기);

// 감정 필터 버튼들에 이벤트 리스너 추가
document.querySelectorAll(".감정필터상자 button").forEach((button) => {
  button.addEventListener("click", (event) => {
    현재필터 = event.target.textContent.trim(); // 선택된 필터 값 저장
    일기목록갱신하기(); // 필터에 따라 일기 목록 갱신
  });
});

// 위로 올리기 버튼 클릭 이벤트 리스너
위로올리기버튼.addEventListener("click", 위로올리기);

// 입력 필드 상태를 확인하고 등록 버튼 스타일을 변경하는 함수
function 입력필드확인() {
  const 모든필드입력됨 =
    제목입력.value.trim() !== "" &&
    내용입력.value.trim() !== "" &&
    선택된기분 !== "";

  // 모든 필드가 입력되었는지에 따라 등록 버튼 스타일 변경
  등록버튼.style.background = 모든필드입력됨
    ? "var(--Gray-B, #000)"
    : "var(--Gray-Gray-300, #c7c7c7)";
  등록버튼.style.color = 모든필드입력됨
    ? "#fff"
    : "var(--Gray-Gray-50, #f2f2f2)";
  등록버튼.style.cursor = 모든필드입력됨 ? "pointer" : "default";
}

// 새 일기를 등록하는 함수
function 일기등록하기() {
  const 제목 = 제목입력.value.trim();
  const 내용 = 내용입력.value.trim();
  const 날짜 = new Date().toISOString().split("T")[0]; // 현재 날짜를 YYYY-MM-DD 형식으로 가져옴

  // 모든 필드가 입력되었는지 확인
  if (!선택된기분 || !제목 || !내용) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  // 새 일기 객체 생성
  const 새일기 = {
    기분: 선택된기분,
    제목: 제목,
    내용: 내용,
    날짜: 날짜,
    이미지: 기분이미지(선택된기분), // 선택된 기분에 해당하는 이미지 경로
  };

  일기목록.push(새일기); // 새 일기를 목록에 추가
  로컬스토리지에저장하기(); // 로컬 스토리지에 저장
  일기목록갱신하기(); // 화면에 표시된 일기 목록 갱신
  입력필드초기화(); // 입력 필드 초기화
}

// 일기 목록을 갱신하고 화면에 표시하는 함수
function 일기목록갱신하기() {
  일기리스트.innerHTML = ""; // 기존 목록 초기화
  const 최신일기목록 = JSON.parse(localStorage.getItem("일기목록")) || [];
  const 필터링된일기목록 = 최신일기목록.filter(
    (일기) => 현재필터 === "전체" || 일기.기분 === 현재필터
  );

  if (필터링된일기목록.length === 0) {
    // 필터링된 일기가 없을 경우 메시지 표시
    const 안내메시지 = document.createElement("div");
    안내메시지.textContent = "해당하는 일기가 없습니다.";
    안내메시지.style.textAlign = "center";
    안내메시지.style.padding = "1.25rem";
    안내메시지.style.gridColumn = "1 / span 2";
    일기리스트.appendChild(안내메시지);
  } else {
    // 필터링된 일기 목록을 화면에 표시
    필터링된일기목록.forEach((일기, 인덱스) => {
      const 일기요소 = 일기요소만들기(일기, 인덱스);
      일기리스트.appendChild(일기요소);
    });
  }
}

// 개별 일기 요소를 생성하는 함수
function 일기요소만들기(일기, 원본인덱스) {
  const 일기요소 = document.createElement("div");
  일기요소.className = `등록한일기 filled`;
  일기요소.innerHTML = `
    <div class="삭제버튼"><img src="./images/icons/Close outline light.png" alt="삭제" /></div>
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

  일기요소.dataset.originalIndex = 원본인덱스; // 원본 인덱스를 데이터 속성으로 저장

  // 일기 상세보기 이벤트 리스너
  일기요소.addEventListener("click", (e) => {
    if (!e.target.closest(".삭제버튼")) {
      일기상세보기(원본인덱스);
    }
  });

  // 삭제 버튼 이벤트 리스너
  const 삭제버튼 = 일기요소.querySelector(".삭제버튼");
  삭제버튼.addEventListener("click", (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    일기삭제하기(원본인덱스);
  });

  return 일기요소;
}

// 기분에 따른 이미지 경로를 반환하는 함수
function 기분이미지(기분) {
  const 이미지맵 = {
    행복해요: "./images/행복해요 (m).png",
    슬퍼요: "./images/슬퍼요 (m).png",
    놀랐어요: "./images/놀랐어요 (m).png",
    화나요: "./images/화나요 (m).png",
  };
  return 이미지맵[기분] || "./images/기타 (m).png"; // 기본 이미지 설정
}

// 일기 상세 페이지로 이동하는 함수
function 일기상세보기(원본인덱스) {
  const 기본URL = window.location.href.split("/").slice(0, -1).join("/");
  window.location.href = `${기본URL}/diary-detail.html?id=${원본인덱스}`;
}

// 입력 필드를 초기화하는 함수
function 입력필드초기화() {
  제목입력.value = "";
  내용입력.value = "";
  선택된기분 = "";
  기분버튼들.forEach((버튼) => (버튼.checked = false));
  입력필드확인(); // 버튼 상태 업데이트
}

// 일기를 삭제하는 함수
function 일기삭제하기(원본인덱스) {
  if (confirm("정말로 이 일기를 삭제하시겠습니까?")) {
    일기목록.splice(원본인덱스, 1); // 해당 인덱스의 일기 삭제
    localStorage.setItem("일기목록", JSON.stringify(일기목록)); // 변경된 목록 저장
    localStorage.removeItem(`댓글_${원본인덱스}`); // 관련 댓글 삭제
    일기목록갱신하기(); // 화면 갱신
  }
}

function 스크롤이벤트처리() {
  const 감정필터 = document.querySelector(".감정필터");
  const 위로올리기버튼 = document.getElementById("위로올리기");
  const 푸터 = document.querySelector("footer");
  const 일기보관함상자 = document.querySelector(".일기보관함상자");

  // 스크롤 이벤트 최적화를 위한 변수
  let ticking = false;

  function 버튼위치조정() {
    // 현재 뷰포트의 높이
    const viewportHeight = window.innerHeight;
    // 현재 스크롤 위치
    const scrollPosition = window.scrollY;
    // 문서의 전체 높이
    const documentHeight = document.documentElement.scrollHeight;
    // 푸터의 높이
    const footerHeight = 푸터.offsetHeight;
    // 푸터의 상단 위치
    const footerTop = documentHeight - footerHeight;
    // 일기보관함 상자의 오른쪽 경계 위치
    const 일기보관함상자Rect = 일기보관함상자.getBoundingClientRect();
    const 버튼Right = 일기보관함상자Rect.right;

    // 버튼과 푸터 사이의 여백 (픽셀 단위)
    const 버튼여백 = 20;

    // 스크롤이 100px 이상일 때만 버튼 표시
    if (scrollPosition > 100) {
      위로올리기버튼.style.display = "block";

      // 푸터가 뷰포트에 보이기 시작할 때 버튼 위치 조정
      if (scrollPosition + viewportHeight > footerTop) {
        // 푸터 상단에서 버튼까지의 거리 계산
        const bottomPosition =
          viewportHeight -
          (documentHeight - scrollPosition - footerHeight) +
          버튼여백;
        위로올리기버튼.style.bottom = `${bottomPosition}px`;
      } else {
        // 기본 위치로 설정 (화면 하단에서 20px 위)
        위로올리기버튼.style.bottom = "20px";
      }
    } else {
      // 스크롤이 100px 미만일 때는 버튼 숨김
      위로올리기버튼.style.display = "none";
    }

    // 버튼의 가로 위치를 일기보관함 상자에 맞춰 조정
    위로올리기버튼.style.right = `${window.innerWidth - 버튼Right}px`;

    // 스크롤 위치에 따라 감정 필터의 배경색과 글자색 변경
    감정필터.style.backgroundColor = scrollPosition > 100 ? "#000000" : "";
    감정필터.style.color = scrollPosition > 100 ? "#ffffff" : "";

    // 다음 애니메이션 프레임에서 새로운 조정을 허용
    ticking = false;
  }

  // 스크롤 이벤트 리스너
  window.addEventListener("scroll", function () {
    if (!ticking) {
      // 다음 애니메이션 프레임에서 버튼위치조정 함수 실행
      window.requestAnimationFrame(function () {
        버튼위치조정();
        ticking = false;
      });
      ticking = true;
    }
  });

  // 창 크기 변경 시 버튼 위치 재조정
  window.addEventListener("resize", 버튼위치조정);

  // 초기 페이지 로드 시 버튼 위치 설정
  버튼위치조정();
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  로컬스토리지에서불러오기();
  일기목록갱신하기();
  입력필드확인();
  스크롤이벤트처리();
});
