window.onload = () => {
  console.log("민지의 다이어리에 오신 것을 환영합니다.");
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

  // 1-2. 오늘의 기분 불러오기
  let 행복담는통 =
    window.document.getElementsByName("HTML_기분선택버튼")[0].checked === true;
  let 슬픔담는통 =
    window.document.getElementsByName("HTML_기분선택버튼")[1].checked === true;
  let 놀람담는통 =
    window.document.getElementsByName("HTML_기분선택버튼")[2].checked === true;
  let 화남담는통 =
    window.document.getElementsByName("HTML_기분선택버튼")[3].checked === true;
  let 기타담는통 =
    window.document.getElementsByName("HTML_기분선택버튼")[4].checked === true;

  // 2. 일기목록에 일기 추가하기
  const 일기담는통 = {
    제목: 제목담는통,
    내용: 내용담는통,
    작성일: 날짜담는통,
  };
  일기목록.push(일기담는통);

  // 3. 마지막으로 추가한 일기번호 가져오기
  const 일기번호 = 일기목록.length - 1;

  // 4. 현재까지 그려진 일기도화지 가져오기
  const HTML_기존의일기도화지 =
    window.document.getElementById("HTML_일기보여주는곳").innerHTML;

  // 5. 새로운 일기도화지 만들기
  const HTML_새로운일기도화지 = `
    <div class="CSS_일기" onclick="JS_글보기기능(${일기번호})">
        <div class="CSS_일기사진">
          ${
            행복담는통 === true
              ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
              : ""
          }
          ${
            슬픔담는통 === true
              ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
              : ""
          }
          ${
            놀람담는통 === true
              ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
              : ""
          }
          ${
            화남담는통 === true
              ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
              : ""
          }
          ${
            기타담는통 === true
              ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
              : ""
          }
        </div>
        <div class="CSS_일기내용">
          ${
            행복담는통 === true
              ? `<div class="CSS_기분 CSS_행복">행복해요</div>`
              : ""
          }
          ${
            슬픔담는통 === true
              ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>`
              : ""
          }
          ${
            놀람담는통 === true
              ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>`
              : ""
          }
          ${
            화남담는통 === true
              ? `<div class="CSS_기분 CSS_화남">화나요</div>`
              : ""
          }
          ${
            기타담는통 === true
              ? `<div class="CSS_기분 CSS_기타">기타</div>`
              : ""
          }
          <div class="CSS_날짜">${일기담는통.작성일}</div>
        </div>
        <div class="CSS_일기제목"> ${일기담는통.제목}</div>
    </div>
  `;

  // 6. HTML_일기보여주는곳에 기존의 일기도화지와 새로운 일기도화지 함께 보여주기
  window.document.getElementById("HTML_일기보여주는곳").innerHTML =
    HTML_기존의일기도화지 + HTML_새로운일기도화지;
};

const JS_글보기기능 = (일기번호받는통) => {
  const 일기담는통 = 일기목록[일기번호받는통];
  const 제목담는통 = 일기담는통.제목;
  const 내용담는통 = 일기담는통.내용;

  alert(`
    제목: ${제목담는통}
    내용: ${내용담는통}       
  `);
};
const JS_필터링기능 = (event) => {
  const 선택지 = event.target.value
  console.log(선택지)

  let 목록 = [
      {상태: "기쁨"},
      {상태: "행복"},
      {상태: "슬픔"},
      {상태: "기쁨"}
  ]
  switch(선택지) {
      case "기쁨선택": {
          목록 = 목록.filter(el => el.상태 === "기쁨")
          break;
      }
      case "행복선택": {
          목록 = 목록.filter(el => el.상태 === "행복")
          break;
      }
      case "슬픔선택": {
          목록 = 목록.filter(el => el.상태 === "슬픔")
          break;
      }
  }
  
  console.log(목록)
}