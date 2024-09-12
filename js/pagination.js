// 보여줄 리스트 개수 옵션
const viewListCountOption = [
  { key: "8개씩 보기", value: 8, checked: true },
  { key: "16개씩 보기", value: 16 },
  { key: "24개씩 보기", value: 24 },
  // { key: "40개씩 보기", value: 40 },
];


const data = JSON.parse(localStorage.getItem("diaryArray")); // 페이징 만들 데이터 지정
const totalDataCount = data.length; // 전체 데이터 개수
const listViewElement = ".diaryList"; // 리스트 노출될 엘리먼트 지정
let startPageNum = 1; // 시작 페이지 번호 : endPageNum 씩 페이지 넘기기로 활용 endPageNum 씩 증가
const endPageNum = 5; // 첫 페이지에서 보여질 끝 페이지 번호 : 페이지 버튼 개수로 고정값
let lastPageNum = (startPageNum) => startPageNum + endPageNum - 1; // 마지막 페이지 번호 : endPageNum 씩 페이지 넘기기로 활용
let activePageNum = 1; // 현재 활성화된 페이지 번호 : 페이지 버튼 클릭 시 활용
let viewListCount = viewListCountOption.find((el) => el.checked).value; // 한 페이지에 보여줄 리스트 개수
let totalPage = (viewListCount) =>
  Math.ceil(totalDataCount / viewListCount); // 전체 페이지 개수, 마지막 페이지 번호



// !드롭다운 선택 시 이벤트
const dropDownSelect = (event) => {
  const dropDownWrap = event.target.closest(".dropDownWrap");
  const selectValue = event.target.nextElementSibling.textContent;
  const dropDownCheck = dropDownWrap.querySelector(".dropDownCheck");
  dropDownCheck.checked = false;
  dropDownCheck.setAttribute("data-placeholder", selectValue);
  dropDownCheck.classList.add("selected");

  viewListCount = Number(event.target.value); // 한 페이지에 보여줄 리스트 개수 변경

  // 리스트 개수 변경에 따른 변경
  totalPage(viewListCount); // 전체 페이지 개수 변경
  pageListElement(viewListCount, startPageNum, listViewElement); // 페이지 리스트 변경
  paginationElement(startPageNum, viewListCount); // 페이지네이션 버튼 변경
  infoView(totalDataCount, viewListCount); // 전체 데이터 개수, 전체 페이지 개수 변경
};

// ! 옵션 및 선택자에 따른 드롭다운 컴포넌트 생성
const dropDownComponent = (option, pageSelectEl) => {
  const dropDownWrap = document.querySelector(pageSelectEl);
  dropDownWrap.innerHTML = `
     <div class="dropDownWrap">
      <input
        class="dropDownCheck"
        type="checkbox"
        data-placeholder="옵션을 선택해주세요"
      />
      <ul class="dropDownList"></ul>
    </div>`;

  const optionList = option
    .map((el) => {
      const id = `option_${el.value}`;
      return `
      <li>
        <input
          id="${id}"
          type="radio"
          name="selectOption"
          onclick="dropDownSelect(event)"
          value="${el.value}"
        />
        <label for="${id}">${el.key}</label>
      </li>
      `;
    })
    .join("");

  dropDownWrap.querySelector(".dropDownList").innerHTML = optionList;

  // 기본값을 option에서 선택한 값이 있으면 그것으로 설정
  const defaultOption = option.find((el) => el.checked);
  const checkedLi = document.getElementById(
    "option_" + defaultOption.value
  );
  checkedLi.checked = true;
  dropDownSelect({ target: checkedLi });
};

// !전체 데이터 개수, 전체 페이지 개수 출력
const infoView = (totalDataCount, viewListCount) => {
  const infoElement = document.querySelector(".info");
  const totalPageNum = totalPage(viewListCount);
  infoElement.innerHTML = ` 
    총 게시글 수 : ${totalDataCount} • 총 페이지 수 : ${totalPageNum}`;
};

// !한 페이지씩 다음으로 이동 type = prev, next
const pageMove = (type) => {

  if (type === "prev") {
    if (activePageNum > 1) {
      activePageNum--
    } else if (activePageNum < startPageNum) {
      startPageNum -= endPageNum;
    }
  } else if (type === "next") {
    if (activePageNum < totalPage(viewListCount)) {
      activePageNum++;
    } else if (activePageNum > lastPageNum(startPageNum)) {
      startPageNum += endPageNum;
    }
  }

  const buttonNthNum =
    activePageNum % endPageNum === 0
      ? endPageNum
      : activePageNum % endPageNum;

  paginationElement(activePageNum - buttonNthNum + 1, viewListCount);

  pageListElement(
    viewListCount,
    activePageNum * viewListCount - viewListCount + 1,
    listViewElement
  );

  buttonActiveStyle(buttonNthNum);

  console.log(startPageNum, activePageNum);
};

// !endPageNum 만큼 페이지 한번에 이동 type = prev, next
const pageCountMove = (type) => {
  if (type === "prev") {
    if (startPageNum > 1) {
      startPageNum -= endPageNum;
    }
  } else if (type === "next") {
    startPageNum += endPageNum;
  }
  activePageNum = startPageNum;

  paginationElement(startPageNum, viewListCount);
  pageListElement(
    viewListCount,
    startPageNum * viewListCount - viewListCount + 1,
    listViewElement
  );
};

// !페이지네이션 버튼 클릭 이벤트
const pageNumMove = (event) => {
  activePageNum = Number(event.target.textContent);

  const buttonNthNum = activePageNum - startPageNum + 1;
  paginationElement(activePageNum - buttonNthNum + 1, viewListCount);
  pageListElement(
    viewListCount,
    activePageNum * viewListCount - viewListCount + 1,
    listViewElement
  );

  buttonActiveStyle(buttonNthNum);
};

// !화살표 버튼 활성화 체크
const activeArrowCheck = () => {
  const prevAllBtn = document.querySelector(".prevAllBtn");
  const nextAllBtn = document.querySelector(".nextAllBtn");

  const prevBtn = document.querySelector(".prevBtn");
  const nextBtn = document.querySelector(".nextBtn");

  prevBtn.disabled = activePageNum === 1; // 현재 선택한 페이지 넘버가 첫 페이지일 경우 이전 버튼 비활성화
  nextBtn.disabled = activePageNum === totalPage(viewListCount); // 현재 선택한 페이지 넘버가 마지막 페이지일 경우 다음 버튼 비활성화

  // 시작 카운트 페이지가 1일 경우 이전 버튼 비활성화
  // 5개 페이지 노출인 경우 startPageNum이 5씩 증감 : 1,6,11,16...
  prevAllBtn.disabled = startPageNum === 1;
  // 끝 카운트 페이지가 마지막 페이지 숫자와 같거나 그보다 클 경우 다음 버튼 비활성화
  nextAllBtn.disabled =
    lastPageNum(startPageNum) >= totalPage(viewListCount);
};

// !페이지네이션 버튼 활성화 스타일 적용
const buttonActiveStyle = (buttonNthNum) => {
  const activeButton = document.querySelector(".pageButtonBox button.active");
  if (activeButton) activeButton.classList.remove("active");

  document
    .querySelector(`.pageButtonBox button:nth-child(${buttonNthNum})`)
    .classList.add("active");
};

// !페이지네이션 버튼 생성
const paginationElement = (startPageNum, viewListCount) => {
  const pageButtonBox = document.querySelector(".pageButtonBox");
  if (!pageButtonBox) return;
  const newArr = new Array(endPageNum).fill("");
  const buttonArr = newArr
    .map((el, index) => {
      const pageNum = startPageNum + index;

      const activeClass = pageNum === startPageNum ? "class='active'" : "";

      if (pageNum > totalPage(viewListCount)) return "";

      return `<button ${activeClass} onclick="pageNumMove(event)">${pageNum}</button>`;
    })
    .filter((el) => el !== "");
  pageButtonBox.innerHTML = buttonArr.join("");
  activeArrowCheck();
};


// ! 쿼리 추출 함수
const getQuery = (key) => {
  const url = new URL(location.href);
  return url.searchParams.get(key);
};

// ! 쿼리 수정 혹은 추가 함수
const urlSet = (key, value) => {
  const url = new URL(location.href);
  url.searchParams.set(key, value);
  return url.href;
};




// !페이지 노출할 리스트 생성
const pageListElement = (viewListCount, startPageNum, listViewElement) => {
  viewListCount = Number(viewListCount);
  // 삭제한 번호가 저장된 로컬스토리지 값 가져오기
  const diaryArrayDelPageNum = JSON.parse(localStorage.getItem("diaryArrayDelPageNum"));
  // 삭제한 번호가 저장된 로컬스토리지 값 삭제 
  localStorage.removeItem("diaryArrayDelPageNum");
  // console.log(diaryArrayDelPageNum);

  const data = JSON.parse(localStorage.getItem("diaryArray"))
  // console.log(data);

  const listViewEl = document.querySelector(listViewElement);
  listViewEl.dataset.viewlistcount = viewListCount;
  const placeholder = listViewEl.dataset.placeholder ? listViewEl.dataset.placeholder : "데이터가 없습니다.";
  if (data.length === 0) return listViewEl.innerHTML = `<p class='empty'>${placeholder}</p>`;


  const newListArr = Array(viewListCount).fill("");
  const listArr = newListArr
    .map((el, index) => {

      let dataNumIndex = startPageNum + index - 1;
      if (diaryArrayDelPageNum) { // 삭제한 번호가 저장된 로컬스토리지 값이 있을 경우
        const buttonNthNum =
          activePageNum % endPageNum === 0
            ? endPageNum
            : activePageNum % endPageNum;
        infoView(data.length, viewListCount);
        paginationElement(activePageNum - buttonNthNum + 1, viewListCount);
        buttonActiveStyle(buttonNthNum);
        dataNumIndex += viewListCount
      }

      if (dataNumIndex >= totalDataCount || data[dataNumIndex] === undefined) return "";
      return diaryLiRender(data[dataNumIndex]); // 
    })
    .filter((el) => el !== "");
  listViewEl.innerHTML = `<ul>${listArr.join("")}</ul>`;

};



// 페이지 컴포넌트 기본틀 생성
const pageComponent = (el) => {
  const pageElement = document.querySelector(el);
  if (!pageElement || data.length === 0) return;
  pageElement.innerHTML = `<div class="pageBtnWrap">
    <button class="prevAllBtn" onclick="pageCountMove('prev')">〈〈</button>
    <button class="prevBtn" onclick="pageMove('prev')">〈</button>
    <span class="pageButtonBox"></span>
    <button class="nextBtn" onclick="pageMove('next')">〉</button>
    <button class="nextAllBtn" onclick="pageCountMove('next')">〉〉</button>
    </div>
  `;
}
pageComponent(".diaryPagination"); // 페이지 컴포넌트 기본틀 할 클래스 지정 및 생성 처리

window.onload = () => {

  infoView(totalDataCount, viewListCount);
  paginationElement(startPageNum, viewListCount);
  // pageListElement(viewListCount, startPageNum, listViewElement); // 지정한 박스에 리스트 생성
  dropDownComponent(viewListCountOption, ".pageCountSelect"); // 지정한 박스에 드롭다운 컴포넌트 생성
};
