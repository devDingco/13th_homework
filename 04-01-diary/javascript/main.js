window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");
  };
  
  const diary_list = [];
  
  const JS_write = () => {
    // 0. 현재 날짜 가져오기
  
    const date = new Date();
  
    const options = {
      year: date.getFullYear(),
      month: (date.getMonth() + 1).toString().padStart(2, "0"),
      date: date.getDate(),
    };
  
    // 1-1. 내가쓴 일기 불러오기
    const date_container = options.year + "-" + options.month + "-" + options.date;
    const title_container = window.document.getElementById("html_title").value;
    const content_container = window.document.getElementById("html_content").value;
  
    // 1-2. 오늘의 기분 불러오기
    let happy =
      window.document.getElementsByName("select_feeling")[0].checked === true;
    let sad =
      window.document.getElementsByName("select_feeling")[1].checked === true;
    let surprise =
      window.document.getElementsByName("select_feeling")[2].checked === true;
    let angry =
      window.document.getElementsByName("select_feeling")[3].checked === true;
    let etc =
      window.document.getElementsByName("select_feeling")[4].checked === true;
  
    // 2. 일기목록에 일기 추가하기
    const diary_container = {
      제목: title_container,
      내용: content_container,
      작성일: date_container,
    };
    diary_list.push(diary_container);
  
    // 3. 마지막으로 추가한 일기번호 가져오기
    const diary_number = diary_list.length - 1;
  
    // 4. 현재까지 그려진 일기도화지 가져오기
    const existing =
      window.document.getElementById("show_diary_html").innerHTML;
  
    // 5. 새로운 일기도화지 만들기
    const newdiary = `
      <div class="CSS_diary" onclick="show_write(${diary_number})">
          <div class="diary_image" onclick="location.href='../04-01-diary/detail.html'">
            ${
              happy === true
                ? '<img class="feeling_image" src="./assets/happy.png" alt="happy" />'
                : ""
            }
            ${
              sad === true
                ? '<img class="feeling_image" src="./assets/sad.png" alt="sad" />'
                : ""
            }
            ${
              surprise === true
                ? '<img class="feeling_image" src="./assets/surprise.png" alt="surprise" />'
                : ""
            }
            ${
              angry === true
                ? '<img class="feeling_image" src="./assets/angry.png" alt="angry" />'
                : ""
            }
            ${
              etc === true
                ? '<img class="feeling_image" src="./assets/etc.png" alt="etc" />'
                : ""
            }
          </div>
          <div class="diary_content">
            ${
              happy === true
                ? `<div class="feeling happy">행복해요</div>`
                : ""
            }
            ${
              sad === true
                ? `<div class="feeling sad">슬퍼요</div>`
                : ""
            }
            ${
              surprise === true
                ? `<div class="feeling surprise">놀랐어요</div>`
                : ""
            }
            ${
              angry === true
                ? `<div class="feeling angry">화나요</div>`
                : ""
            }
            ${
              etc === true
                ? `<div class="feeling etc">기타</div>`
                : ""
            }
            <div class="date">${diary_container.작성일}</div>
          </div>
          <div class="title"> ${diary_container.제목}</div>
      </div>
    `;
  
    // 6. HTML_일기보여주는곳에 기존의 일기도화지와 새로운 일기도화지 함께 보여주기
    window.document.getElementById("show_diary_html").innerHTML =
      existing + newdiary;
  };
  
  const show_write = (diary_number_container) => {
    const diary_container = diary_list[diary_number_container];
    const title_container = diary_container.제목;
    const content_container = diary_container.내용;
  };


    