
window.onload = () => {
  console.log("민지의 다이어리에 오신 것을 환영합니다.");

  diaryRegister();


    window.addEventListener("scroll", scrolling);

};

//로컬에서 데이터 가져오기
const getFromLocalstorage = (storageKey) => {
  try {
     const data = window.localStorage.getItem(storageKey) ?? "[]";
      return JSON.parse(data);
  } catch (error) {
      console.error("데이터를 로컬에서 가져오는데 실패했습니다", error);
      return [];
  }
};
 
 //로컬로 데이터를 저장하기
const saveToLocalstorage = (storageKey,data) => {
  try {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
      console.error("데이터를 로컬저장하는데 실패했습니다", error);
  }
};

// "URL에서 원하는 'number' 가져오기"
const getDiaryNumber = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return parseInt(urlParams.get("number"),10) ;
      
};

// 일기데이터를 로컬에서 가져오기
const getDiaryList = (storageKey) => {
  const diaryNumber = getDiaryNumber();
  const diaryList = getFromLocalstorage(storageKey);

  return { diaryList, diaryNumber };
};

// 일기데이터를 로컬에 저장하기
const saveDiaryList = (storageKey, diaryList) => {
  saveToLocalstorage(storageKey, diaryList);
};

window.addEventListener("scroll", () => {
  const 화면위에서푸터위까지길이 = document
    .getElementById("HTML_푸터")
    .getBoundingClientRect().top;
  const 보이는화면길이 = window.innerHeight;
  const 보이는화면너비 = window.innerWidth;

  // 1. 푸터가 보일 때는, 화면과 상관없이 사진에 고정시키기
  if (보이는화면길이 >= 화면위에서푸터위까지길이) {
    if (보이는화면너비 >= 849) {
      document.getElementById("HTML_플로팅버튼").style = `
      position: relative;
      bottom: 0;
      left: 97%;
    `;
    } else {
      document.getElementById("HTML_플로팅버튼").style = `
      position: relative;
      bottom: 0;
      left: 90%;
    `;
    }

    // 2. 푸터가 안보일 때는, 사진과 상관없이 화면에 고정시키기
  } else {
    document.getElementById("HTML_플로팅버튼").style = `
      position: fixed;
      bottom: 4rem;
      right: 2rem;
    `;
  }
});


const generateDiaryHTML = (diaryList, baseUrl = "/homework/section05/05-detail.html") => {
  return diaryList.map((el, index) => `
   <a href="${baseUrl}?number=${index}">
            <div class="diary__wrappaer" onclick="addCancelBtn()">
                <div class="diaryImgs">
                    ${el.mood === "행복"
      ? '<img class="moodImg" src="/homework/assets/images/happiness.png" alt="행복" />'
      : ""
    }
                    ${el.mood === "슬픔"
      ? '<img class="moodImg" src="/homework/assets/images/sadness.png" alt="슬픔" />'
      : ""
    }
                    ${el.mood === "놀람"
      ? '<img class="moodImg" src="/homework/assets/images/surprise.png" alt="놀람" />'
      : ""
    }
                    ${el.mood === "화남"
      ? '<img class="moodImg" src="/homework/assets/images/angry.png" alt="화남" />'
      : ""
    }
                    ${el.mood === "기타"
      ? '<img class="moodImg" src="/homework/assets/images/um.png" alt="기타" />'
      : ""
    }
                </div>
                <div class="diaryInfo>
                <div class="diaryContent">
                    ${el.mood === "행복"
      ? `<div class="mood CSS_행복">행복해요</div>`
      : ""
    }
                    ${el.mood === "슬픔"
      ? `<div class="mood CSS_슬픔">슬퍼요</div>`
      : ""
    }
                    ${el.mood === "놀람"
      ? `<div class="mood CSS_놀람">놀랐어요</div>`
      : ""
    }
                    ${el.mood === "화남"
      ? `<div class="mood CSS_화남">화나요</div>`
      : ""
    }
                    ${el.mood === "기타"
      ? `<div class="mood CSS_기타">기타</div>`
      : ""
    }
                    <div class="diary_date">${el.date}</div>
                </div>
                <div class="diary_title"> ${el.title}</div>
            </div>
           <img class="CSS_삭제버튼" src="/homework/assets/images/deleteButton.png" onclick="diaryDelete(event, ${index})" />
            </div>
        </a>
        `
        
  ).join("");
   
};

const diaryRegister = () => {
  const { diaryList } = getDiaryList("민지의일기목록");
  
  console.log("Diary List:", diaryList);
  
 const diaryNewregister= generateDiaryHTML(diaryList);
    
 window.document.getElementById("diaryBoxList").innerHTML = diaryNewregister;
  
};


const writerBtn = () => {
 console.log('등록함수')
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now).replace(/\./g, "").replace(/\s/g, "-");

  const getTitle = window.document.querySelector("#inputTitle").value;
  const getContent = window.document.querySelector("#inputContent").value;

  // if (!getTitle || !getContent) {
  //   alert("제목과내용을 모두 입력해주세요!");
  //   return;
  // }

  let getMoodData;
              
  const checkedElement = Array.from(document.getElementsByName("moodChoiceBtn")).find(el => el.checked);
  if (checkedElement) {
    getMoodData = checkedElement.value;
  }

  const diaryContain = {
    title: getTitle,
    content: getContent,
    mood: getMoodData,
    date: formattedDate,
  };
  
  const { diaryList } = getDiaryList("민지의일기목록");
  diaryList.push(diaryContain);
  saveDiaryList("민지의일기목록", diaryList);
  
  diaryRegister();
};

const JS_글보기기능 = (getDiaryNumber) => {
  const {diaryList} = getDiaryList("민지의일기목록")
    const diaryContain = diaryList[getDiaryNumber];
    const getTitle = diaryContain.title;
    const getContent = diaryContain.content;
  
    alert(`
      title: ${getTitle}
      content: ${getContent}       
    `);
  
  
    window.location.href = `/homework/section05/05-detail.html?diaryNumber=${getDiaryNumber}`;
};
  

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
};

const scrolling = () => {
  const filterEl = document.querySelector(".filterBox")

  if (window.scrollY > 0) {
      filterEl.classList.add("filterReversal")
  } else {
      filterEl.classList.remove("filterReversal")
  }
};


let nowDeleteDiaryNumer = null;

const diaryDelete = (event,diaryNumber) => {
  event.preventDefault();

  nowDeleteDiaryNumer = diaryNumber;

  scrollTop();
  document.body.style.overflow = "hidden";
  
  openModal('diaryDeleteModalGroup');

  

}

const diaryDeleteConfirm = () => {
  const { diaryList} = getDiaryList("민지의일기목록");
 

  if (nowDeleteDiaryNumer !== null) {

    const afterDeleteList = diaryList.filter((_, index) => {
        index !== nowDeleteDiaryNumer
    });

    saveDiaryList("민지의일기목록", afterDeleteList);
    diaryRegister();
};
  
  closeModal('diaryDeleteModalGroup');
  document.body.style.overflow = "auto";
  nowDeleteDiaryNumer = null;

}
  
const toggle = (event) => {
  console.log(event.target.checked)
  if (event.target.checked === true) {
    document.documentElement.setAttribute("toggle_darkMode", "on");
  } else {
    document.documentElement.setAttribute("toggle_darkMode", "off");
  }
};
  

const search= (event) => {
  let timer;
  clearTimeout(timer);
  timer = setTimeout(() => {
    const searchSentence = event.target.value;

    const { diaryList } = getDiaryList("민지의일기목록");

    const searchResult = diaryList.filter((el) =>
      el.title.includes( searchSentence)
    );
    const diaryNewregister = generateDiaryHTML(searchResult)
      
    window.document.getElementById("diaryBoxList").innerHTML =
      diaryNewregister;
  }, 1000);
};


let clickPage = 1;
let startPage = 1;
let filteringList = []; // 필터링된 데이터를 저장할 변수

const JS_필터링기능 = (event) => {
  const filtering = event.target.value;
  const { diaryList } = getDiaryList("민지의일기목록");

  switch (filtering) {
    case "filterChoice":
      filteringList = diaryList.filter((el) => el.mood === "전체");
      break;
    case "HTML_행복선택":
      filteringList = diaryList.filter((el) => el.mood === "행복");
      break;
    case "HTML_슬픔선택":
      filteringList = diaryList.filter((el) => el.mood === "슬픔");
      break;
    case "HTML_놀람선택":
      filteringList = diaryList.filter((el) => el.mood === "놀람");
      break;
    case "HTML_화남선택":
      filteringList = diaryList.filter((el) => el.mood === "화남");
      break;
    case "HTML_기타선택":
      filteringList = diaryList.filter((el) => el.mood === "기타");
      break;
    default:
      filteringList = diaryList;
      break;
  }

  // 필터링된 목록에 맞게 페이지를 다시 설정
  clickPage = 1;
  startPage = 1;

  // 필터링된 목록을 기준으로 페이지네이션과 목록을 그리기
  pagination();
  listPage(clickPage);
};

const pagination = () => {
  const lastPage = Math.ceil(filteringList.length / 10); // 필터링된 목록에 맞게 마지막 페이지 계산하기
  const pages = new Array(lastPage).fill(null).map((_, index) => {
    const pageNum = index + 1;
  
      return `
        <button onclick="listPage(${pageNum}); clickPage=${pageNum}; pagination()" 
        class="${clickPage === pageNum ? "CSS_클릭한페이지" : ""}">
          ${pageNum}
        </button>`;
  
  }).join("");

  document.getElementById("pageBox").innerHTML = pages;
};

const listPage = (pageNum) => {
  const quantity = 10;
  const quantityCross = (pageNum - 1) * quantity;

  const result = filteringList.slice(quantityCross, quantityCross + quantity);

  document.getElementById("diaryBoxList").innerHTML = result.map((el,index) => `
    <div class="diaryItem">
      <div class="diaryTitle">${el.title}</div>
      <div class="diaryDate">${el.date}</div>
      <div class="diaryContent">${el.content}</div>
      <button onclick="diaryDelete(event, ${index})">삭제</button>
    </div>
  `).join("");
};

