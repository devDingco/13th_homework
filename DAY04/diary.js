// 전역 변수 선언
let 일기목록 = []; // 모든 일기를 저장할 배열
let 현재필터 = "전체"; // 현재 선택된 감정 필터
let 선택된기분 = ""; // 현재 선택된 기분을 저장하는 변수
let 삭제할일기인덱스 = null;
let 검색타이머 = null;

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
    일기목록 = JSON.parse(저장된일기); // 저장된 JSON 문자열을 객체로 변환
  }
}

// 로컬 스토리지에 일기 데이터를 저장하는 함수
function 로컬스토리지에저장하기() {
  localStorage.setItem("일기목록", JSON.stringify(일기목록)); // 일기 목록을 JSON 문자열로 변환하여 저장
}

// 드롭다운 토글 함수
function 드롭다운토글() {
  필터옵션들.style.display =
    필터옵션들.style.display === "block" ? "none" : "block";
}

// 필터 옵션 선택 함수
function 필터옵션선택(옵션) {
  현재필터 = 옵션.dataset.value;
  필터선택.querySelector("span").textContent = 현재필터;

  // 모든 옵션에서 선택 클래스 제거
  document.querySelectorAll(".필터_옵션").forEach((opt) => {
    opt.classList.remove("선택됨");
  });

  // 선택된 옵션에 선택 클래스 추가
  옵션.classList.add("선택됨");

  드롭다운토글();
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
  모달닫기기능("모달그룹"); // 모달 닫기
  모달열기기능("등록완료모달그룹"); // 등록 완료 모달 열기
}

// 일기 목록을 갱신하고 화면에 표시하는 함수
function 일기목록갱신하기() {
  const 검색어 = 제목검색입력.value;
  const 필터링된일기목록 = 일기목록.filter(
    (일기) =>
      (현재필터 === "전체" || 일기.기분 === 현재필터) &&
      일기.제목.toLowerCase().includes(검색어.toLowerCase())
  );
  일기목록표시(필터링된일기목록);
}

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
    e.preventDefault(); // 기본 동작 방지
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

// 탭 전환 함수
function 탭전환(활성탭, 활성컨텐츠) {
  // 모든 탭과 컨텐츠의 활성 상태 제거
  [일기보관함탭, 사진보관함탭].forEach((탭) =>
    탭.classList.remove("일기헤더글자_밑줄")
  );
  [일기보관함컨텐츠, 사진보관함컨텐츠].forEach(
    (컨텐츠) => (컨텐츠.style.display = "none")
  );

  // 선택된 탭과 컨텐츠 활성화
  활성탭.classList.add("일기헤더글자_밑줄");
  활성컨텐츠.style.display = "block";

  // 감정필터상자 표시/숨김 처리
  감정필터상자.style.display = 활성탭 === 일기보관함탭 ? "flex" : "none";
}

// 강아지 사진 로드 함수
async function 강아지사진로드() {
  try {
    // 로딩 시작 시 스켈레톤 UI 표시
    사진그리드.innerHTML = Array(10)
      .fill()
      .map(
        () => `
      <div class="사진_아이템 스켈레톤"></div>
    `
      )
      .join("");

    // Dog API에서 10개의 랜덤 강아지 사진 URL 가져오기
    const 응답 = await fetch("https://dog.ceo/api/breeds/image/random/10");
    const 데이터 = await 응답.json();

    // 각 이미지 URL에 대해 처리
    데이터.message.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        // 이미지 로드 완료 시 스켈레톤 제거 및 이미지 표시
        const 사진아이템 = 사진그리드.children[index];
        사진아이템.classList.remove("스켈레톤");
        사진아이템.innerHTML = "";
        사진아이템.appendChild(img);
      };
    });
  } catch (에러) {
    console.error("강아지 사진을 불러오는 중 오류 발생:", 에러);
    사진그리드.innerHTML =
      "<p>사진을 불러오는데 실패했습니다. 다시 시도해 주세요.</p>";
  }
}

// 삭제 확인 모달을 여는 함수
function 삭제확인모달열기(인덱스) {
  삭제할일기인덱스 = 인덱스;
  모달열기기능("삭제확인모달그룹");
}

function 일기삭제하기(원본인덱스) {
  일기목록.splice(원본인덱스, 1); // 해당 인덱스의 일기 삭제
  localStorage.setItem("일기목록", JSON.stringify(일기목록)); // 변경된 목록 저장
  localStorage.removeItem(`댓글_${원본인덱스}`); // 관련 댓글 삭제
  일기목록갱신하기(); // 화면 갱신
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

// 모달을 여는 함수
function 모달열기기능(모달종류) {
  const 모달 = document.getElementById(모달종류);
  if (모달) {
    모달.style.display = "block";
    document.addEventListener("keydown", ESC키처리);
  } else {
    console.error(`${모달종류} 요소를 찾을 수 없습니다.`);
  }
}

// 모달을 닫는 함수
function 모달닫기기능(모달종류) {
  document.getElementById(모달종류).style.display = "none";
  // ESC 키 이벤트 리스너 제거
  document.removeEventListener("keydown", ESC키처리);
  if (모달종류 === "등록완료모달그룹") {
    일기목록갱신하기();
  }
}

function ESC키처리(event) {
  if (event.key === "Escape") {
    const 모달그룹 = document.getElementById("모달그룹");
    if (모달그룹.style.display === "block") {
      // 일기 작성 중인지 확인
      const 제목 = document.getElementById("diary-title").value.trim();
      const 내용 = document.getElementById("diary-content").value.trim();
      const 기분 = document.querySelector('input[name="mood"]:checked');

      if (제목 || 내용 || 기분) {
        // 작성 중인 내용이 있으면 취소 확인 모달 표시
        취소확인모달열기();
      } else {
        // 작성 중인 내용이 없으면 바로 모달 닫기
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

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  로컬스토리지에서불러오기();
  일기목록갱신하기();
  입력필드확인();
  스크롤이벤트처리();

  // 기분 버튼들에 이벤트 리스너 추가
  if (기분버튼들) {
    기분버튼들.forEach((버튼) => {
      버튼.addEventListener("change", () => {
        선택된기분 = 버튼.value;
        입력필드확인();
      });
    });
  }

  // 초기 필터 설정 (전체 선택)
  const 초기필터 = document.querySelector('.필터_옵션[data-value="전체"]');
  if (초기필터) {
    필터옵션선택(초기필터);
  }

  // 일기 작성 모달이 열려 있을 때만 입력필드확인 함수 실행
  const 일기쓰기모달 = document.querySelector(".일기쓰기");
  if (일기쓰기모달 && 일기쓰기모달.style.display !== "none") {
    입력필드확인();
  }

  // 제목과 내용 입력 필드에 이벤트 리스너 추가
  [제목입력, 내용입력].forEach((필드) =>
    필드.addEventListener("input", 입력필드확인)
  );

  // 등록 버튼 클릭 이벤트 리스너
  등록버튼.addEventListener("click", 일기등록하기);

  // 감정 필터 select 요소에 이벤트 리스너 추가
  const 감정필터 = document.querySelector(".감정필터");
  if (감정필터) {
    감정필터.addEventListener("change", (event) =>
      필터링기능(event.target.value)
    );
  }

  // 위로 올리기 버튼 클릭 이벤트 리스너
  위로올리기버튼.addEventListener("click", 위로올리기);

  // 일기쓰기 버튼에 이벤트 리스너 추가
  const 일기쓰기버튼 = document.querySelector(".일기쓰기버튼");
  if (일기쓰기버튼) {
    일기쓰기버튼.addEventListener("click", () => 모달열기기능("모달그룹"));
  }

  // 모달 닫기 버튼에 이벤트 리스너 추가
  const 모달닫기버튼 = document.querySelector(".닫기버튼");
  if (모달닫기버튼) {
    모달닫기버튼.addEventListener("click", () => {
      const 제목 = document.getElementById("diary-title").value.trim();
      const 내용 = document.getElementById("diary-content").value.trim();
      const 기분 = document.querySelector('input[name="mood"]:checked');

      if (제목 || 내용 || 기분) {
        취소확인모달열기();
      } else {
        모달닫기기능("모달그룹");
      }
    });
  }

  // 등록 취소 버튼에 이벤트 리스너 추가
  const 등록취소버튼 = document.querySelector(".등록취소버튼");
  if (등록취소버튼) {
    등록취소버튼.addEventListener("click", 일기작성취소하기);
  }

  const 계속작성버튼 = document.querySelector(".계속작성버튼");
  if (계속작성버튼) {
    계속작성버튼.addEventListener("click", 일기작성계속하기);
  }

  // 등록 완료 모달의 확인 버튼에 이벤트 리스너 추가
  const 등록완료확인버튼 =
    document.querySelector("#등록완료모달그룹 .확인버튼");
  if (등록완료확인버튼) {
    등록완료확인버튼.addEventListener("click", () => {
      모달닫기기능("등록완료모달그룹");
      일기목록갱신하기(); // 일기 목록 갱신
    });
  }

  // 등록 완료 모달의 배경을 클릭하면 모달 닫기
  const 등록완료모달배경 = document.querySelector(
    "#등록완료모달그룹 .일기쓰기모달배경"
  );
  if (등록완료모달배경) {
    등록완료모달배경.addEventListener("click", () =>
      모달닫기기능("등록완료모달그룹")
    );
  }

  // 삭제 확인 모달의 취소 버튼에 이벤트 리스너 추가
  const 삭제취소버튼 = document.querySelector(".삭제취소버튼");
  if (삭제취소버튼) {
    삭제취소버튼.addEventListener("click", () =>
      모달닫기기능("삭제확인모달그룹")
    );
  }

  // 삭제 확인 모달의 삭제 버튼에 이벤트 리스너 추가
  const 삭제확인버튼 = document.querySelector(".삭제확인버튼");
  if (삭제확인버튼) {
    삭제확인버튼.addEventListener("click", 일기삭제하기);
  }

  document.body.addEventListener("click", function (e) {
    if (e.target.closest(".삭제버튼")) {
      e.preventDefault();
      e.stopPropagation();
      const 일기요소 = e.target.closest(".등록한일기");
      if (일기요소) {
        const 원본인덱스 = parseInt(일기요소.dataset.originalIndex);
        삭제확인모달열기(원본인덱스);
      }
    }
  });

  일기보관함탭.addEventListener("click", () =>
    탭전환(일기보관함탭, 일기보관함컨텐츠)
  );
  사진보관함탭.addEventListener("click", () => {
    탭전환(사진보관함탭, 사진보관함컨텐츠);
    if (사진그리드.children.length === 0) {
      강아지사진로드();
    }
  });

  // 사진 필터 변경 이벤트 처리
  사진필터.addEventListener("change", (e) => {
    사진그리드.dataset.필터 = e.target.value;
  });

  필터선택.addEventListener("click", 드롭다운토글);

  // 필터 옵션 클릭 이벤트 리스너
  document.querySelectorAll(".필터_옵션").forEach((옵션) => {
    옵션.addEventListener("click", () => 필터옵션선택(옵션));
  });

  제목검색입력.addEventListener("input", (e) => {
    clearTimeout(검색타이머);
    검색타이머 = setTimeout(() => 제목으로검색(e.target.value), 1000);
  });

  // 드롭다운 외부 클릭 시 닫기
  document.addEventListener("click", (e) => {
    if (!필터드롭다운.contains(e.target)) {
      필터옵션들.style.display = "none";
    }
  });
});
