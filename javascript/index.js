window.onload = () => {
  console.log("민지의 다이어리에 오신 것을 환영합니다.");

  // 1. 시작하면 일기 목록에 그리기
  JS_일기그리기기능();
};

const JS_일기그리기기능 = () => {
  // 1. 스토리지에 저장된 일기목록 가져오기
  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  // 2. 일기목록 화면에 새롭게 전체 그리기
  const HTML_새로운일기도화지 = 일기목록
    .map(
      (el, index) => `
        <a href="./detail.html?number=${index}">
          <div class="CSS_일기">
              <div class="CSS_일기사진">
              <div id="삭제하기" class="삭제하기버튼" onclick="JS_삭제하기기능(event)">❌</div>
                ${
                  el.기분 === "행복"
                    ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
                    : ""
                }
                ${
                  el.기분 === "슬픔"
                    ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
                    : ""
                }
                ${
                  el.기분 === "놀람"
                    ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
                    : ""
                }
                ${
                  el.기분 === "화남"
                    ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
                    : ""
                }
                ${
                  el.기분 === "기타"
                    ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
                    : ""
                }
              </div>
              <div class="CSS_일기내용">
                ${
                  el.기분 === "행복"
                    ? `<div class="CSS_기분 CSS_행복">행복해요</div>`
                    : ""
                }
                ${
                  el.기분 === "슬픔"
                    ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>`
                    : ""
                }
                ${
                  el.기분 === "놀람"
                    ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>`
                    : ""
                }
                ${
                  el.기분 === "화남"
                    ? `<div class="CSS_기분 CSS_화남">화나요</div>`
                    : ""
                }
                ${
                  el.기분 === "기타"
                    ? `<div class="CSS_기분 CSS_기타">기타</div>`
                    : ""
                }
                <div class="CSS_날짜">${el.작성일}</div>
              </div>
              <div class="CSS_일기제목"> ${el.제목}</div>
          </div>
        </a>
  `
    )
    .join("");
  window.document.getElementById("HTML_일기보여주는곳").innerHTML =
    HTML_새로운일기도화지;
};

const 일기목록 = [];

const JS_글쓰기기능 = () => {
  // 0. 현재 날짜 가져오기

  const date = new Date();

  const options = {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    date: date.getDate(),
  };

  // 1-1. 내가쓴 일기 불러오기
  const 날짜담는통 = options.year + "-" + options.month + "-" + options.date;
  const 제목담는통 = window.document.getElementById("HTML_제목입력창").value;
  const 내용담는통 = window.document.getElementById("HTML_내용입력창").value;
  let 기분담는통;
  window.document.getElementsByName("HTML_기분선택버튼").forEach((el) => {
    if (el.checked) 기분담는통 = el.value;
  });

  // 2. 일기목록에 일기 추가하기
  const 일기담는통 = {
    제목: 제목담는통,
    내용: 내용담는통,
    기분: 기분담는통,
    작성일: 날짜담는통,
  };

  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  일기목록.push(일기담는통);
  window.localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));

  JS_일기그리기기능();
};

const JS_글보기기능 = (일기번호받는통) => {
  const 일기담는통 = 일기목록[일기번호받는통];
  const 제목담는통 = 일기담는통.제목;
  const 내용담는통 = 일기담는통.내용;

  alert(`
    제목: ${제목담는통}
    내용: ${내용담는통}       
  `);

  location.href = `./detail.html?일기번호=${일기번호받는통}`;
};

const JS_필터링기능 = (event) => {
  const 선택한내용 = event.target.value;

  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  let 필터링된일기목록;

  switch (선택한내용) {
    case "HTML_행복선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "행복");
      break;
    }
    case "HTML_슬픔선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "슬픔");
      break;
    }
    case "HTML_놀람선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "놀람");
      break;
    }
    case "HTML_화남선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "화남");
      break;
    }
    case "HTML_기타선택": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "기타");
      break;
    }
    default: {
      필터링된일기목록 = 일기목록;
      break;
    }
  }

  const HTML_새로운일기도화지 = 필터링된일기목록
    .map(
      (el, index) => `
        <a href="./detail.html?number=${index}">
          <div class="CSS_일기">
              <div class="CSS_일기사진">
                <div id="삭제하기" class="삭제하기버튼" onclick="JS_삭제하기기능(event)">❌</div>
                ${
                  el.기분 === "행복"
                    ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
                    : ""
                }
                ${
                  el.기분 === "슬픔"
                    ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
                    : ""
                }
                ${
                  el.기분 === "놀람"
                    ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
                    : ""
                }
                ${
                  el.기분 === "화남"
                    ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
                    : ""
                }
                ${
                  el.기분 === "기타"
                    ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
                    : ""
                }
              </div>
              <div class="CSS_일기내용">
                ${
                  el.기분 === "행복"
                    ? `<div class="CSS_기분 CSS_행복">행복해요</div>`
                    : ""
                }
                ${
                  el.기분 === "슬픔"
                    ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>`
                    : ""
                }
                ${
                  el.기분 === "놀람"
                    ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>`
                    : ""
                }
                ${
                  el.기분 === "화남"
                    ? `<div class="CSS_기분 CSS_화남">화나요</div>`
                    : ""
                }
                ${
                  el.기분 === "기타"
                    ? `<div class="CSS_기분 CSS_기타">기타</div>`
                    : ""
                }
                <div class="CSS_날짜">${el.작성일}</div>
              </div>
              <div class="CSS_일기제목"> ${el.제목}</div>
          </div>
        </a>
      `
    )
    .join("");
  window.document.getElementById("HTML_일기보여주는곳").innerHTML =
    HTML_새로운일기도화지;
};


// 스크롤 감지하는 부분
window.addEventListener("scroll", () => {
  const 스크롤내려간길이 = window.screenY

  if(스크롤내려간길이 > 0) {
    document.querySelector(".CSS_필터").style = "backGround: black; color: white"
  } else {
    document.querySelector(".CSS_필터").style = "border: none"
  }
})

// 삭제하기버튼 구현해야하는 자리 - preventDefault()까지는 구현함.
// 삭제 누르면 로컬 호출해서 해당 인덱스를 삭제해야함


const JS_삭제하기기능 = (event) => {

  const 삭제하기 = document.querySelector(".삭제하기버튼")
  event.preventDefault()
  alert("삭제")
  const 스토리지에저장된일기목록 = window.localStorage.getItem("민지의일기목록") ?? "[]";
  let 일기목록 = JSON.parse(스토리지에저장된일기목록);

  console.log(일기목록)
}

console.log(삭제하기)