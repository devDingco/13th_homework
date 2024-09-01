// 현재 표시 중인 일기 데이터를 저장하는 변수
let 원본일기;

// 기분과 이모티콘을 연결하는 Map 객체
const 기분이모티콘맵 = new Map([
  ["행복해요", "./images/감정이미지/행복해요 (s).png"],
  ["슬퍼요", "./images/감정이미지/슬퍼요 (s).png"],
  ["놀랐어요", "./images/감정이미지/놀랐어요 (m).png"],
  ["화나요", "./images/감정이미지/화나요 (s).png"],
  ["기타", "./images/감정이미지/기타 (s).png"],
]);

// 기분과 이미지 경로를 연결하는 Map 객체
const 기분이미지맵 = new Map([
  ["행복해요", "./images/행복해요 (m).png"],
  ["슬퍼요", "./images/슬퍼요 (m).png"],
  ["놀랐어요", "./images/놀랐어요 (m).png"],
  ["화나요", "./images/화나요 (m).png"],
  ["기타", "./images/기타 (m).png"],
]);

// 기분과 색상을 연결하는 Map 객체
const 기분색상맵 = new Map([
  ["행복해요", "#ea5757"],
  ["슬퍼요", "#28b4e1"],
  ["놀랐어요", "#d59029"],
  ["화나요", "#777"],
  ["기타", "#a229ed"],
]);

// 기분에 따른 이모티콘을 반환하는 함수
// 입력된 기분에 해당하는 이모티콘 이미지 경로를 반환
function 기분이모티콘(기분) {
  return 기분이모티콘맵.get(기분) || "";
}

// 기분에 따른 이미지 경로를 반환하는 함수
// 입력된 기분에 해당하는 큰 이미지 경로를 반환
function 기분이미지(기분) {
  return 기분이미지맵.get(기분) || "./images/기타 (m).png";
}

// 페이지 초기화 함수
// 페이지가 로드될 때 실행되어 일기 데이터를 불러오고 화면을 설정
function 초기화() {
  // 일기 데이터를 불러오기
  일기불러오기();

  // 초기 화면을 보기 모드로 설정
  보기모드로전환();
}

// 보기 모드로 전환하는 함수
// 일기 내용을 읽기 전용으로 표시
function 보기모드로전환() {
  // HTML에서 '전체상자' 클래스를 가진 요소를 찾기
  const 전체상자 = document.querySelector(".전체상자");
  // 'edit-mode' 클래스를 제거 'view-mode' 클래스를 추가
  전체상자.classList.remove("edit-mode");
  전체상자.classList.add("view-mode");

  // 보기 모드의 HTML 구조를 설정
  전체상자.innerHTML = `
    <div class="제목과기분과날짜담는상자">
      <div class="일기제목"></div>
      <div class="기분과날짜담는상자">
        <span class="선택된기분 일기기분"></span>
        <div class="작성일자와작성담는상자">
          <span class="작성일자"></span>
          <span class="작성">작성</span>
        </div>
      </div>
    </div>
    <div class="내용상자">
      <span>내용</span>
      <div class="일기내용"></div>
    </div>
    <div class="버튼상자">
      <button class="수정버튼">수정</button>
    </div>
  `;

  // 일기 내용을 화면에 표시
  일기표시();

  // 수정 버튼에 클릭 이벤트 리스너를 추가
  document.querySelector(".수정버튼").addEventListener("click", 수정모드활성화);
}

// 일기 데이터를 불러오는 함수
function 일기불러오기() {
  // URL에서 일기 인덱스를 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const 일기인덱스 = urlParams.get("id");

  // 로컬 스토리지에서 일기 목록을 가져오기
  const 일기목록 = JSON.parse(localStorage.getItem("일기목록")) || [];
  // 해당 인덱스의 일기를 가져옵니다.
  원본일기 = 일기목록[일기인덱스];

  // 일기를 찾지 못했을 경우 메인 페이지로 이동
  if (!원본일기) {
    console.error("일기를 찾을 수 없습니다.");
    window.location.href = "index.html";
    return;
  }

  // 원본 인덱스를 일기 객체에 저장
  원본일기.인덱스 = parseInt(일기인덱스);
}

// 보기 모드에서 일기 데이터를 화면에 표시하는 함수
function 일기표시() {
  // HTML에서 필요한 요소들을 찾기
  const 일기제목 = document.querySelector(".일기제목");
  const 선택된기분 = document.querySelector(".선택된기분");
  const 작성일자 = document.querySelector(".작성일자");
  const 일기내용 = document.querySelector(".일기내용");

  // 필요한 요소들이 모두 존재하는지 확인
  if (일기제목 && 선택된기분 && 작성일자 && 일기내용) {
    // 일기 제목과 작성일자를 설정
    일기제목.textContent = 원본일기.제목;
    작성일자.textContent = 원본일기.날짜;

    // 기분 이미지와 텍스트를 설정
    const 기분이미지경로 = 기분이모티콘(원본일기.기분);
    선택된기분.innerHTML = `
      <img src="${기분이미지경로}" alt="${원본일기.기분}" style="width: 32px; height: 32px;">
      <span class="현재기분">${원본일기.기분}</span>
    `;
    선택된기분.className = `선택된기분 일기기분 ${원본일기.기분}`;

    // 일기 내용을 설정
    일기내용.textContent = 원본일기.내용;
  } else {
    console.error("일기 표시에 필요한 DOM 요소를 찾을 수 없습니다.");
  }
}

// 수정 모드를 활성화하는 함수
function 수정모드활성화() {
  const 전체상자 = document.querySelector(".전체상자");
  전체상자.classList.remove("view-mode");
  전체상자.classList.add("edit-mode");

  // 수정 모드의 HTML 구조를 설정
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
  document.querySelector(".버튼상자").style.justifyContent = "center";
  // 기존 데이터를 수정 모드 입력 필드에 채우기
  일기표시수정모드();

  // 취소와 수정완료 버튼에 이벤트 리스너를 추가
  document.querySelector(".취소버튼").addEventListener("click", 보기모드로전환);
  document.querySelector(".수정완료버튼").addEventListener("click", 수정완료);
}

// 수정 모드에서 일기 데이터를 표시하는 함수
function 일기표시수정모드() {
  const 일기제목 = document.querySelector(".일기제목");
  const 일기내용 = document.querySelector(".일기내용");

  if (일기제목 && 일기내용) {
    일기제목.textContent = 원본일기.제목;
    일기내용.textContent = 원본일기.내용;

    // 기존에 선택된 기분에 해당하는 라디오 버튼을 체크
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

// 수정 완료 처리 함수
function 수정완료() {
  // 수정된 제목, 내용, 기분을 가져오기
  const 새제목 = document.querySelector(".일기제목").textContent;
  const 새내용 = document.querySelector(".일기내용").textContent;
  const 새기분 = document.querySelector('input[name="기분"]:checked').value;

  // 수정된 일기 객체를 생성
  const 수정된일기 = {
    ...원본일기,
    제목: 새제목,
    기분: 새기분,
    내용: 새내용,
    이미지: 기분이미지(새기분), // 새로운 기분에 따른 이미지 경로를 설정
  };

  // 로컬 스토리지에서 일기 목록을 가져오기
  const 일기목록 = JSON.parse(localStorage.getItem("일기목록")) || [];

  // 원본 인덱스를 사용하여 일기를 수정
  일기목록[원본일기.인덱스] = 수정된일기;

  // 수정된 일기 목록을 로컬 스토리지에 저장
  localStorage.setItem("일기목록", JSON.stringify(일기목록));

  alert("일기가 수정되었습니다.");
  원본일기 = 수정된일기;
  보기모드로전환();
}

// 페이지 로드 시 초기화 함수를 실행
window.addEventListener("load", 초기화);
