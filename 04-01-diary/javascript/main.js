window.onload = () => {
  console.log("민지의 다이어리에 오신 것을 환영합니다.");

// 1. 시작하면 일기 목록에 그리기
JS_drawing();
};


// 스크롤 관련 이벤트
window.addEventListener("scroll", () => {
  const TofooterHeight = document
    .getElementById("footer_section")
    .getBoundingClientRect().top;
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  // 1. 푸터가 보일 때는, 화면과 상관없이 사진에 고정시키기
  if (screenHeight >= TofooterHeight) {
    if (screenWidth >= 849) {
      document.getElementById("floating_button").style = `
      position: relative;
      bottom: 0;
      left: 97%;
    `;
    } else {
      document.getElementById("floating_button").style = `
      position: relative;
      bottom: 0;
      left: 90%;
    `;
    }

    // 2. 푸터가 안보일 때는, 사진과 상관없이 화면에 고정시키기
    } else {
      document.getElementById("floating_button").style = `
        position: fixed;
        bottom: 4rem;
        right: 2rem;
      `;
    }
});



const JS_drawing = (startIndex, endIndex) => {
  const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);

  const paginateDiary = diary_list.slice(startIndex, endIndex);

  const newdiary = paginateDiary
    .map((element, main) => `
      <a href="./detail.html?number=${startIndex + main}" style="text-decoration: none;">
        <div class="CSS_diary">
          <div class="diary_image">
            <img class="cancel_button" src="./assets/close_button.png" onclick="JS_cancel(event, ${startIndex + main})" />
            ${element.기분 === "happy" ? '<img class="feeling_image" src="./assets/happy.png" alt="happy" />' : ""}
            ${element.기분 === "sad" ? '<img class="feeling_image" src="./assets/sad.png" alt="sad" />' : ""}
            ${element.기분 === "surprise" ? '<img class="feeling_image" src="./assets/surprise.png" alt="surprise" />' : ""}
            ${element.기분 === "angry" ? '<img class="feeling_image" src="./assets/angry.png" alt="angry" />' : ""}
            ${element.기분 === "etc" ? '<img class="feeling_image" src="./assets/etc.png" alt="etc" />' : ""}
          </div>
          <div class="diary_content">
            ${element.기분 === "happy" ? `<div class="feeling happy">행복해요</div>` : ""}
            ${element.기분 === "sad" ? `<div class="feeling sad">슬퍼요</div>` : ""}
            ${element.기분 === "surprise" ? `<div class="feeling surprise">놀랐어요</div>` : ""}
            ${element.기분 === "angry" ? `<div class="feeling angry">화나요</div>` : ""}
            ${element.기분 === "etc" ? `<div class="feeling etc">기타</div>` : ""}
            <div class="date">${element.작성일}</div>
          </div>
          <div class="title">${element.제목}</div>
        </div>
      </a>
    `)
    .join("");

  document.getElementById("show_diary_html").innerHTML = newdiary;
};


// 일기 삭제 후에도 필터링 유지
let currentFilter = "all";

// 삭제할 일기 번호를 저장할 변수
let delete_index = null;

// 삭제 모달 띄우기
const JS_cancel = (event, diary_number) => {
  event.preventDefault();
  delete_index = diary_number; // 삭제할 일기 번호 저장
  document.getElementById("html_post_delete").style.display = "block";
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'});
  document.body.style.overflow = 'hidden';
}

// 일기 삭제
const JS_delete = () => {
  // 저장된 일기 목록 가져오기
  const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);

  // 일기 삭제
  if(delete_index !== null) {
    diary_list.splice(delete_index, 1);
  }

  // 변경된 일기 목록 다시 저장
  window.localStorage.setItem("list_of_diary", JSON.stringify(diary_list));

  // 화면에 일기 목록 다시 그리기
  JS_close();

  JS_drawing();

  JS_filtering({target: {value: currentFilter}});
};


// const diary_list = [];

const JS_write = () => {
  // 0. 현재 날짜 가져오기

  const date = new Date();

  const options = {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    date: date.getDate(),
  };

  // 1-1. 내가쓴 일기 불러오기
  const date_container = options.year + ". " + options.month + ". " + (("00"+options.date.toString()).slice(-2));
  const title_container = window.document.getElementById("html_title").value;
  const content_container = window.document.getElementById("html_content").value;
  let mood_container;
  window.document.getElementsByName("select_feeling").forEach((element) => {
    if (element.checked) mood_container = element.value;
  });


  // 2. 일기목록에 일기 추가하기
  const diary_container = {
    제목: title_container,
    내용: content_container,
    기분: mood_container,
    작성일: date_container,
  };
  console.log(diary_container)

  const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);
  diary_list.push(diary_container);
  window.localStorage.setItem("list_of_diary", JSON.stringify(diary_list));

  JS_drawing();

  document.getElementById("html_reg_fin").style = "display: block;"

  resetFormData();
  
};

const show_write = (diary_number_container) => {
  const diary_container = diary_list[diary_number_container];
  const title_container = diary_container.제목;
  const content_container = diary_container.내용;

  alert(`
   제목: ${title_container}
   내용: ${content_container}
  `);

  location.href=`./detail.html?diary_number=${diary_number_container}`;
};

// 스크롤 시 필터 색상 반전
window.onscroll = function () {
  const selectElement = document.querySelector(".filter");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    // 2. 스크롤이 조금이라도 내려가면 배경색 변경하기
    selectElement.classList.add("change_color");
  } else {
    selectElement.classList.remove("change_color"); // 스크롤이 맨 위로 올라가면 원래 색으로
  }
};

// 드롭다운
const JS_dropdown = (event) => {
  const choose = event.target.value;
  console.log(choose);

  document.getElementById(
    "html_dropdown_title"
  ).style.cssText = `--CSSment: "${choose}"`;
  document.getElementById("html_dropdown_title").click(); // 선택시 자동으로 다시 클릭해서 끄기

  const storage_diary =
    window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);


  let filtering_list;
  switch (choose) {
    case "행복해요": {
      filtering_list = diary_list.filter((element) => element.기분 === "happy");
      break;
    }
    case "슬퍼요": {
      filtering_list = diary_list.filter((element) => element.기분 === "sad");
      break;
    }
    case "놀랐어요": {
      filtering_list = diary_list.filter((element) => element.기분 === "surprise");
      break;
    }
    case "화나요": {
      filtering_list = diary_list.filter((element) => element.기분 === "angry");
      break;
    }
    case "기타": {
      filtering_list = diary_list.filter((element) => element.기분 === "etc");
      break;
    }
    default: {
      filtering_list = diary_list;
      break;
    }
  }
  


  const newdiary = filtering_list
  .map(
    (element, main) => `
      <a href="./detail.html?number=${main}" style="text-decoration: none;">
        <div class="CSS_diary">
          <div class="diary_image">
          <img class="cancel_button" src="./assets/close_button.png" onclick="JS_cancel(event, ${main})" />
            ${
              element.기분 === "happy"
              ? '<img class="feeling_image" src="./assets/happy.png" alt="happy" />'
              : ""
            }
            ${
              element.기분 === "sad"
              ? '<img class="feeling_image" src="./assets/sad.png" alt="sad" />'
              : ""
            }
            ${
              element.기분 === "surprise"
              ? '<img class="feeling_image" src="./assets/surprise.png" alt="surprise" />'
              : ""
            }
            ${
              element.기분 === "angry"
              ? '<img class="feeling_image" src="./assets/angry.png" alt="angry" />'
              : ""
            }
            ${
              element.기분 === "etc"
              ? '<img class="feeling_image" src="./assets/etc.png" alt="etc" />'
              : ""
            }
            </div>
            <div class="diary_content">
            ${
              element.기분 === "happy"
              ? `<div class="feeling happy">행복해요</div>`
              : ""
            }
            ${
              element.기분 === "sad"
              ? `<div class="feeling sad">슬퍼요</div>`
              : ""
            }
            ${
              element.기분 === "surprise"
              ? `<div class="feeling surprise">놀랐어요</div>`
              : ""
            }
            ${
              element.기분 === "angry"
              ? `<div class="feeling angry">화나요</div>`
              : ""
            }
            ${
              element.기분 === "etc"
              ? `<div class="feeling etc">기타</div>`
              : ""
            }
            <div class="date">${element.작성일}</div>
          </div>
        <div class="title"> ${element.제목}</div>
      </div>
    </a>
    `
  )
  .join("");
  window.document.getElementById("show_diary_html").innerHTML =
  newdiary;

};


const JS_open = () => {
  document.getElementById("html_modal_group").style = "display: block;"
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'});
  document.body.style.overflow = 'hidden';
}

const JS_close = () => {
  document.getElementById("html_modal_group").style = "display: none;"
  document.getElementById("html_reg_fin").style = "display: none;"
  document.getElementById("html_reg_cancel").style = "display: none;"
  document.getElementById("html_post_delete").style = "display: none;"

  document.body.style.removeProperty('overflow');

  resetFormData();
}

const JS_confirm = () => {
  document.getElementById("html_reg_cancel").style = "display: block;"
}

const JS_back = () => {
  document.getElementById("html_reg_cancel").style = "display: none;"
}

window.addEventListener("keydown", (event) => {
  if(event.key === "Escape") {
        JS_close();
      }
  })


function resetFormData() {
  // 일기 폼 초기화
  const el = document.querySelectorAll("input[type=text], textarea");
  for (let i = 0; i < el.length; i++) {
    el[i].value = "";
  }
};

// 플로팅 버튼
const JS_scroll = () => {
  
  window.scrollTo({top: 0, behavior: "smooth"})
}

// 네비게이션 클릭
const JS_click = (clicked) => {
  switch(clicked) {
      case "diary": {
        location.href = "./main.html"
          break;
      }
      case "photos": {
        location.href = "./main2.html"
          break;
      }
  }
}


// 검색어 입력
const JS_search = (event) => {
let timer;
clearTimeout(timer);
timer = setTimeout(() => {
  const keyword = event.target.value;
  console.log(keyword)

  const storage_diary =
    window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);

  const results = diary_list.filter((element) =>
    element.제목.includes(keyword)
  );
  const newdiary = results
    .map(
      (element, main) => `
        <a href="./detail.html?number=${main}" style="text-decoration: none;">
          <div class="CSS_diary">
          <div class="diary_image">
          <img class="cancel_button" src="./assets/close_button.png" onclick="JS_cancel(event, ${main})" />
            ${
              element.기분 === "happy"
              ? '<img class="feeling_image" src="./assets/happy.png" alt="happy" />'
              : ""
            }
            ${
              element.기분 === "sad"
              ? '<img class="feeling_image" src="./assets/sad.png" alt="sad" />'
              : ""
            }
            ${
              element.기분 === "surprise"
              ? '<img class="feeling_image" src="./assets/surprise.png" alt="surprise" />'
              : ""
            }
            ${
              element.기분 === "angry"
              ? '<img class="feeling_image" src="./assets/angry.png" alt="angry" />'
              : ""
            }
            ${
              element.기분 === "etc"
              ? '<img class="feeling_image" src="./assets/etc.png" alt="etc" />'
              : ""
            }
            </div>
            <div class="diary_content">
            ${
              element.기분 === "happy"
              ? `<div class="feeling happy">행복해요</div>`
              : ""
            }
            ${
              element.기분 === "sad"
              ? `<div class="feeling sad">슬퍼요</div>`
              : ""
            }
            ${
              element.기분 === "surprise"
              ? `<div class="feeling surprise">놀랐어요</div>`
              : ""
            }
            ${
              element.기분 === "angry"
              ? `<div class="feeling angry">화나요</div>`
              : ""
            }
            ${
              element.기분 === "etc"
              ? `<div class="feeling etc">기타</div>`
              : ""
            }
            <div class="date">${element.작성일}</div>
          </div>
        <div class="title"> ${element.제목}</div>
      </div>
    </a>
    `
  )
  .join("");
  window.document.getElementById("show_diary_html").innerHTML =
  newdiary;

  }, 1000);
};



// 다크모드
const JS_dark = (event) => {
if (event.target.checked === true) {
  document.documentElement.setAttribute("darkmode", "on");
} else {
  document.documentElement.setAttribute("darkmode", "off");
}
};

// 내용 미입력 시 등록 버튼 비활성화
window.addEventListener("keyup", () => {
// 제목, 내용이 모두 입력됐는지 확인
const title_box = window.document.getElementById("html_title");
const content_box = window.document.getElementById("html_content");
if (title_box && content_box) {
  const regist = document.getElementById("regist_button");
  if (title_box.value !== "" && content_box.value !== "") {
    regist.disabled = false;
    document.getElementById("regist_button").style = "display: block;"
  } else if (title_box.value === "" || content_box.value === "") {
    document.getElementById("regist_button").style = "background-color: #C7C7C7; color: rgba(242, 242, 242, 1)";
    regist.disabled = true;
  }
}
});


// 페이지네이션
let currentPage = 1; // 현재 페이지
const entriesPerPage = 12; // 페이지당 다이어리 카드 수

// 총 페이지 수를 계산하는 함수
const TotalPages = () => {
  const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);
  return Math.ceil(diary_list.length / entriesPerPage);
};

// 특정 페이지를 표시하는 함수
const displayPage = (page) => {
const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
const diary_list = JSON.parse(storage_diary);

// 현재 페이지에 대한 항목의 시작 및 끝 인덱스 계산
const startIndex = (page - 1) * entriesPerPage;
const endIndex = startIndex + entriesPerPage;

JS_drawing(startIndex, endIndex);

// 현재 페이지 버튼 생성 및 업데이트
updatePagination();
};

// 마지막 페이지로 이동
const JS_nextPage = () => {
  currentPage = TotalPages(); // 마지막 페이지로 이동
  displayPage(currentPage);
};

// 첫 페이지로 이동
const JS_beforePage = () => {
  currentPage = 1; // 첫 페이지로 이동
  displayPage(currentPage);
};

// 특정 페이지로 이동
const goToPage = (page) => {
  currentPage = page;
  displayPage(currentPage);
};

// 수정 필요
// // 페이지 버튼을 생성하고 페이지네이션 표시를 업데이트하는 함수
// const updatePagination = () => {
//   const paginationContainer = document.getElementById('pagination');
//   paginationContainer.innerHTML = ''; // 기존 페이지 버튼 제거

//   const totalPages = TotalPages();
//   for (let i = 1; i <= totalPages; i++) {
//     const pageButton = document.createElement('button');
//     pageButton.textContent = i;
//     pageButton.className = 'pagination_button'; // 클래스 이름을 추가해 스타일 적용 가능
//     pageButton.onclick = () => goToPage(i);
//     if (i === currentPage) {
//       pageButton.classList.add('active'); // 현재 페이지 버튼 강조
//     }
//     paginationContainer.appendChild(pageButton);
//   }
      
// };


// 초기 페이지 로드 시
window.onload = () => {
  displayPage(currentPage);
};

// 버튼 클릭 이벤트 추가
document.querySelector('.pagination_icon.next').addEventListener('click', JS_nextPage);
document.querySelector('.pagination_icon.prev').addEventListener('click', JS_beforePage);