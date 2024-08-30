
const diaryArray = [
  {
    moodType: "슬퍼요",
    writeDate: "2021-07-01",
    title: "타이틀 영역입니다. 타이틀 영역입니다. 타이틀 영역입니다. 타이틀 영역입니다. 타이틀 영역입니다.",
    content: "내용 영역입니다."
  },
  {
    moodType: "놀랐어요",
    writeDate: "2021-07-01",
    title: "타이틀 영역입니다.",
    content: "내용 영역입니다."
  },
  {
    moodType: "화나요",
    writeDate: "2021-07-01",
    title: "타이틀 영역입니다.",
    content: "내용 영역입니다."
  },
  {
    moodType: "행복해요",
    writeDate: "2021-07-01",
    title: "타이틀 영역입니다.",
    content: "내용 영역입니다."
  },
  {
    moodType: "기타",
    writeDate: "2021-07-01",
    title: "타이틀 영역입니다.",
    content: "내용 영역입니다."
  },
  {
    moodType: "행복해요",
    writeDate: "2021-07-01",
    title: "타이틀 영역입니다.",
    content: "내용 영역입니다."
  }
];

const moodTypeSet = {
  슬퍼요: { imgSrc: "./img/mood_1.png", colorNum: 1 },
  놀랐어요: { imgSrc: "./img/mood_2.png", colorNum: 2 },
  화나요: { imgSrc: "./img/mood_3.png", colorNum: 3 },
  행복해요: { imgSrc: "./img/mood_4.png", colorNum: 4 },
  기타: { imgSrc: "./img/mood_5.png", colorNum: 5 }
};


if (!localStorage.getItem("diaryArray")) {
  localStorage.setItem("diaryArray", JSON.stringify(diaryArray));
}

const diaryArr = JSON.parse(localStorage.getItem("diaryArray"));
console.log(diaryArr);

// 이름 설정
const nameSet = () => {
  const userName = prompt("이름을 적어주세요: ");
  const nameElement = document.querySelectorAll(".userName");
  nameElement.forEach((element) => {
    element.innerText = userName;
  });
}
nameSet();


// 다이어리 리스트 노출 함수
const diaryListSet = (arr) => {

  let diaryUl = diaryElement.querySelector('ul');
  if (!diaryUl) {
    diaryUl = document.createElement("ul");
    diaryElement.appendChild(diaryUl);
  }

  // console.log(arr);
  arr.map((diary, index) => {
    const moodType = diary.moodType;
    const moodTypeInfo = moodTypeSet[moodType];

    diaryUl.innerHTML += `
    <li onclick="popDetail(${index})">
      <figure>
        <img src="${moodTypeInfo.imgSrc}" alt="오늘의 기분 ${moodType}" />
        <figcaption>
          <div class="infoTop">
            <span class="moodText moodTextType${moodTypeInfo.colorNum}">${moodType}</span>
            <span class="diaryDate">${diary.writeDate}</span>
          </div>
          <h3>${diary.title}</h3>
        </figcaption>
      </figure>
    </li>
    `;
  })
}
// 다이어리 리스트 값에 따른 노출처리
const diaryElement = document.querySelector(".diaryList");
if (diaryArr.length === 0) {
  diaryElement.innerHTML = "<p class='empty'>등록된 일기가 없습니다.</p>";
  console.log("작성된 일기가 없습니다.");
} else {
  diaryListSet(diaryArr);
}

// 일기 내용 작성 확인에 따른 저장 버튼 활성화 함수
const textCheck = (e) => {
  const diaryTitle = document.querySelector(".diaryTitle");
  const diaryDesc = document.querySelector(".diaryDesc");
  if (diaryTitle.value.length > 0 && diaryDesc.value.length > 0) {
    const diaryWriteBtn = document.querySelector(".diaryWriteBtn");
    diaryWriteBtn.classList.add("active");
    diaryWriteBtn.disabled = false;
  } else {
    const diaryWriteBtn = document.querySelector(".diaryWriteBtn");
    diaryWriteBtn.classList.remove("active");
    diaryWriteBtn.disabled = true;
  }
}



// 일기 저장 함수
const diarySave = () => {

  const moodTypeValue = document.querySelector("input[name='moodType']:checked").value;
  console.log(moodTypeValue);
  const diaryTitle = document.querySelector(".diaryTitle").value;
  console.log(diaryTitle);
  const diaryDesc = document.querySelector(".diaryDesc").value;
  console.log(diaryDesc);

  const diary = {
    moodType: moodTypeValue,
    writeDate: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    title: diaryTitle,
    content: diaryDesc
  };

  diaryArr.push(diary);
  localStorage.setItem("diaryArray", JSON.stringify(diaryArr));


  if (diaryArr.length > 0) {
    const newDiary = document.createElement('li');
    newDiary.onclick = () => popDetail(diaryArr.length - 1);
    const moodTypeInfo = moodTypeSet[moodTypeValue];
    newDiary.innerHTML = `
     <figure>
        <img src="${moodTypeInfo.imgSrc}" alt="오늘의 기분" />
        <figcaption>
          <div class="infoTop">
            <span class="moodText moodTextType${moodTypeInfo.colorNum}">${moodTypeValue}</span>
            <span class="diaryDate">2024.01.01</span>
          </div>
          <h3>${diaryTitle}</h3>
        </figcaption>
      </figure>
    `;
    diaryElement.querySelector('ul').appendChild(newDiary);
  } else {
    diaryListSet(diaryArr);
  }
  console.log(diaryArr);
}

// 일기 상세 팝업 함수
const popDetail = (index) => {
  const diary = diaryArr[index];
  alert(`
  기분: ${diary.moodType}
  날짜: ${diary.writeDate}
  제목: ${diary.title}
  내용: ${diary.content}
  `);
}



