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
  
    // 1. 푸터가 보일 때는, 화면과 상관없이 사진에 고정시키기
    if (screenHeight >= TofooterHeight) {
      document.getElementById("floating_button").style = `
        position: relative;
        bottom: 0;
        left: 98%;
      `;
  
      // 2. 푸터가 안보일 때는, 사진과 상관없이 화면에 고정시키기
    } else {
      document.getElementById("floating_button").style = `
        position: fixed;
        bottom: 4rem;
        right: 2rem;
      `;
    }
  });


  const JS_drawing = () => {
  
  // 1. 스토리지에 저장된 일기목록 가져오기
  const storage_diary =
    window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);

  // 2. 일기목록 화면에 새롭게 전체 그리기
  const newdiary = diary_list
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
            <div class="title">${element.제목}</div>
          </div>
        </div>
       </a>
      `
    )
    .join("");
    window.document.getElementById("show_diary_html").innerHTML = newdiary;
    
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
    // JS_drawing();
    JS_filtering({target: {value: currentFilter}});

    JS_close();

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
    const select_text = event.target.nextElementSibling.innerText;
    document.getElementById("html_dropdown_title").style.cssText = `--CSSment: "${select_text}"`
    document.getElementById("html_dropdown_title").click()
    
  }
  

  const JS_filtering = (event) => {
    currentFilter = event.target.value;
    const choose = currentFilter;

    const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
    const diary_list = JSON.parse(storage_diary);
    let filtering_list;
      

    switch (choose) {
      case "happy": {
        filtering_list = diary_list.filter((element) => element.기분 === "happy");
        break;
      }
      case "sad": {
        filtering_list = diary_list.filter((element) => element.기분 === "sad");
        break;
      }
      case "surprise": {
        filtering_list = diary_list.filter((element) => element.기분 === "surprise");
        break;
      }
      case "angry": {
        filtering_list = diary_list.filter((element) => element.기분 === "angry");
        break;
      }
      case "etc": {
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
// const search_result = window.document.getElementById("search_text").innerText

// let timer

// const JS_search = (event) => {
//     clearTimeout(timer)

//     timer = setTimeout(() => {
//         const keyword = event.target.value
//         console.log(keyword)

//         const results = search_result.filter(el => el.includes(keyword))
//         console.log(results)

//         document.getElementById("show_diary_html").innerHTML = results

//     }, 2000)
            
// }