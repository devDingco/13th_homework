window.onload = () => {
  console.log("민지의 다이어리에 오신 것을 환영합니다.");
  
  // 1. 시작하면 일기 목록에 그리기
  //  JS_일기그리기기능();
  // 원래는 위에 껀데 이제 페이지네이션으로 줘야해서 이거로 바꿈
  JS_페이지그리기기능();
};

// // 스크롤 감지하여 필터 배경색 변경
// window.onscroll = function () {
//   const selectElement = document.querySelector(".CSS_필터");
//   // 1. 스크롤 얼마나 내려갔는지 확인하기
//   if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
//     // 2. 스크롤이 조금이라도 내려갔으면? 배경색 변경하기
//     selectElement.classList.add("CSS_색상반전");
//   } else {
//     selectElement.classList.remove("CSS_색상반전"); // 스크롤이 맨 위로 올라가면 원래 색으으로 복귀
//   }
// };

// 토글기능 담당하는 곳
const JS_다크모드 = (event) => {
  console.log("다크모드 토글 상태:", event.target.checked); // 체크 상태 확인
  if (event.target.checked === true) {
    document.documentElement.setAttribute("data-다크모드", "on");
  } else {
    document.documentElement.setAttribute("data-다크모드", "off");
  }
};

// 원래는 있었는데 필요없게 된거 같아서 주석처리함.

// const JS_일기그리기기능 = () => {
//   // 1. 스토리지에 저장된 일기목록 가져오기
//   const 스토리지에저장된일기목록 =
//     window.localStorage.getItem("민지의일기목록") ?? "[]";
//   const 일기목록 = JSON.parse(스토리지에저장된일기목록);
//   // console.log(일기목록.length)
//   // 2. 일기목록 화면에 새롭게 전체 그리기
//   const HTML_새로운일기도화지 = 일기목록
//     .map(
//       (el, index) => `
//         <a href="./detail.html?number=${index}">
//           <div class="CSS_일기">
//           <img class="CSS_삭제버튼" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${index});" />
//             <div class="CSS_일기사진">
            
//               ${
//                 el.기분 === "행복"
//                   ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
//                   : ""
//               }
//               ${
//                 el.기분 === "슬픔"
//                   ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
//                   : ""
//               }
//               ${
//                 el.기분 === "놀람"
//                   ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
//                   : ""
//               }
//               ${
//                 el.기분 === "화남"
//                   ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
//                   : ""
//               }
//               ${
//                 el.기분 === "기타"
//                   ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
//                   : ""
//               }
//             </div>
//             <div class="CSS_일기정보">
//               <div class="CSS_일기내용">
//                 ${
//                   el.기분 === "행복"
//                     ? `<div class="CSS_기분 CSS_행복">행복해요</div>`
//                     : ""
//                 }
//                 ${
//                   el.기분 === "슬픔"
//                     ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>`
//                     : ""
//                 }
//                 ${
//                   el.기분 === "놀람"
//                     ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>`
//                     : ""
//                 }
//                 ${
//                   el.기분 === "화남"
//                     ? `<div class="CSS_기분 CSS_화남">화나요</div>`
//                     : ""
//                 }
//                 ${
//                   el.기분 === "기타"
//                     ? `<div class="CSS_기분 CSS_기타">기타</div>`
//                     : ""
//                 }
//                 <div class="CSS_날짜">${el.작성일}</div>
//               </div>
//               <div class="CSS_일기제목"> ${el.제목}</div>
//             </div>
//           </div>

//         </a>
//       `
//     )
//     .join("");
//   window.document.getElementById("HTML_일기보여주는곳").innerHTML =
//     HTML_새로운일기도화지;
// };


const 일기목록 = [];

// 글쓰기기능 전에 input값이랑 textarea값 모두 체크 되었는지 확인하는 함수
window.addEventListener("keyup", () => {
  const 제목입력창값 = document.getElementById("HTML_제목입력창").value
  const 내용입력창값 = document.getElementById("HTML_내용입력창").value
  const 등록하기버튼 = document.querySelector(".CSS_일기쓰기_등록버튼")

  if(제목입력창값 === "" || 내용입력창값 === "") {
    등록하기버튼.disabled = true;
    등록하기버튼.style.backgroundColor = "";
    등록하기버튼.style.color = "";
  } else if (제목입력창값 !== "" && 내용입력창값 !== ""){
    등록하기버튼.disabled = false;
    등록하기버튼.style.backgroundColor = "black";
    등록하기버튼.style.color = "white";
  }
})

const JS_글쓰기기능 = () => {
  // 0. 현재 날짜 가져오기

  const date = new Date();

  const options = {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    date: date.getDate().toString().padStart(2, "0"),
  };

  // 1-1. 내가쓴 일기 불러오기
  const 날짜담는통 = options.year + ". " + options.month + ". " + options.date;
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

  // 페이지그리기기능으로 바꿈
  JS_페이지그리기기능();
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
  const 선택한내용 = event.target.id;
  console.log("필터링 내용:", 선택한내용);

  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  let 필터링된일기목록;

  switch (선택한내용) {
    case "행복해요클릭": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "행복");
      break;
    }
    case "슬퍼요클릭": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "슬픔");
      break;
    }
    case "놀랐어요클릭": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "놀람");
      break;
    }
    case "화나요클릭": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "화남");
      break;
    }
    case "기타클릭": {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === "기타");
      break;
    }
    case "전체클릭":
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
          <img class="CSS_삭제버튼" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${index});" />
            <div class="CSS_일기사진">

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
            <div class="CSS_일기정보">
              <div class="CSS_일기내용">
                ${
                  el.기분 === "행복"
                    ? '<div class="CSS_기분 CSS_행복">행복해요</div>'
                    : ""
                }
                ${
                  el.기분 === "슬픔"
                    ? '<div class="CSS_기분 CSS_슬픔">슬퍼요</div>'
                    : ""
                }
                ${
                  el.기분 === "놀람"
                    ? '<div class="CSS_기분 CSS_놀람">놀랐어요</div>'
                    : ""
                }
                ${
                  el.기분 === "화남"
                    ? '<div class="CSS_기분 CSS_화남">화나요</div>'
                    : ""
                }
                ${
                  el.기분 === "기타"
                    ? '<div class="CSS_기분 CSS_기타">기타</div>'
                    : ""
                }
                <div class="CSS_날짜">${el.작성일}</div>
              </div>
              <div class="CSS_일기제목"> ${el.제목}</div>
            </div>
          </div>
        </a>
      `
    )
    .join(""); 
  window.document.getElementById("HTML_일기보여주는곳").innerHTML =
    HTML_새로운일기도화지;
};


// 일기검색하게 도와주는 기능 타이머1초는 아직 적용 못함.
const JS_일기검색기능 = (event) => {
  const 검색어 = event.target.value; // 사용자가 입력한 검색어
  const 스토리지에저장된일기목록 = window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  // 검색어가 포함된 제목을 가진 일기 필터링
  const 필터된일기목록 = 일기목록.filter((일기) => 일기.제목.includes(검색어));

  // 필터링된 결과를 HTML로 변환
  const HTML_새로운일기도화지 = 필터된일기목록
    .map(
      (el, index) => `
        <a href="./detail.html?number=${index}">
          <div class="CSS_일기">
          <img class="CSS_삭제버튼" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${index});" />
            <div class="CSS_일기사진">
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
            <div class="CSS_일기정보">
              <div class="CSS_일기내용">
              ${
                el.기분 === "행복"
                  ? '<div class="CSS_기분 CSS_행복">행복해요</div>'
                  : ""
              }
              ${
                el.기분 === "슬픔"
                  ? '<div class="CSS_기분 CSS_슬픔">슬퍼요</div>'
                  : ""
              }
              ${
                el.기분 === "놀람"
                  ? '<div class="CSS_기분 CSS_놀람">놀랐어요</div>'
                  : ""
              }
              ${
                el.기분 === "화남"
                  ? '<div class="CSS_기분 CSS_화남">화나요</div>'
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
          </div>
        </a>
      `
    )
    .join(""); // HTML 문자열로 변환

  // 결과를 화면에 반영
  window.document.getElementById("HTML_일기보여주는곳").innerHTML =
    HTML_새로운일기도화지;
};


function JS_스크롤위로기능() {
  window.scrollTo({
    top: 0,
  });
}

function JS_일기삭제기능(event, 일기번호) {
  // 1. 이 버튼 하위에 있는 모든 태그들의 기본기능 막기 => <a /> 태그 이동 막기
  event.preventDefault();
  event.stopPropagation(); // 이벤트 전파 중지

  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록");
  const 일기목록 = 스토리지에저장된일기목록
    ? JSON.parse(스토리지에저장된일기목록)
    : [];
  // 2. 클릭된 일기번호 삭제하기
  const 삭제후일기목록 = 일기목록.filter((_, index) => index !== 일기번호);
  // 3. 삭제된 일기목록 다시 저장하기
  window.localStorage.setItem("민지의일기목록", JSON.stringify(삭제후일기목록));
  alert("삭제되었습니다.");
  // 이부분 얼랏을 지우고 모달 만들어 두고 나오는 식으로 해보기
  // 4. 삭제된 일기목록 화면에 다시 그리기

  //페이지그리기기능으로바꿈   
  JS_페이지그리기기능();  


}


// 모달 담당하는 함수들
const JS_모달열기기능 = (모달종류) => {
  document.getElementById(모달종류).style = "display: block";
};
const JS_모달닫기기능 = (모달종류) => {
  document.getElementById(모달종류).style = "display: none";
};

const JS_모달다끄기기능 = () => {
  document.getElementById("HTML_모달그룹").style = "display: none";
}

const JS_등록완료모달끄기기능 = () => {
  document.getElementById("HTML_등록완료모달그룹").style = "display: none";
}

const JS_취소모달끄기기능 = () => {
  document.getElementById("HTML_취소모달그룹").style = "display: none";
}

// 삭제묻는창띄우는기능
const JS_삭제할지다시묻기기능 = () => {
  document.getElementById("HTML_삭제재확인모달그룹").style.display = "block";
  console.log("삭제묻기")

}

// 각자 탭을 선택하면 넘어가지는 기능

const JS_일기보관함탭선택기능 = () => {
  document.getElementById("JS_메인_일기보관함").classList.replace("CSS_클릭되지않은탭", "CSS_클릭된탭")

  // document.getElementById("JS_메인_일기보관함").classList.add("CSS_클릭되지않은탭")
  // document.getElementById("JS_메인_사진보관함").classList.remove("CSS_클릭된탭")
  
  document.getElementById("JS_메인_일기보관함").style = "display: flex";

  document.getElementById("JS_메인_사진보관함").style = "display: none";


  document.getElementById("JS_일기보관함탭").classList.add("CSS_클릭된탭")
  document.getElementById("JS_사진보관함탭").classList.remove("CSS_클릭된탭")

  document.getElementById("JS_일기보관함탭").classList.remove("CSS_클릭되지않은탭")
  document.getElementById("JS_사진보관함탭").classList.add("CSS_클릭되지않은탭")

  document.getElementById("HTML_강아지보여주는곳").style = "display: none"
}

const JS_사진보관함탭선택기능 = () => {
  document.getElementById("JS_메인_사진보관함").classList.replace("CSS_클릭되지않은탭", "CSS_클릭된탭")
  // document.getElementById("JS_메인_일기보관함").classList.remove("CSS_클릭되지않은탭")
  // document.getElementById("JS_메인_사진보관함").classList.add("CSS_클릭된탭")

  document.getElementById("JS_메인_일기보관함").style = "display: none";

  document.getElementById("JS_메인_사진보관함").style = "display: flex";



  document.getElementById("JS_일기보관함탭").classList.remove("CSS_클릭된탭")
  document.getElementById("JS_사진보관함탭").classList.add("CSS_클릭된탭")

  document.getElementById("JS_일기보관함탭").classList.add("CSS_클릭되지않은탭")
  document.getElementById("JS_사진보관함탭").classList.remove("CSS_클릭되지않은탭")

  document.getElementById("HTML_강아지보여주는곳").style = "display: flex"
}

// 사진보관함 사진 관리하는 부분
const JS_강아지사진불러오는기능 = () => {
  fetch("https://dog.ceo/api/breeds/image/random/10")
    .then((받은결과) => 받은결과.json())
    .then((객체로바뀐결과) => {
      console.log("결과 :", 객체로바뀐결과);

      const 강아지사진 = 객체로바뀐결과.message;

      document.getElementById("HTML_강아지보여주는곳").innerHTML += `
        ${강아지사진.map((el) => `<img class="CSS_강아지사진" src="${el}">`).join('')}
      `;
    })
    .catch((오류) => console.error("오류 발생:", 오류));
}

let 타이머 = null;
window.addEventListener("scroll", () => {
  const 스크롤퍼센트 = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  // 90% 이상 스크롤되었을 때 강아지 사진 불러오기
  if (스크롤퍼센트 >= 0.9) {
    if (타이머) return; // 타이머가 존재하면 중복 호출 방지
    JS_강아지사진불러오는기능();

    // 1초 후에 타이머 해제
    타이머 = setTimeout(() => {
      타이머 = null;
    }, 1000);
  }
});




// 사진 넣는건 했고 셀렉트로 사진 조절하는 기능 넣어야함.
const JS_사진사이즈선택 = () => {
  const 선택된사이즈 = document.getElementById("사진사이즈선택").value
  const 사진들 = document.querySelectorAll(".CSS_강아지사진")

  사진들.forEach((사진) => {
    if(선택된사이즈 === "HTML_1대1사이즈") {
      사진.style.aspectRatio = "1 / 1";
    } else if (선택된사이즈 === "HTML_4대3사이즈") {
      사진.style.aspectRatio = "4 / 3";
    } else if (선택된사이즈 === "HTML_3대4사이즈") {
      사진.style.aspectRatio = "3 / 4";
    }
  })
}



let 시작페이지 = 1;
const 페이지당개수 = 12;

const 스토리지에저장된일기목록 = window.localStorage.getItem("민지의일기목록") ?? "[]";
const 페이지내이션일기목록 = JSON.parse(스토리지에저장된일기목록);

const 일기개수 = 페이지내이션일기목록.length;
const 마지막페이지 = Math.ceil(일기개수 / 페이지당개수);

const JS_이전페이지이동기능 = () => {
  if (시작페이지 === 1) {
    alert("첫 페이지입니다!");
  } else {
    시작페이지--;
    JS_페이지그리기기능();
  }
};

const JS_다음페이지이동기능 = () => {
  if (시작페이지 < 마지막페이지) {
    시작페이지++;
    JS_페이지그리기기능();
  } else {
    alert("마지막 페이지입니다!");
  }
};

const JS_페이지그리기기능 = () => {
  const 페이지들 = new Array(마지막페이지).fill(1).map((_, index) => {
    const 페이지번호 = index + 1;

    return 페이지번호 === 시작페이지
      ? `<button class = "CSS_현재페이지">${페이지번호}</button>`
      : `<button onclick="시작페이지 = ${페이지번호}; JS_페이지그리기기능();">${페이지번호}</button>`;
  }).join("");

  document.getElementById("HTML_페이지보여주는곳").innerHTML = 페이지들;

  // 현재 페이지에 해당하는 일기 카드 그리기
  JS_일기카드그리기기능();
};

const JS_일기카드그리기기능 = () => {
  const 시작인덱스 = (시작페이지 - 1) * 페이지당개수;
  const 끝인덱스 = 시작페이지 * 페이지당개수;
  const 현재페이지일기목록 = 페이지내이션일기목록.slice(시작인덱스, 끝인덱스);

  const HTML_새로운일기도화지 = 현재페이지일기목록.map((el, index) => `
      <a href="./detail.html?number=${시작인덱스 + index}">
        <div class="CSS_일기">
          <img class="CSS_삭제버튼" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${시작인덱스 + index});" />
          <div class="CSS_일기사진">
          ${
            el.기분 === "행복"
              ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
              : el.기분 === "슬픔"
              ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
              : el.기분 === "놀람"
              ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
              : el.기분 === "화남"
              ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
              : el.기분 === "기타"
              ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
              : ''
          }
          </div>
      
          <div class="CSS_일기정보">
            <div class="CSS_일기내용">
            ${
              el.기분 === "행복"
                ? '<div class="CSS_기분 CSS_행복">행복해요</div>'
                : ""
            }
            ${
              el.기분 === "슬픔"
                ? '<div class="CSS_기분 CSS_슬픔">슬퍼요</div>'
                : ""
            }
            ${
              el.기분 === "놀람"
                ? '<div class="CSS_기분 CSS_놀람">놀랐어요</div>'
                : ""
            }
            ${
              el.기분 === "화남"
                ? '<div class="CSS_기분 CSS_화남">화나요</div>'
                : ""
            }
            ${
              el.기분 === "기타"
                ? '<div class="CSS_기분 CSS_기타">기타</div>'
                : ""
            }
              <div class="CSS_날짜">${el.작성일}</div>
            </div>
            <div class="CSS_일기제목">${el.제목}</div>
          </div>
        </div>
      </a>
    `).join("");

  document.getElementById("HTML_일기보여주는곳").innerHTML = HTML_새로운일기도화지;
};

// 여기에 사진보관함 온클릭 추가해서 사진보관함 가면 페이지네이션 안보이게 삭제하는 기능 마저 작성하기
const JS_페이지네이션삭제 = () => {

}

// 페이지 로드 시 초기화
JS_페이지그리기기능();
