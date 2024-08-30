const registerButton = document.querySelector("button");
const diaryContents = document.getElementById("diaryContents");
let createDiaryTag = [];

const registerDiary = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDate()).padStart(2, 0);
  const registrationDate = `${year}. ${month}. ${day}`;

  const checkedEtc = document.getElementById("check_etc");
  const checkedSad = document.getElementById("check_sad");
  const checkedUpset = document.getElementById("check_upset");
  const checkedHappy = document.getElementById("check_happy");
  const checkedSurprise = document.getElementById("check_surprise");

  const moodCheckList = [
    checkedHappy,
    checkedSad,
    checkedSurprise,
    checkedUpset,
    checkedEtc,
  ];

  const findCheckedMood = moodCheckList.filter((mood) => mood.checked);
  const checkedMood = findCheckedMood[0].nextElementSibling.innerText;

  const diaryTitle =
    document.getElementsByClassName("diary_title_window")[0].value;
  const diaryContents = document.getElementsByClassName(
    "diary_contents_window"
  )[0].value;

  const coverName = findCheckedMood[0].id.split(`_`)[1];
  const fontColor = `${coverName}_emotion_font_color`;

  createHtml(
    coverName,
    registrationDate,
    fontColor,
    checkedMood,
    diaryTitle,
    diaryContents
  );
};

const createHtml = (coverName, date, color, mood, title, diaryContents) => {
  const diaryCard = `
    <div class="diary_entry">
      <img
        class="diary_cover"
        src="./image/${coverName}.png"
        width="774px"
      />
      <div class="diary_entry_summary">
        <div class="emotion_date_info">
          <div class="${color}">${mood}</div>
          <div class="date">${date}</div>
        </div>
        <div class="diary_title_area">
          ${title}
        </div>
      </div>
    </div>`;

  // if(document.getElementById('diary_entry_container').length){

  // }

  const test = document.querySelectorAll('.diary_entry_container')

  console.log(test[test.length-1].childElementCount)

  const diaryEntryContainer = document.createElement('div')
  diaryEntryContainer.className = 'diary_entry_container'
  diaryEntryContainer.id = 'diary_entry_container'
  diaryEntryContainer.innerHTML = diaryCard

  const article = document.getElementById("article");

  return article.append(diaryEntryContainer);
};

registerButton.addEventListener("click", registerDiary);
