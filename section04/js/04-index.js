window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");
  
    // 1. 시작하면 일기 목록에 그리기
    JS_일기그리기기능();

    JS_삭제버튼추가();

    window.addEventListener("scroll", JS_스크롤감지기능);
};
  
const scrollTop = () => {
    window.scrollTo({top:0, behavior:"smooth"})
}

const JS_스크롤감지기능 = () => {
    const 필터요소 = document.querySelector(".CSS_필터")

    if (window.scrollY > 0) {
        필터요소.classList.add("CSS_필터반전하기");
    } else {
        필터요소.classList.remove("CSS_필터반전하기")
    }
}
  
const JS_삭제버튼추가 = () => {
  const 이미지요소들 = document.querySelectorAll(".CSS_일기사진");
  
  

    이미지요소들.forEach((이미지요소) => {
        /**버튼 생성 */
        const 삭제버튼 = document.createElement("button");
        삭제버튼.innerText = "X";
        삭제버튼.style.position = "absolute";
        삭제버튼.style.top = "5px";
        삭제버튼.style.right = "5px";
        삭제버튼.style.backgroundColor = "#FFFFFF";
        삭제버튼.style.color = "black";
      삭제버튼.style.border = "none";
      삭제버튼.style.borderRadius = "100%";
        삭제버튼.style.width = "24px";
        삭제버튼.style.height = "24px";
        삭제버튼.style.fontSize = "16px";
        삭제버튼.style.cursor = "pointer";

        삭제버튼.addEventListener("click", (event) => {
            event.stopPropagation();
            event.preventDefault();
            
          이미지요소.remove();
          alert("삭제되었습니다!")
           
        });

        이미지요소.style.position = "relative";
        
        이미지요소.appendChild(삭제버튼);
        
    });
   
};

  const JS_일기그리기기능 = () => {
    // 1. 스토리지에 저장된 diaryList 가져오기
    const storageList = window.localStorage.getItem("민지의일기목록") ?? "[]";
    const diaryList = JSON.parse(storageList);
  
    // 2. diaryList 화면에 새롭게 전체 그리기
    const HTML_새로운일기도화지 = diaryList
      .map(
        (el, index) => `
          <a href="/homework/section04/04-detail.html?number=${index}">
            <div class="CSS_일기">
                <div class="CSS_일기사진">
                  ${
                    el.기분 === "행복"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/happiness.png" alt="행복" />'
                      : ""
                  }
                  ${
                    el.기분 === "슬픔"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/sadness.png" alt="슬픔" />'
                      : ""
                  }
                  ${
                    el.기분 === "놀람"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/surprise.png" alt="놀람" />'
                      : ""
                  }
                  ${
                    el.기분 === "화남"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/angry.png" alt="화남" />'
                      : ""
                  }
                  ${
                    el.기분 === "기타"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/um.png" alt="기타" />'
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
                  <div class="CSS_날짜">${el.content}</div>
                </div>
                <div class="CSS_일기제목"> ${el.title}</div>
            </div>
          </a>
    `
      )
      .join("");
    window.document.getElementById("HTML_일기보여주는곳").innerHTML =
        HTML_새로운일기도화지;
      
      JS_삭제버튼추가();
  };


  
  const diaryList = [];
  
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
    const diaryContain = {
      title: 제목담는통,
      content: 내용담는통,
      기분: 기분담는통,
      writing: 날짜담는통,
    };
  
    const storageList = window.localStorage.getItem("민지의일기목록") ?? "[]";
    const diaryList = JSON.parse(storageList);

    diaryList.push(diaryContain);
    window.localStorage.setItem("민지의일기목록", JSON.stringify(diaryList));
    
    const diaryNumber = diaryList.length - 1;

    window.location.href = `/homework/section04/04-detail.html?number=${diaryNumber}`;

    JS_일기그리기기능();

   
  };
  
  const JS_글보기기능 = (일기번호받는통) => {
    const diaryContain = diaryList[일기번호받는통];
    const 제목담는통 = diaryContain.title;
    const 내용담는통 = diaryContain.content;
  
    alert(`
      title: ${제목담는통}
      content: ${내용담는통}       
    `);
  
    window.location.href = `/homework/section04/04-detail.html?diaryNumber=${일기번호받는통}`;
  };
  
  const JS_필터링기능 = (event) => {
    const 선택한내용 = event.target.value;
  
    const storageList = window.localStorage.getItem("민지의일기목록") ?? "[]";
    const diaryList = JSON.parse(storageList);

    let 필터링된일기목록;
  
    switch (선택한내용) {
      case "HTML_행복선택": {
        필터링된일기목록 = diaryList.filter((el) => el.기분 === "행복");
        break;
      }
      case "HTML_슬픔선택": {
        필터링된일기목록 = diaryList.filter((el) => el.기분 === "슬픔");
        break;
      }
      case "HTML_놀람선택": {
        필터링된일기목록 = diaryList.filter((el) => el.기분 === "놀람");
        break;
      }
      case "HTML_화남선택": {
        필터링된일기목록 = diaryList.filter((el) => el.기분 === "화남");
        break;
      }
      case "HTML_기타선택": {
        필터링된일기목록 = diaryList.filter((el) => el.기분 === "기타");
        break;
      }
      default: {
        필터링된일기목록 = diaryList;
        break;
      }
    }
  
    const HTML_새로운일기도화지 = 필터링된일기목록
      .map(
        (el, index) => `
          <a href="/homework/section04/04-detail.html?number=${index}">
            <div class="CSS_일기">
                <div class="CSS_일기사진">
                  ${
                    el.기분 === "행복"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/happiness.png" alt="행복" />'
                      : ""
                  }
                  ${
                    el.기분 === "슬픔"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/sadness.png" alt="슬픔" />'
                      : ""
                  }
                  ${
                    el.기분 === "놀람"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/surprise.png" alt="놀람" />'
                      : ""
                  }
                  ${
                    el.기분 === "화남"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/angry.png" alt="화남" />'
                      : ""
                  }
                  ${
                    el.기분 === "기타"
                      ? '<img class="CSS_기분이미지" src="/homework/assets/images/um.png" alt="기타" />'
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
                  <div class="CSS_날짜">${el.writing}</div>
                </div>
                <div class="CSS_일기제목"> ${el.title}</div>
            </div>
          </a>
        `
      )
      .join("");
    window.document.getElementById("HTML_일기보여주는곳").innerHTML =
        HTML_새로운일기도화지;
      
  };