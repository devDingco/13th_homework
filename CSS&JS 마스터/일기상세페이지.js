const queryString = location.search;
const params = new URLSearchParams(queryString);
const diaryCardNumber = Number(params.get("diaryCardIndex"));
const diaryCardList = JSON.parse(localStorage.getItem("다이어리카드배열"));
const diaryCard = diaryCardList[diaryCardNumber];

window.onload = () => {
  const diaryTite = diaryCard.title;
  const diaryCardImage = diaryCard.image;
  const diaryEmotionText = diaryCard.emotionText;
  const diaryCardDate = diaryCard.date + " 작성";
  const diaryCardTextArea = diaryCard.textarea;
  dairyDetailRendering(
    diaryTite,
    diaryCardImage,
    diaryEmotionText,
    diaryCardDate,
    diaryCardTextArea
  );
  remembranceRendering(diaryCard.remembrance);
};

const dairyDetailRendering = (
  diaryTite,
  diaryCardImage,
  diaryEmotionText,
  diaryCardDate,
  diaryCardTextArea
) => {
  document.getElementById("layout").innerHTML = `
  <header>
        <div class="header_text">민지의 다이어리</div>
      </header>
      <main>
        <div class="main_header">
          <div id="main_header_text">${diaryTite}</div>
          <div class="main_header_detail">
            <div class="detail_emotion">
              <img src="${diaryCardImage}" alt="" id="emotionImage" />
              <div id="emotion_text">${diaryEmotionText}</div>
            </div>
            <div id="detail_date">${diaryCardDate}</div>
          </div>
        </div>
        <div class="main_body">
          <div class="body_title">내용</div>
          <div id="body_content">${diaryCardTextArea}</div>
        </div>
        <div class="copyBox">
          <img src="./assets/copy_outline_light_m.svg" onclick="copy()" />
          <div class="copyText">내용복사</div>
        </div>
        <div class="ButtonBox">
          <button onclick="modify()">수정</button>
          <button onclick="deleteButton()">삭제</button>
        </div>
      </main>
      <div class="remembranceBox">
        <div class="inputBox">
          <div class="inputTitle">회고</div>
          <div class="inputTextBox">
            <input
              type="text"
              id="inputText"
              placeholder="회고를 남겨보세요."
            />
            <button class="inputButton" onclick="addText()">입력</button>
          </div>
        </div>
        <div id="remembranceTextBox">
          <!--회고텍스트넣을자리-->
        </div>
      </div>
  `;
};

// window.onload = () => {
//   document.getElementById("main_header_text").innerText = diaryCard.title;
//   document.getElementById("emotionImage").src = diaryCard.image;
//   document.getElementById("emotion_text").innerText = diaryCard.emotionText;
//   document.getElementById("detail_date").innerText = diaryCard.date + " 작성";
//   document.getElementById("body_content").innerText = diaryCard.textarea;
//   remembranceRendering(diaryCard.remembrance);
// };

const modify = () => {
  window.location.href = `수정.html?diaryCardIndex=${diaryCardNumber}`;
};

const deleteButton = () => {
  document.getElementById("modal_group4").style = "display: block";
};

const createDate = () => {
  const date = new Date();
  const getYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDate = date.getDate();
  const writeDate = "[" + getYear + ". " + getMonth + ". " + getDate + "]";

  return writeDate;
};

const addText = () => {
  const remembranceObject = {};
  // 1. 객체 값 채우기
  const remembranceText = document.getElementById("inputText").value;
  remembranceObject.text = remembranceText;
  remembranceObject.date = createDate();
  remembranceObject.diaryNumber = diaryCardNumber;
  // 2. 다이어리카드 {remembrance:[]}에 객체 집어넣기
  diaryCard.remembrance.push(remembranceObject);
  // 3. 배열 JSON으로 바꾸기
  const diaryCardJson = JSON.stringify(diaryCardList);
  // 4. 로컬스토리지에 만든JSON 집어넣기
  localStorage.setItem("다이어리카드배열", diaryCardJson);
  remembranceRendering(diaryCard.remembrance);
};

const remembranceRendering = (diaryCardRemembrance) => {
  const remembranceArr = diaryCardRemembrance.map(
    (el) => `
        <div class="remembranceText">${el.text} ${el.date}</div>
    `
  );

  const remembranceHtml = remembranceArr.join("");
  const remembranceContainer = document.getElementById("remembranceTextBox");

  remembranceContainer.innerHTML = remembranceHtml;
};

const copy = () => {
  const content = diaryCard.textarea;
  navigator.clipboard.writeText(content);
  document.getElementById("copyCheckBox").style = "display: block;";
};

const deleteDiaryCancel = () => {
  document.getElementById("modal_group4").style = "display: none;";
};

const realDeleteDiary = () => {
  const diaryCardIndex = diaryCardNumber;
  const editDiaryCard = JSON.parse(localStorage.getItem("다이어리카드배열"));
  editDiaryCard.splice(diaryCardIndex, 1);
  localStorage.setItem("다이어리카드배열", JSON.stringify(editDiaryCard));
  window.location.href = "./메인페이지.html";
  document.getElementById("modal_group4").style = "display: none";
};
