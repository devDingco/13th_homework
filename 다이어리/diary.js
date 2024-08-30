const registerButton = document.querySelector("button");
const diaryContent = document.getElementById("diaryContent");
const localStorageLength = localStorage.length;

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
  const diaryContent = document.getElementsByClassName(
    "diary_contents_window"
  )[0].value;

  const coverName = findCheckedMood[0].id.split(`_`)[1];
  const fontColor = `${coverName}_emotion_font_color`;

  const uuid = String(Math.floor(Math.random() * 1000000)).padStart(6, 0);

  let diaryEntry = {
    id: uuid,
    color: fontColor,
    mood: checkedMood,
    title: diaryTitle,
    imageName: coverName,
    content: diaryContent,
    date: registrationDate,
  };

  localStorage.setItem(uuid, JSON.stringify(diaryEntry));
  createHtml(diaryEntry);
};

const createHtml = (diaryEntry) => {
  const diaryCard = `
    <a href="./diary-detail.html?id=${diaryEntry.id}" class="diary_detail">
      <div class="diary_entry">
          <img
            class="diary_cover"
            src="./image/${diaryEntry.imageName}.png"
            width="774px"
          />
          <div class="diary_entry_summary">
            <div class="emotion_date_info">
              <div class="${diaryEntry.color}">${diaryEntry.mood}</div>
              <div class="date">${diaryEntry.date}</div>
            </div>
            <div class="diary_title_area">
              ${diaryEntry.title}
            </div>
          </div>
      </div>
    </a>
    `;

    const diaryEntryContainer = document.querySelectorAll('#diary_entry_container')

    if(diaryEntryContainer[diaryEntryContainer.length-1].children.length == 2){
      const diaryEntryContainer = document.createElement("div");
      diaryEntryContainer.className = "diary_entry_container";
      diaryEntryContainer.id = "diary_entry_container";
      diaryEntryContainer.innerHTML = diaryCard;
      const article = document.getElementById("article");
    
      return article.appendChild(diaryEntryContainer);
    }else {
      return diaryEntryContainer[diaryEntryContainer.length-1].innerHTML += diaryCard
    }


};

registerButton.addEventListener("click", registerDiary);