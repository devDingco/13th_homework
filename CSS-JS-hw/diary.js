let 일기목록 = []; // 모든 일기를 저장할 배열
let 현재필터 = "전체"; // 현재 선택된 감정 필터
let 선택된기분 = ""; // 현재 선택된 기분을 저장하는 변수
let 삭제할일기인덱스 = null; // 삭제할 일기의 인덱스를 저장하는 변수
let 검색타이머 = null; // 검색 딜레이 타이머
let 사진페이지 = 1; // 현재 사진 페이지 번호
let 사진로딩중 = false; // 사진 로딩 상태
let 현재페이지 = 1;
const 페이지당일기수 = 12;

// DOM 요소 선택
const 일기리스트 = document.querySelector(".일기리스트");
const 기분버튼들 = document.querySelectorAll(
  ".기분인풋상자 input[type='radio']"
);
const 제목입력 = document.getElementById("diary-title");
const 내용입력 = document.getElementById("diary-content");
const 등록버튼 = document.querySelector(".일기등록하기버튼");
const 위로올리기버튼 = document.getElementById("위로올리기");
const 푸터 = document.querySelector("footer");
const 일기보관함상자 = document.querySelector(".일기보관함상자");
const 감정필터상자 = document.querySelector(".감정필터상자");
const 일기보관함탭 = document.querySelector(".일기헤더글자_일보");
const 사진보관함탭 = document.querySelector(".일기헤더글자_사보");
const 일기보관함컨텐츠 = document.querySelector(".일기보관함상자");
const 사진보관함컨텐츠 = document.querySelector(".사진보관함_컨텐츠");
const 사진필터 = document.getElementById("사진_필터");
const 사진그리드 = document.getElementById("사진_그리드");
const 필터드롭다운 = document.querySelector(".필터_드롭다운");
const 필터선택 = document.querySelector(".필터_선택");
const 필터옵션들 = document.querySelector(".필터_옵션들");
const 제목검색입력 = document.getElementById("제목검색");

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
  const 현재테마 = document.querySelector(".일기쓰기").dataset.theme || "light";
  localStorage.setItem("테마", 현재테마);
}

// 다크모드 토글 함수
function 다크모드토글() {
  const 모달들 = document.querySelectorAll(
    ".일기쓰기, .등록완료모달, .취소확인모달, .삭제확인모달"
  );
  const 현재테마 = 모달들[0].dataset.theme || "light";
  const 새테마 = 현재테마 === "dark" ? "light" : "dark";

  모달들.forEach((모달) => {
    모달.dataset.theme = 새테마;
  });

  // 다크모드 토글 스위치 상태 업데이트
  const 다크모드체크박스 = document.getElementById("다크모드_체크박스");
  if (다크모드체크박스) {
    다크모드체크박스.checked = 새테마 === "dark";
  }

  로컬스토리지에저장하기();
}

// 테마 초기화 함수
function 테마초기화() {
  const 저장된테마 = localStorage.getItem("테마") || "light";
  const 모달들 = document.querySelectorAll(
    ".일기쓰기, .등록완료모달, .취소확인모달, .삭제확인모달"
  );

  모달들.forEach((모달) => {
    모달.dataset.theme = 저장된테마;
  });

  const 다크모드체크박스 = document.getElementById("다크모드_체크박스");
  if (다크모드체크박스) {
    다크모드체크박스.checked = 저장된테마 === "dark";
  }
}

// 드롭다운 토글 함수
function 드롭다운토글() {
  필터옵션들.style.display =
    필터옵션들.style.display === "block" ? "none" : "block";
}

// 필터 옵션 선택 함수
function 필터옵션선택(옵션) {
  현재필터 = 옵션.dataset.value;
  document.querySelectorAll(".필터_옵션").forEach((opt) => {
    opt.classList.remove("선택됨");
  });
  옵션.classList.add("선택됨");

  // 필터 선택 표시 업데이트
  const 필터선택 = document.querySelector(".필터_선택 span");
  if (필터선택) {
    필터선택.textContent = 현재필터;
  }

  현재페이지 = 1; // 필터 변경 시 첫 페이지로 리셋
  일기목록갱신하기();
}

// 제목 검색 함수
function 제목으로검색(검색어) {
  const 필터링된일기목록 = 일기목록.filter(
    (일기) =>
      (현재필터 === "전체" || 일기.기분 === 현재필터) &&
      일기.제목.toLowerCase().includes(검색어.toLowerCase())
  );
  일기목록표시(필터링된일기목록);
}

// 입력 필드 상태를 확인하고 등록 버튼 스타일을 변경하는 함수
function 입력필드확인() {
  if (!제목입력 || !내용입력 || !등록버튼) {
    console.error("필요한 DOM 요소를 찾을 수 없습니다.");
    return;
  }

  const 모든필드입력됨 =
    제목입력.value.trim() !== "" &&
    내용입력.value.trim() !== "" &&
    선택된기분 !== "";

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
  const 날짜 = new Date().toISOString().split("T")[0];

  if (!선택된기분 || !제목 || !내용) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  const 새일기 = {
    기분: 선택된기분,
    제목: 제목,
    내용: 내용,
    날짜: 날짜,
    이미지: 기분이미지(선택된기분),
  };

  일기목록.push(새일기);
  로컬스토리지에저장하기();
  일기목록갱신하기();
  입력필드초기화();
  모달닫기기능("모달그룹");
  모달열기기능("등록완료모달그룹");
}

// 일기 목록을 갱신하고 화면에 표시하는 함수
function 일기목록갱신하기() {
  const 검색어 = 제목검색입력 ? 제목검색입력.value : "";
  const 필터링된일기목록 = 일기목록.filter(
    (일기) =>
      (현재필터 === "전체" || 일기.기분 === 현재필터) &&
      일기.제목.toLowerCase().includes(검색어.toLowerCase())
  );

  const 시작인덱스 = (현재페이지 - 1) * 페이지당일기수;
  const 종료인덱스 = 시작인덱스 + 페이지당일기수;
  const 현재페이지일기목록 = 필터링된일기목록.slice(시작인덱스, 종료인덱스);

  일기목록표시(현재페이지일기목록);
  페이지네이션생성(필터링된일기목록.length);
}

// 필터링된 일기 목록을 화면에 표시하는 함수
function 일기목록표시(필터링된목록) {
  일기리스트.innerHTML = "";
  if (필터링된목록.length === 0) {
    const 안내메시지 = document.createElement("div");
    안내메시지.textContent = "해당하는 일기가 없습니다.";
    안내메시지.style.textAlign = "center";
    안내메시지.style.padding = "1.25rem";
    안내메시지.style.gridColumn = "1 / -1";
    일기리스트.appendChild(안내메시지);
  } else {
    필터링된목록.forEach((일기, 인덱스) => {
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

  일기요소.dataset.originalIndex = 원본인덱스;

  일기요소.addEventListener("click", (e) => {
    if (!e.target.closest(".삭제버튼")) {
      일기상세보기(원본인덱스);
    }
  });

  const 삭제버튼 = 일기요소.querySelector(".삭제버튼");
  삭제버튼.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    삭제확인모달열기(원본인덱스);
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
  return 이미지맵[기분] || "./images/기타 (m).png";
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
  입력필드확인();
}

// 탭 전환 함수
function 탭전환(활성탭, 활성컨텐츠) {
  // 모든 탭에서 active 클래스 제거
  [일기보관함탭, 사진보관함탭].forEach((탭) => {
    탭.classList.remove("active");
  });

  // 모든 컨텐츠 숨기기
  [일기보관함컨텐츠, 사진보관함컨텐츠].forEach(
    (컨텐츠) => (컨텐츠.style.display = "none")
  );

  // 선택된 탭에 active 클래스 추가
  활성탭.classList.add("active");

  // 선택된 컨텐츠 표시
  활성컨텐츠.style.display = "block";

  // 감정필터상자 표시 여부 설정
  감정필터상자.style.display = 활성탭 === 일기보관함탭 ? "flex" : "none";
}

// 무한 스크롤 처리 함수
const 무한스크롤처리 = 스로틀(() => {
  const 스크롤위치 = window.innerHeight + window.scrollY;
  const 문서높이 = document.documentElement.offsetHeight;

  if (스크롤위치 >= 문서높이 - 100 && !사진로딩중) {
    강아지사진로드();
  }
}, 1000);

// 강아지 사진 로드 함수
async function 강아지사진로드() {
  if (사진로딩중) return; // 이미 로딩 중이면 함수 종료
  사진로딩중 = true; // 로딩 상태 시작

  try {
    // 스켈레톤 UI 추가 (로딩 중 표시)
    for (let i = 0; i < 10; i++) {
      const 스켈레톤 = document.createElement("div");
      스켈레톤.className = "사진_아이템 스켈레톤";
      사진그리드.appendChild(스켈레톤);
    }

    // API에서 강아지 사진 10개 가져오기
    const 응답 = await fetch(`https://dog.ceo/api/breeds/image/random/10`);
    const 데이터 = await 응답.json();

    // 스켈레톤 UI 제거 및 실제 이미지 추가
    const 스켈레톤들 = document.querySelectorAll(".사진_아이템.스켈레톤");
    데이터.message.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (스켈레톤들[index]) {
          스켈레톤들[index].classList.remove("스켈레톤");
          스켈레톤들[index].innerHTML = "";
          스켈레톤들[index].appendChild(img);
        }
      };
    });

    사진페이지++; // 다음 페이지 준비
  } catch (에러) {
    console.error("강아지 사진을 불러오는 중 오류 발생:", 에러);
  } finally {
    사진로딩중 = false; // 로딩 상태 종료
  }
}

// 삭제 확인 모달을 여는 함수
function 삭제확인모달열기(인덱스) {
  삭제할일기인덱스 = 인덱스;
  모달열기기능("삭제확인모달그룹");
}

// 일기를 삭제하는 함수
function 일기삭제하기(원본인덱스) {
  일기목록.splice(원본인덱스, 1); // 해당 인덱스의 일기 삭제
  localStorage.setItem("일기목록", JSON.stringify(일기목록)); // 로컬 스토리지 업데이트
  localStorage.removeItem(`댓글_${원본인덱스}`); // 해당 일기의 댓글도 삭제
  일기목록갱신하기();
  모달닫기기능("삭제확인모달그룹");
  삭제할일기인덱스 = null;
}

// 삭제 확인 버튼 클릭 시 실행될 함수
function 삭제확인실행() {
  if (삭제할일기인덱스 !== null) {
    일기삭제하기(삭제할일기인덱스);
    삭제할일기인덱스 = null;
  }
}

// 스크롤 이벤트를 처리하는 함수
function 스크롤이벤트처리() {
  const 감정필터 = document.querySelector(".감정필터");
  const 위로올리기버튼 = document.getElementById("위로올리기");
  const 푸터 = document.querySelector("footer");
  const 일기보관함상자 = document.querySelector(".일기보관함상자");

  if (!위로올리기버튼 || !푸터 || !일기보관함상자) {
    console.error("필요한 DOM 요소를 찾을 수 없습니다.");
    return;
  }

  function 버튼위치조정() {
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const footerHeight = 푸터.offsetHeight;
    const footerTop = documentHeight - footerHeight;
    const 일기보관함상자Rect = 일기보관함상자.getBoundingClientRect();
    const 버튼Right = 일기보관함상자Rect.right;

    const 버튼여백 = 20;

    if (scrollPosition > 100) {
      위로올리기버튼.style.display = "block";

      if (scrollPosition + viewportHeight > footerTop) {
        const bottomPosition =
          viewportHeight -
          (documentHeight - scrollPosition - footerHeight) +
          버튼여백;
        위로올리기버튼.style.bottom = `${bottomPosition}px`;
      } else {
        위로올리기버튼.style.bottom = "20px";
      }
    } else {
      위로올리기버튼.style.display = "none";
    }

    위로올리기버튼.style.right = `${window.innerWidth - 버튼Right}px`;

    if (감정필터) {
      감정필터.style.backgroundColor = scrollPosition > 100 ? "#000000" : "";
      감정필터.style.color = scrollPosition > 100 ? "#ffffff" : "";
    }
  }

  window.addEventListener("scroll", 버튼위치조정);
  window.addEventListener("resize", 버튼위치조정);

  버튼위치조정();
}

// 모달을 여는 함수
function 모달열기기능(모달종류) {
  const 모달 = document.getElementById(모달종류);
  if (모달) {
    모달.style.display = "block";
    const 일기쓰기모달 = document.querySelector(".일기쓰기");
    const 현재테마 = 일기쓰기모달
      ? 일기쓰기모달.dataset.theme || "light"
      : "light";
    모달.dataset.theme = 현재테마;
    document.addEventListener("keydown", ESC키처리);
  } else {
    console.error(`${모달종류} 요소를 찾을 수 없습니다.`);
  }
}

// 모달을 닫는 함수
function 모달닫기기능(모달종류) {
  document.getElementById(모달종류).style.display = "none";
  document.removeEventListener("keydown", ESC키처리);
  if (모달종류 === "등록완료모달그룹") {
    일기목록갱신하기();
  }
}

// ESC 키 입력 처리 함수
function ESC키처리(event) {
  if (event.key === "Escape") {
    const 모달그룹 = document.getElementById("모달그룹");
    if (모달그룹 && 모달그룹.style.display === "block") {
      const 제목 = 제목입력 ? 제목입력.value.trim() : "";
      const 내용 = 내용입력 ? 내용입력.value.trim() : "";
      const 기분 = document.querySelector('input[name="mood"]:checked');

      if (제목 || 내용 || 기분) {
        취소확인모달열기();
      } else {
        모달닫기기능("모달그룹");
      }
    }
  }
}

// 취소 확인 모달을 여는 함수
function 취소확인모달열기() {
  모달닫기기능("모달그룹");
  모달열기기능("취소확인모달그룹");
}

// 취소 확인 모달을 닫는 함수
function 취소확인모달닫기() {
  모달닫기기능("취소확인모달그룹");
}

// 일기 작성을 계속하는 함수
function 일기작성계속하기() {
  모달닫기기능("취소확인모달그룹");
  모달열기기능("모달그룹");
}

// 일기 작성을 취소하는 함수
function 일기작성취소하기() {
  모달닫기기능("취소확인모달그룹");
  입력필드초기화();
}

// 감정 필터링 기능을 수행하는 함수
function 필터링기능(선택된필터) {
  현재필터 = 선택된필터;
  일기목록갱신하기();
}

// 페이지 상단으로 스크롤하는 함수
function 위로올리기() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// 스로틀 함수 정의
function 스로틀(callback, delay) {
  let 마지막실행시간 = 0;
  return function () {
    const 현재시간 = new Date().getTime();
    if (현재시간 - 마지막실행시간 >= delay) {
      callback.apply(this, arguments);
      마지막실행시간 = 현재시간;
    }
  };
}

if (사진필터) {
  사진필터.addEventListener("change", (e) => {
    const 선택된필터 = e.target.value;
    사진그리드.dataset.filter = 선택된필터;
    사진그리드.innerHTML = ""; // 기존 사진 제거
    사진페이지 = 1; // 페이지 초기화
    강아지사진로드(); // 새로운 비율로 사진 다시 로드
  });
} else {
  console.error("사진 필터를 찾을 수 없습니다.");
}

// 페이지네이션 생성 함수
function 페이지네이션생성(총일기수) {
  const 총페이지수 = Math.ceil(총일기수 / 페이지당일기수);
  const 페이지네이션컨테이너 = document.querySelector(".pagination");
  if (!페이지네이션컨테이너) return;

  페이지네이션컨테이너.innerHTML = "";

  // 총 일기 수가 12개 이하면 페이지네이션을 숨김
  if (총일기수 <= 페이지당일기수) {
    페이지네이션컨테이너.style.display = "none";
    return;
  }

  페이지네이션컨테이너.style.display = "flex";

  // 이전 페이지 버튼
  const 이전버튼 = document.createElement("div");
  이전버튼.textContent = "<";
  이전버튼.classList.add("arrow");
  이전버튼.addEventListener("click", () => 페이지변경(현재페이지 - 1));
  페이지네이션컨테이너.appendChild(이전버튼);

  // 페이지 번호 버튼
  for (let i = 1; i <= 총페이지수; i++) {
    const 페이지버튼 = document.createElement("button");
    페이지버튼.textContent = i;
    페이지버튼.addEventListener("click", () => 페이지변경(i));
    if (i === 현재페이지) {
      페이지버튼.classList.add("active");
    }
    페이지네이션컨테이너.appendChild(페이지버튼);
  }

  // 다음 페이지 버튼
  const 다음버튼 = document.createElement("div");
  다음버튼.textContent = ">";
  다음버튼.classList.add("arrow");
  다음버튼.addEventListener("click", () => 페이지변경(현재페이지 + 1));
  페이지네이션컨테이너.appendChild(다음버튼);

  // 이전/다음 버튼 활성화/비활성화
  이전버튼.classList.toggle("active", 현재페이지 > 1);
  다음버튼.classList.toggle("active", 현재페이지 < 총페이지수);
}

// 페이지 변경 함수
function 페이지변경(새페이지) {
  const 총페이지수 = Math.ceil(일기목록.length / 페이지당일기수);
  if (새페이지 < 1 || 새페이지 > 총페이지수) return;

  현재페이지 = 새페이지;
  일기목록갱신하기();
}

// 페이지 변경 함수
function 페이지변경(새페이지) {
  const 총페이지수 = Math.ceil(일기목록.length / 페이지당일기수);
  if (새페이지 < 1 || 새페이지 > 총페이지수) return;

  현재페이지 = 새페이지;
  일기목록갱신하기();
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 로컬 스토리지에서 데이터 불러오기
  로컬스토리지에서불러오기();
  // 테마 초기화
  테마초기화();
  // 일기 목록 갱신
  일기목록갱신하기();

  // 입력 필드 확인 함수 호출 전에 필요한 요소들이 있는지 확인
  if (제목입력 && 내용입력 && 등록버튼) {
    입력필드확인();
  } else {
    console.error("일기 입력 필드 또는 등록 버튼을 찾을 수 없습니다.");
  }

  // 스크롤 이벤트 처리 초기화
  스크롤이벤트처리();

  // 기분 버튼 이벤트 리스너
  if (기분버튼들 && 기분버튼들.length > 0) {
    기분버튼들.forEach((버튼) => {
      버튼.addEventListener("change", () => {
        선택된기분 = 버튼.value;
        입력필드확인();
      });
    });
  } else {
    console.error("기분 버튼을 찾을 수 없습니다.");
  }

  // 초기 필터 설정
  const 초기필터 = document.querySelector('.필터_옵션[data-value="전체"]');
  if (초기필터) {
    필터옵션선택(초기필터);
  } else {
    console.error("초기 필터 옵션을 찾을 수 없습니다.");
  }

  // 일기 쓰기 모달 초기화
  const 일기쓰기모달 = document.querySelector(".일기쓰기");
  if (일기쓰기모달 && 일기쓰기모달.style.display !== "none") {
    입력필드확인();
  }

  // 제목 및 내용 입력 필드 이벤트 리스너
  if (제목입력 && 내용입력) {
    [제목입력, 내용입력].forEach((필드) =>
      필드.addEventListener("input", 입력필드확인)
    );
  } else {
    console.error("제목 또는 내용 입력 필드를 찾을 수 없습니다.");
  }

  // 등록 버튼 이벤트 리스너
  if (등록버튼) {
    등록버튼.addEventListener("click", 일기등록하기);
  } else {
    console.error("등록 버튼을 찾을 수 없습니다.");
  }

  // 위로 올리기 버튼 이벤트 리스너
  if (위로올리기버튼) {
    위로올리기버튼.addEventListener("click", 위로올리기);
  } else {
    console.error("위로 올리기 버튼을 찾을 수 없습니다.");
  }

  // 일기 쓰기 버튼 이벤트 리스너
  const 일기쓰기버튼 = document.querySelector(".일기쓰기버튼");
  if (일기쓰기버튼) {
    일기쓰기버튼.addEventListener("click", () => 모달열기기능("모달그룹"));
  } else {
    console.error("일기 쓰기 버튼을 찾을 수 없습니다.");
  }

  // 모달 닫기 버튼 이벤트 리스너
  const 모달닫기버튼 = document.querySelector(".닫기버튼");
  if (모달닫기버튼) {
    모달닫기버튼.addEventListener("click", () => {
      const 제목 = 제목입력 ? 제목입력.value.trim() : "";
      const 내용 = 내용입력 ? 내용입력.value.trim() : "";
      const 기분 = document.querySelector('input[name="mood"]:checked');

      if (제목 || 내용 || 기분) {
        취소확인모달열기();
      } else {
        모달닫기기능("모달그룹");
      }
    });
  } else {
    console.error("모달 닫기 버튼을 찾을 수 없습니다.");
  }

  // 필터 선택 이벤트 리스너
  if (필터선택) {
    필터선택.addEventListener("click", 드롭다운토글);
  } else {
    console.error("필터 선택 요소를 찾을 수 없습니다.");
  }

  // 제목 검색 이벤트 리스너
  if (제목검색입력) {
    제목검색입력.addEventListener("input", (e) => {
      clearTimeout(검색타이머);
      검색타이머 = setTimeout(() => 제목으로검색(e.target.value), 1000);
    });
  } else {
    console.error("제목 검색 입력 필드를 찾을 수 없습니다.");
  }

  // 스크롤 이벤트 리스너 무한 스크롤
  window.addEventListener("scroll", 무한스크롤처리);

  // 등록 취소 버튼 이벤트 리스너
  const 등록취소버튼 = document.querySelector(".등록취소버튼");
  if (등록취소버튼) {
    등록취소버튼.addEventListener("click", 일기작성취소하기);
  } else {
    console.error("등록 취소 버튼을 찾을 수 없습니다.");
  }

  // 계속 작성 버튼 이벤트 리스너
  const 계속작성버튼 = document.querySelector(".계속작성버튼");
  if (계속작성버튼) {
    계속작성버튼.addEventListener("click", 일기작성계속하기);
  } else {
    console.error("계속 작성 버튼을 찾을 수 없습니다.");
  }

  // 등록 완료 확인 버튼 이벤트 리스너
  const 등록완료확인버튼 =
    document.querySelector("#등록완료모달그룹 .확인버튼");
  if (등록완료확인버튼) {
    등록완료확인버튼.addEventListener("click", () => {
      모달닫기기능("등록완료모달그룹");
      일기목록갱신하기();
    });
  } else {
    console.error("등록 완료 확인 버튼을 찾을 수 없습니다.");
  }

  // 삭제 확인 버튼 이벤트 리스너
  const 삭제확인버튼 = document.querySelector(".삭제확인버튼");
  if (삭제확인버튼) {
    삭제확인버튼.addEventListener("click", 삭제확인실행);
  } else {
    console.error("삭제 확인 버튼을 찾을 수 없습니다.");
  }

  // 탭 전환 이벤트 리스너
  if (일기보관함탭 && 사진보관함탭) {
    일기보관함탭.addEventListener("click", () => {
      탭전환(일기보관함탭, 일기보관함컨텐츠);
    });
    사진보관함탭.addEventListener("click", () => {
      탭전환(사진보관함탭, 사진보관함컨텐츠);
      if (사진그리드 && 사진그리드.children.length === 0) {
        강아지사진로드();
      }
    });

    // 초기 상태 설정, 일기보관함 탭이 기본적으로 활성화
    탭전환(일기보관함탭, 일기보관함컨텐츠);
  } else {
    console.error("일기보관함 또는 사진보관함 탭을 찾을 수 없습니다.");
  }

  // 필터 선택 이벤트 리스너
  if (필터선택) {
    필터선택.addEventListener("click", 드롭다운토글);
  } else {
    console.error("필터 선택 요소를 찾을 수 없습니다.");
  }

  // 필터 옵션 이벤트 리스너
  const 필터옵션들 = document.querySelectorAll(".필터_옵션");
  if (필터옵션들.length > 0) {
    필터옵션들.forEach((옵션) => {
      옵션.addEventListener("click", () => 필터옵션선택(옵션));
    });
  } else {
    console.error("필터 옵션을 찾을 수 없습니다.");
  }

  // 제목 검색 이벤트 리스너
  if (제목검색입력) {
    제목검색입력.addEventListener("input", (e) => {
      clearTimeout(검색타이머);
      검색타이머 = setTimeout(() => 제목으로검색(e.target.value), 1000);
    });
  } else {
    console.error("제목 검색 입력 필드를 찾을 수 없습니다.");
  }

  // 다크모드 토글 이벤트 리스너
  const 다크모드체크박스 = document.getElementById("다크모드_체크박스");
  if (다크모드체크박스) {
    다크모드체크박스.addEventListener("change", 다크모드토글);
  } else {
    console.error("다크모드 체크박스를 찾을 수 없습니다.");
  }

  // 스크롤 이벤트 리스너
  window.addEventListener("scroll", 무한스크롤처리);

  // 페이지네이션 컨테이너 추가
  const 페이지네이션컨테이너 = document.createElement("div");
  페이지네이션컨테이너.className = "pagination";
  일기보관함상자.appendChild(페이지네이션컨테이너);

  일기목록갱신하기();
});
